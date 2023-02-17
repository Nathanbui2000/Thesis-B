package Java.Database.AppraiserUserAppointmentView;

import Java.Database.appointment.Appointment;
import Java.Database.user.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/appraiser-user-appointment-view")
public class AppraiserUserAppointmentController {
    private final AppraiserUserAppointmentViewServices appraiserUserAppointmentViewServices;
    private final UserServiceImpl userService;

    public AppraiserUserAppointmentController(AppraiserUserAppointmentViewServices appraiserUserAppointmentViewServices, UserServiceImpl userService) {
        this.appraiserUserAppointmentViewServices = appraiserUserAppointmentViewServices;
        this.userService = userService;
    }

    @GetMapping({"/find-all-by-username"})
    public ResponseEntity<List<AppraiserUserAppointmentView>> findAllByAppraiserUsername(@RequestParam("username") String username)
    {
        if (userService.getUserByUserName(username) == null)
            ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(this.appraiserUserAppointmentViewServices.getAllByAppraiserID(this.userService.getUserByUserName(username).getUserId()));
    }

    @GetMapping({"/get-by-appointment-id"})
    public ResponseEntity<AppraiserUserAppointmentView> findByID(@RequestParam("appointmentID") Long appointmentID) {
        return ResponseEntity.ok().body(this.appraiserUserAppointmentViewServices.getByAppointmentID(appointmentID));
    }
}
