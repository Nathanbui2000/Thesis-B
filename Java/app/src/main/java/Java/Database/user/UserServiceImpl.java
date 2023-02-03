package com.coursemania.api.user;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import Services.MainServices;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.coursemania.api.role.Role;
import com.coursemania.api.role.RoleRepository;
import com.coursemania.api.university.University;
import com.coursemania.api.university.UniversityService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private final MainServices mainService = MainServices.getInstance();
  private final UniversityService universityService;

  public User addUser(String firstName,
      String lastName,

      String password,
      University university,
      String token) {
    User newUser = new User();
    newUser.setFirstName(firstName);
    newUser.setLastName(lastName);
    /* newUser.setUniversity(university); */
    newUser.setToken(token);

    // ? Hash Password Here
    newUser.setPasswordHash(password);
    return this.userRepository.save(newUser);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username);
    if (user == null) {
      log.error("User Not Found {} in the database", username);
      throw new UsernameNotFoundException("User Not Found in the Database !");
    } else {
      log.info("User {} Found in the database", username);
    }
    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
    user.getRoles().forEach(role -> {
      authorities.add(new SimpleGrantedAuthority(role.getRoleName()));
    });

    return new org.springframework.security.core.userdetails.User(user.getUsername(),
        user.getPasswordHash(),
        authorities);
  }

  @Override
  public User saveUser(User user) {
    log.info("Saving new User {} To Database", user.getFirstName());
    user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
    return userRepository.save(user);
  }

  @Override
  public Role saveRole(Role role) {
    log.info("Saving new Role {} To Database", role.getRoleName());

    return roleRepository.save(role);
  }

  @Override
  public void addRoleToUser(String userName, String roleName) {
    log.info("Saving new Role {} To User {} ", roleName, userName);
    User user = userRepository.findByUsername(userName);
    Role role = roleRepository.findByRoleName(roleName);
    user.getRoles().add(role);
  }

  @Override
  public User getUserByUserName(String userName) {
    log.info("Finding User {} ", userName);
    return userRepository.findByUsername(userName);
  }

  @Override
  public User getUserByUserId(Long userId) {
    log.info("Finding User By ID {} ", userId);
    return userRepository.findByUserId(userId);
  }

  @Override
  public List<User> getUsers() {
    log.info("Finding all User {} ");
    return userRepository.findAll();
  }

  @Override
  public Map<String, String> refreshToken(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    String authorizationHeader = request.getHeader(AUTHORIZATION);
    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      try {
        String refreshToken = authorizationHeader.substring("Bearer ".length());

        // Todo: Refactor Algorithm class
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(refreshToken);
        String username = decodedJWT.getSubject();
        User user = this.getUserByUserName(username);
        String accessToken = JWT.create()
            .withSubject(user.getUsername())
            .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
            .withIssuer(request.getRequestURL().toString())
            .withClaim("roles",
                user.getRoles().stream().map(Role::getRoleName).collect(Collectors.toList()))
            .sign(algorithm);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("refresh_token", refreshToken);
        tokens.put("access_Token", accessToken);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
        return tokens;
      } catch (Exception exception) {
        response.setHeader("error", exception.getMessage());
        response.setStatus(FORBIDDEN.value());
        /* response.sendError(FORBIDDEN.value()); */
        Map<String, String> errors = new HashMap<>();

        errors.put("error_message", exception.getMessage());
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), errors);
        // return errors; TODO nathan to double check (does this not need to return errors?)
      }
    } else {
      throw new RuntimeException("Refresh Token Missing !");
    }
    return null;
  }

  @Override
  public void ForgotPassword(String username) {
    if (username == null) {
      throw new IllegalArgumentException("Username is required");
    } else {

      // ? Get User By Username
      User user = this.getUserByUserName(username);
      if (user == null) {
        throw new IllegalArgumentException("Username is Not Found in Database");
      }
      String token = RandomString.make(30);
      try {
        this.updateResetPasswordToken(token, user);
        String resetPasswordLink = "http://localhost:3000/" + "password/reset/" + token;
        mainService.sendEmailForgotPasswordServices(user.getUsername(), user.getFirstName(),
            resetPasswordLink);
      } catch (Exception e) {
        throw new RuntimeException(e.getMessage());
      }

    }
  }

  /*
   * public Map<String, String> userLogin(String username, String password)
   * {
   * User user = this.getUserByUserName(username);
   * if(user ==null)
   * {
   * throw new IllegalStateException("User Not Found In Database");
   * }
   * else if ()
   * {
   *
   * }
   * }
   */

  public User getByResetPasswordToken(String token) {
    return userRepository.findByResetPasswordToken(token);
  }

  public void updateResetPasswordToken(String token, User user) {
    if (user == null) {
      throw new IllegalArgumentException("User Can Not Be Null");
    } else {
      user.setResetPasswordToken(token);
      userRepository.save(user);
    }
  }

  public void updatePassword(User user, String newPassword) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    String encodedPassword = passwordEncoder.encode(newPassword);
    user.setPasswordHash(encodedPassword);
    user.setResetPasswordToken(null);
    userRepository.save(user);
    mainService.sendEmailConfirmPasswordChange(user.getUsername(),user.getFirstName());
  }

  @Override
  public void RegisterUser(String firstName, String lastName, String username, String university,
      String password) {
    if (firstName == null || lastName == null || username == null || university == null
        || password == null) {
      throw new IllegalArgumentException("User can't be null!!");
    } else if (this.getUserByUserName(username) != null) {
      throw new IllegalArgumentException("User already exist");
    } else {

      University uni = universityService.getByName(university);

      String encodedPassword = passwordEncoder.encode(password);
      String token = RandomString.make(30);
      User user = new User(username, firstName, lastName, encodedPassword, uni, token);
      userRepository.save(user);
      this.addRoleToUser(username, "ROLE_USER");

      try {
        String url = "http://localhost:3000/" + "verify/" + token;
        mainService.sendEmailVerifyAccountServices(username, firstName, url);
      } catch (Exception e) {
        throw new RuntimeException(e.getMessage());
      }
    }
  }

  @Override
  public User updateUser(String firstName, String lastName, String username, String university) {
    if (firstName == null || lastName == null || username == null || university == null) {
      throw new IllegalArgumentException("User can't be null!!");
    }
    User user = getUserByUserName(username);
    if (user == null) {
      throw new IllegalArgumentException("User does not exist");
    }

    University uni = universityService.getById(Long.parseLong(university));

    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setUniversity(uni);

    return userRepository.save(user);
  }

  @Override
  public User getUserByToken(String token) {
    log.info("Finding User by Token {} ", token);
    return userRepository.findByToken(token);
  }

  @Override
  public ResponseEntity<Boolean> verifyUserEmail(String username, HttpServletResponse response) {
    User user = userRepository.findByUsername(username);
    if (user == null) {
      return ResponseEntity.ok().body(false);
    }
    return ResponseEntity.ok().body(user.getVerified());
  }

  @Override
  public void verifyUser(User user) {
    user.verify();
    userRepository.save(user);
  }
}
