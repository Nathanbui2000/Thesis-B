package Java.Database.AllAppointmentView;

import Java.Database.appointment.Appointment;
import Java.Database.user.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/all-appointment-view")
public class AllAppointmentViewController {
    private final AllAppointmentViewServices allAppointmentViewServices;
    private final UserServiceImpl userService;

    public AllAppointmentViewController(
            AllAppointmentViewServices allAppointmentViewServices,
            UserServiceImpl userService)
    {
        this.allAppointmentViewServices = allAppointmentViewServices;
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<AllAppointmentView>> findAll()
    {
        return ResponseEntity.ok().body(allAppointmentViewServices.getAllAppointments());
    }

    @GetMapping("/get-by-id")
    public ResponseEntity<AllAppointmentView> findByID
            (
                    @RequestParam("appointmentID") Long appointmentID
            )
    {
        if(appointmentID == null)
            return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(allAppointmentViewServices.getByID(appointmentID));
    }



}
