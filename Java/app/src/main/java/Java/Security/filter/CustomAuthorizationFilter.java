package Java.Security.filter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.coursemania.api.Token.TokenHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter {
    private TokenHandler tokenHandler = new TokenHandler();

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        if (request.getServletPath().equals("/api/v1/login") ||
                request.getServletPath().equals("/login") ||
                request.getServletPath().equals("/user/forgot-password") ||
                request.getServletPath().equals("/user/reset-password") ||
                request.getServletPath().equals("/user/sign-up") ||
                request.getServletPath().equals("/user/verify") ||
                request.getServletPath().equals("/user/verified-email") ||
                request.getServletPath().equals("/user/token/refresh-token") ||
                request.getServletPath().equals("/university/all") ||
                request.getServletPath().equals("/university/all") ||
                request.getServletPath().equals("resource-rating/save-resource-rating") ||
                request.getServletPath().equals("/resource-rating/get-resource-rating") ||
                request.getServletPath().equals("/resource-rating/all-resource-rating") ||
                request.getServletPath().equals("/comment/save-comment") ||
                request.getServletPath().equals("/comment/get-comment") ||
                request.getServletPath().equals("/comment/all-comments") ||
                request.getServletPath().equals("/resources/user/**") ||
                request.getServletPath().equals("/user-profile/**") ||
                request.getServletPath().equals("uos/rate/save-rating") ||
                request.getServletPath().equals("uos/rate/get-ratings") ||
                request.getServletPath().equals("/study-resource/get-study-resource")
        ) {
            filterChain.doFilter(request, response);
        } else {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                try {
                    String tokenString = authorizationHeader.substring("Bearer ".length());

                    // Todo: Refactor Algorithm class
                    /*
                     * Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                     * JWTVerifier verifier = JWT.require(algorithm).build();
                     * DecodedJWT decodedJWT = verifier.verify(tokenString);
                     */
                    DecodedJWT decodedJWT = tokenHandler.decodeToken(tokenString);
                    String username = decodedJWT.getSubject();
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    stream(roles).forEach(role -> {
                        authorities.add(new SimpleGrantedAuthority(role));
                    });
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                            username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);
                } catch (Exception exception) {
                    log.error("Error logging in: {}", exception.getMessage());
                    response.setHeader("error", exception.getMessage());
                    response.setStatus(FORBIDDEN.value());
                    /* response.sendError(FORBIDDEN.value()); */
                    Map<String, String> errors = new HashMap<>();

                    errors.put("error_mesasge", exception.getMessage());
                    response.setContentType(APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), errors);

                }
            } else {
                filterChain.doFilter(request, response);
            }
        }
    }
}
