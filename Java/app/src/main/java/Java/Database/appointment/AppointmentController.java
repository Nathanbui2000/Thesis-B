package Java.Database.appointment;

import Java.Database.role.Role;
import Java.Database.user.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Array;
import java.util.List;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/appointment")
public class AppointmentController
{
    private final AppointmentServicesImpl appointmentServices;
    private final UserServiceImpl userService;

    @Autowired
    public AppointmentController(AppointmentServicesImpl appointmentServices, UserServiceImpl userService)
    {
        this.appointmentServices = appointmentServices;
        this.userService = userService;
    }

    @PostMapping("/add-appointment")
    public ResponseEntity<Appointment> addAppointment
            (
                    @RequestParam("appointmentDate") String appointmentDate,
                    @RequestParam("appointmentTime") String appointmentTime,
                    @RequestParam("appointmentConfirmed") boolean appointmentConfirmed,
                    @RequestParam("appointmentDescription") String appointmentDescription,
                    @RequestParam("appointmentStatus") String appointmentStatus,
                    @RequestParam("antiqueOwnerUsername") String antiqueOwnerUsername,
                    HttpServletResponse response
            )
    {
        //Todo: Validate AntiqueOwnerID
        if(userService.getUserByUserName(antiqueOwnerUsername) == null)
        {
            response.setHeader("Error","Invalid Antique Owner ID");
            response.setStatus(BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(null);
        };

        return ResponseEntity.ok().body(
                appointmentServices.addAppointment
                        (
                                appointmentDate,
                                appointmentTime,
                                appointmentConfirmed,
                                appointmentDescription,
                                appointmentStatus,
                                userService.getUserByUserName(antiqueOwnerUsername).getUserId(),
                                response
                        )
        );
    }

    @PutMapping("/update-appointment-all")
    public ResponseEntity<Appointment> updateAppointmentAllData
            (
                    @RequestParam("appointmentID")  Long appointmentID,
                    @RequestParam("appraiserUsername") String appraiserUsername,
                    @RequestParam("appointmentDate") String appointmentDate,
                    @RequestParam("appointmentTime") String appointmentTime,
                    @RequestParam("appointmentDescription")  String appointmentDescription,
                    @RequestParam("status") String status,
                    @RequestParam("appointmentConfirmation") boolean appointmentConfirmation,
                    HttpServletResponse response
            )
    {
        //Todo: Validate AppraiserID
        if (appraiserUsername != null)
        {
            if (userService.getUserByUserName(appraiserUsername) == null)
            {
                return ResponseEntity.badRequest().body(null);
            }
        }
        //Todo: Validate AppointmentID
        if(!validateAppointmentID(appointmentID))
        {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok().body
                (
                        appointmentServices.updateAppointmentAllData
                                (
                                        appointmentID,
                                        userService.getUserByUserName(appraiserUsername).getUserId(),
                                        appointmentDate,
                                        appointmentTime,
                                        appointmentDescription,
                                        status,
                                        appointmentConfirmation,
                                        response
                                )
                );
    }

    @PostMapping("/appraiser-choose-appointment")
    public ResponseEntity<String> chooseAppointment
            (
                    @RequestParam("appointmentID")  Long appointmentID,
                    @RequestParam("appraiserConfirmedAppointmentUsername") String appraiserConfirmedAppointmentUsername,
                    HttpServletResponse response
            )
    {
        //Todo: Validate AppraiserID and AppointmentID
        if (validateAppraiserUsername(appraiserConfirmedAppointmentUsername,response) && validateAppointmentID(appointmentID))
        {

            return ResponseEntity.ok().body(appointmentServices.chooseAppointment
                    (appointmentID,userService.getUserByUserName(appraiserConfirmedAppointmentUsername).getUserId()));
        }
        return ResponseEntity.badRequest().body("Invalid Appraiser Confirming Username or Appointment ID");
    }

    @PostMapping("/change-appointment-datetime")
    public ResponseEntity<String> changeAppointmentDateTime
            (
                @RequestParam("appointmentID") Long appointmentID,
                @RequestParam("newAppointmentDate") String newAppointmentDate,
                @RequestParam("newAppointmentTime") String newAppointmentTime,
                HttpServletResponse response
            )
    {
        //Todo: Validate Appointment ID
        if (!validateAppointmentID(appointmentID))
        {
            return ResponseEntity.badRequest().body("Invalid AppointmentID Provided");
        }
        //Todo: Check If Assignment Has been Confirmed By Appraiser
        if (!appointmentServices.getByAppointmentID(appointmentID).isConfirmation())
            return ResponseEntity.badRequest().body("Appointment Not Yet Confirmed By Any Appraiser");
        return ResponseEntity.ok().body
                (appointmentServices.changeTimeAppointment
                (
                    appointmentID,
                    newAppointmentDate,
                    newAppointmentTime,
                    response
                ));
    }

    @DeleteMapping("/normal-user-delete-appointment")
    public ResponseEntity<String> cancelAppointmentByNormalUser
            (
                    @RequestParam("appointmentID") Long appointmentID,
                    HttpServletResponse response
            )
    {
            if(!validateAppointmentID(appointmentID))
            {
                return ResponseEntity.badRequest().body("Invalid AppointmentID Provided");
            }
            return ResponseEntity.ok().body(appointmentServices.cancelAppointmentByNormalUser(appointmentID,response));
    }

    @PostMapping("/appraiser-user-cancel-appointment")
    public ResponseEntity<String> cancelAppointmentByAppraiserUser
            (
                    @RequestParam("appointmentID") Long appointmentID,
                    HttpServletResponse response
            )
    {
        if(!validateAppointmentID(appointmentID))
        {
            return ResponseEntity.badRequest().body("Invalid AppointmentID Provided");
        }
        return ResponseEntity.ok().body(appointmentServices.cancelAppointmentByAppraiserUser(appointmentID,response));
    }

    @GetMapping("/get-appointment-status-by-id")
    public ResponseEntity<String> getAppointmentStatusByAppointmentID
            (
                    @RequestParam("appointmentID") Long appointmentID,
                    HttpServletResponse response
            )
    {
        if (validateAppointmentID(appointmentID))
            return ResponseEntity.ok().body
                (appointmentServices.getAppointmentStatusByAppointmentID(appointmentID,response));
        return ResponseEntity.badRequest().body("Invalid AppointmentID Provided");
    }

    @GetMapping("/get-all-appointment")
    public ResponseEntity<List<Appointment>> getAllAppointments
            (
                HttpServletResponse response
            )
    {
        return ResponseEntity.ok().body(appointmentServices.getAllAppointments(response));
    }

    @GetMapping("/normal-user-get-all-appointment")
    public ResponseEntity<List<Appointment>> getAllAppointmentsByAntiqueOwnerID
            (
                    @RequestParam("normalUserUsername") String normalUserUsername,
                    HttpServletResponse response
            )

    {

        return ResponseEntity.ok().
                body(appointmentServices.getAllAppointmentsByAntiqueOwnerUsername(normalUserUsername,response));
    }

    @GetMapping("/appraiser-get-all-appointment")
    public ResponseEntity<List<Appointment>> getAllAppointmentByProfessionalAppraiserID
            (
                    @RequestParam("professionalAppraiserUsername") String professionalAppraiserUsername,
                    HttpServletResponse response
            )
    {
        //Todo: Validate Appraiser Username
        if(!validateAppraiserUsername(professionalAppraiserUsername,response))
        {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(
                appointmentServices.getAllAppointmentByProfessionalAppraiserUsername
                        (
                                professionalAppraiserUsername,
                                response
                        ));
    }

    @GetMapping("/get-all-appointment-by-date")
    public ResponseEntity<List<Appointment>> getAllAppointmentsByDate
            (
                        @RequestParam("appointmentDate") String appointmentDate,
                    HttpServletResponse response
            )
    {
        return ResponseEntity.ok().body(appointmentServices.findAllByAppointmentDate(appointmentDate));
    }

    @GetMapping("/validate-appointment-time")
    public ResponseEntity<Boolean> validateAppointmentTime
            (
                    @RequestParam("appointmentID") Long appointmentID,
                    HttpServletResponse response
            )
    {
        return ResponseEntity.ok().body
                (appointmentServices.validateAppointmentTime(appointmentID,response));
    }

    @GetMapping("/get-appointment-by-id")
    public ResponseEntity<Appointment> getAppointmentByID
            (@RequestParam("appointmentID") Long appointmentID,
             HttpServletResponse response
            )
    {
        if(validateAppointmentID(appointmentID))
            return ResponseEntity.ok().body(appointmentServices.getByAppointmentID(appointmentID));
        return ResponseEntity.badRequest().body(null);
    }

    private boolean validateAppraiserUsername(String appraiserUsername,
                                              HttpServletResponse response)
    {
        //? Validate UserID
        if (appraiserUsername != null)
        {
            //? Validate User Role
            if(userService.validateUserContainRoleName(appraiserUsername,"ROLE_APPRAISER"))
                return true;
            return false;
        }
        response.setHeader("Error","Invalid Appraiser ID");
        response.setStatus(BAD_REQUEST.value());
        return false;
    }

    private boolean validateAppointmentID (Long appointmentId)
    {

        if (appointmentId == null || appointmentId < 0 || appointmentServices.getByAppointmentID(appointmentId) == null)
        {
            return false;
        }
        return true;
    }





}
