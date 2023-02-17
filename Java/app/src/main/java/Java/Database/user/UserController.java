package Java.Database.user;


import Java.Database.role.Role;
import Java.Security.Token.TokenHandler;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/user")
public class UserController {
    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/user-profile/{userId}")
    public User getUser(@PathVariable("userId") Long userId) {
        return userService.getUserByUserId(userId);
    }

    @GetMapping("/logged-in-user")
    public User getUserByAccessToken
            (@RequestParam("accessToken") String accessToken)
    {
        TokenHandler tokenHandler = new TokenHandler();
        return userService.getUserByUserName(tokenHandler.decodeToken(accessToken).getSubject());
    }

    @PostMapping("/save-user")
    public ResponseEntity<User> saveUser
            (@RequestBody User user)
    {
        URI uri = URI
                .create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/save-user").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PostMapping("/save-role")
    public ResponseEntity<Role> saveRole
            (@RequestBody Role role)
    {
        URI uri = URI
                .create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/save-role").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping("/add-role-to-user")
    public ResponseEntity<?> addRoleToUser
            (@RequestBody RoleToUserForm form)
    {
        userService.addRoleToUser(form.getUserName(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/token/refresh-token")
    public Map<String, String> refreshToken
            (HttpServletRequest request,
             HttpServletResponse response)
            throws IOException
    {
        return userService.refreshToken(request, response);
    }

    @PostMapping("/forgot-password")
    public void forgotPassword
            (@RequestParam(value = "username") String username,
             HttpServletResponse response) throws IOException
    {
        if (username == null)
        {
            response.setHeader("Error","Username is null");
            response.setStatus(BAD_REQUEST.value());
        }
        else
        {
            userService.ForgotPassword(username,response);
        }
    }

    @PostMapping("/reset-password")
    public void resetPassword
            (@Param(value = "token") String token,
             @Param(value = "password") String password
            )
    {
        if (token == null) {
            throw new IllegalArgumentException("Null Token Detected");
        }
        User user = userService.getByResetPasswordToken(token);
        if (user == null)
        {
            throw new IllegalArgumentException("No User Found With Assign Token");
        }
        userService.updatePassword(user, password);

    }

    @PostMapping("/normal-user/sign-up")
    public void signUp(
            @Param(value = "firstName") String firstName,
            @Param(value = "lastName") String lastName,
            @Param(value = "username") String username,
            @Param(value = "password") String password,
            @Param(value = "blockchainAddress") String blockchainAddress,
            HttpServletResponse response)
    {
        if (firstName == null) {
            throw new IllegalArgumentException("Null firstName Detected");
        }
        if (lastName == null) {
            throw new IllegalArgumentException("Null lastName Detected");
        }

        if (username == null) {
            throw new IllegalArgumentException("Null username Detected");
        }
        if (password == null) {
            throw new IllegalArgumentException("Null password Detected");
        }
        //? Check For Unique Username
        if (userService.getUserByUserName(username) != null)
        {
            response.setHeader("Error","Username need to be unique");
            response.setStatus(INTERNAL_SERVER_ERROR.value());
            return;
        }
        userService.RegisterNormalUser(firstName, lastName, username, password,blockchainAddress,response);
    }

    @PostMapping("/appraiser-user/sign-up")
    public void signUp(
            @Param(value = "firstName") String firstName,
            @Param(value = "lastName") String lastName,
            @Param(value = "username") String username,
            @Param(value = "password") String password,
            @Param(value = "appraiserExperience") String appraiserExperience,
            @Param(value = "nswDriverLicence") String nswDriverLicence,
            @Param(value = "blockchainAddress") String blockchainAddress,
            HttpServletResponse response)
    {

        userService.RegisterAppraiserUser
                (firstName, lastName, username,
                        password,appraiserExperience,nswDriverLicence,
                        blockchainAddress,response);
    }

    @PostMapping("/normal-user/update-user")
    public void updateNormalUser(
            @Param(value = "firstName") String firstName,
            @Param(value = "lastName") String lastName,
            @Param(value = "username") String username)
    {
        if (firstName == null) {
            throw new IllegalArgumentException("Null firstName Detected");
        }
        if (lastName == null) {
            throw new IllegalArgumentException("Null lastName Detected");
        }
        if (username == null) {
            throw new IllegalArgumentException("Null username Detected");
        }

        userService.updateNormalUser(firstName, lastName, username);
    }

    @PostMapping("/appraiser-user/update-user")
    public void updateAppraiserUser
            (
                @Param(value = "firstName") String firstName,
                @Param(value = "lastName") String lastName,
                @Param(value = "username") String username,
                HttpServletResponse response
            )
    {
        userService.updateAppraiserUser(firstName, lastName, username,response);
    }

    @PostMapping("/verify")
    public void verify
            (@RequestParam(value = "token") String token)
    {
        if (token == null) {
            throw new IllegalArgumentException("Null Token Detected");
        }
        User user = userService.getUserByToken(token);
        if (user == null) {
            throw new IllegalArgumentException("No User Found With Assign Token");

        }

        userService.verifyUser(user);
        ;
    }

    @GetMapping("/verified-email")
    public ResponseEntity<Boolean> verifyUserEmail
            (@Param(value = "username") String username,
            HttpServletResponse response) {
        if (username == null)
        {
            return ResponseEntity.ok().body(false);
        }
        return userService.verifyUserEmail(username, response);
    }

    @GetMapping("/get-user-by-username")
    public ResponseEntity<User> getUserByUsername
            (
                @Param(value = "username") String username,
                HttpServletResponse response
            )
    {
        User userFound = userService.getUserByUserName(username);
        if(userFound == null)
            return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(userFound);
    }
    
    @DeleteMapping("/delete-user-by-username")
    public ResponseEntity<String> deleteUserByUsername
            (@Param(value = "username") String username,
             HttpServletResponse response)
    {
        return userService.deleteUserByUsername(username,response);
    }
    @GetMapping("/get-user-role-by-username")
    public ResponseEntity<Collection<Role>> getUserRoleByUsername
            (@Param(value = "username") String username,
             HttpServletResponse response)
    {
        return userService.getUserRoleByUsername(username,response);
    }

}

@Data
class RoleToUserForm {
    private String userName;
    private String roleName;
}
