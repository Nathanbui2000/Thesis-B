package Java.Database.user;

import Java.Database.role.Role;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface UserService {
    User saveUser(User user);

    Role saveRole(Role role);

    void addRoleToUser(String userName, String roleName);

    User getUserByUserName(String userName);

    User getUserByUserId(Long userId);

    User updateNormalUser(String firstName, String lastName, String username);

    User getUserByToken(String token);

    List<User> getUsers();

    Map<String, String> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

    void ForgotPassword(String username,
                        HttpServletResponse response);

    void RegisterNormalUser
            (String firstName,
             String lastName,
             String username,
             String password,
             String blockchainAddress,
             HttpServletResponse response);

    void RegisterAppraiserUser
            (String firstName,
             String lastName,
             String username,
             String password,
             String appraiserExperiences,
             String nswDriverLicence,
             String blockchainAddress,
             HttpServletResponse response);

    ResponseEntity<Boolean> verifyUserEmail(String username, HttpServletResponse response);

    void verifyUser(User user);

    void updateAppraiserUser(String firstName, String lastName, String username,HttpServletResponse response);

    ResponseEntity<String> deleteUserByUsername(String username, HttpServletResponse response);
    /*
     * void setUpUserTokens(String username, String accessToken, String
     * refreshToken);
     */
    ResponseEntity<Collection<Role>> getUserRoleByUsername(String username, HttpServletResponse response);
    boolean validateUserContainRoleName(String username, String roleName);
    public ResponseEntity sendEmailVerifyAntiqueUser(String antiqueEmailAddress, HttpServletResponse response);
}
