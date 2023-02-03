package com.coursemania.api.user;

import com.coursemania.api.role.Role;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface UserService {
    User saveUser(User user);

    Role saveRole(Role role);

    void addRoleToUser(String userName, String roleName);

    User getUserByUserName(String userName);

    User getUserByUserId(Long userId);

    User updateUser(String firstName, String lastName, String username, String university);

    User getUserByToken(String token);

    List<User> getUsers();

    Map<String, String> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

    void ForgotPassword(String username);

    void RegisterUser(String firstName, String lastName, String username, String university, String password);

    ResponseEntity<Boolean> verifyUserEmail(String username, HttpServletResponse response);

    void verifyUser(User user);
    /*
     * void setUpUserTokens(String username, String accessToken, String
     * refreshToken);
     */
}
