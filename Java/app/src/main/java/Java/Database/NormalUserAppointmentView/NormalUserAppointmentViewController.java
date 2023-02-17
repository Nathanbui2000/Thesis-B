package Java.Database.NormalUserAppointmentView;

import Java.Database.user.User;
import Java.Database.user.UserServiceImpl;
import Java.Security.Token.TokenHandler;
import org.hibernate.annotations.Parameter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/normal-user-appointment-view")
public class NormalUserAppointmentViewController {
    private final NormalUserAppointmentViewServices normalUserAppointmentViewServices;
    private final UserServiceImpl userService;

    public NormalUserAppointmentViewController(NormalUserAppointmentViewServices normalUserAppointmentViewServices, UserServiceImpl userService) {
        this.normalUserAppointmentViewServices = normalUserAppointmentViewServices;
        this.userService = userService;
    }
    @GetMapping("/find-all-by-username")
    public ResponseEntity<List<NormalUserAppointmentView>> findAllByAntiqueOwnerUsername
            (
                    @RequestParam("antiqueOwnerUsername") String antiqueOwnerUsername,
                    @RequestParam("accessToken") String accessToken
            )
    {

        if (antiqueOwnerUsername == null || antiqueOwnerUsername.length()==0)
        {
            TokenHandler tokenHandler = new TokenHandler();
            try
            {
                User userData = userService.getUserByUserName(tokenHandler.decodeToken(accessToken).getSubject());
                antiqueOwnerUsername = userData.getUsername();
            }
            catch (Exception e)
            {
                return ResponseEntity.badRequest().body(null);
            }

        }
        if (userService.getUserByUserName(antiqueOwnerUsername) == null)
        {
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(normalUserAppointmentViewServices.getAllByAntiqueOwnerID(userService.getUserByUserName(antiqueOwnerUsername).getUserId()));

    }
}
