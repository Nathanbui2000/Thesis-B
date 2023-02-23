package Java.Database.Antique;

import Java.Database.AllAppointmentView.AllAppointmentView;
import Java.Database.user.UserServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/antique-user")
public class AntiqueUserController
{
    private final AntiqueUserServices antiqueUserServices;
    private final UserServiceImpl userService;

    public AntiqueUserController(AntiqueUserServices antiqueUserServices, UserServiceImpl userService) {
        this.antiqueUserServices = antiqueUserServices;
        this.userService = userService;
    }
    @GetMapping("/get-all-by-username")
    public ResponseEntity<List<AntiqueUser>> findAll
            (
                    @RequestParam("username") String username
            )
    {
        if (username == null)
            return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(antiqueUserServices.findAllByUsername(username));
    }
    @PostMapping("/add-by-username")
    public ResponseEntity addByUsername
            (
                    @RequestParam("username") String username,
                    @RequestParam("AntiqueID") String antiqueID
            )
    {
        if (username == null || antiqueID == null)
            return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(antiqueUserServices.addAntiqueIDByUsername(username,antiqueID));
    }
}
