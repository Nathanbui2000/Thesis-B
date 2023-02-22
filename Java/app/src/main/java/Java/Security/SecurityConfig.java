package Java.Security;


import Java.Security.filter.CustomAuthenticationFilter;
import Java.Security.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SecurityConfig extends WebSecurityConfigurerAdapter {
        private final UserDetailsService userDetailsService;
        private final BCryptPasswordEncoder bCryptPasswordEncoder;

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            List<String> list = new ArrayList<String>();
            list.add("*");
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
            corsConfiguration.setAllowedOrigins(List.of("*"));
            corsConfiguration
                        .setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT", "OPTIONS", "PATCH",
                                        "DELETE"));
            corsConfiguration.setAllowedOriginPatterns(list);
            corsConfiguration.setExposedHeaders(List.of("Authorization"));

    // You can customize the following part based on your project, it's only a
    // sample

           /* http.csrf().disable();
            http.sessionManagement().sessionCreationPolicy(STATELESS);*/
    // ? Production
    http.authorizeRequests().antMatchers("/user/normal-user/sign-up").permitAll();
    http.authorizeRequests().antMatchers("/user/appraiser-user/sign-up").permitAll();

    http.authorizeRequests().antMatchers("/user/verify").permitAll();
    http.authorizeRequests().antMatchers("/user/verified-email").permitAll();
    http.authorizeRequests().antMatchers("/user/user-profile/**").permitAll();
    http.authorizeRequests().antMatchers("/user/logged-in-user").permitAll();
    http.authorizeRequests().antMatchers("/user/get-user-by-username").permitAll();
    http.authorizeRequests().antMatchers("/user/delete-user-by-username").hasAnyAuthority("ROLE_ADMIN");
    http.authorizeRequests().antMatchers("/user/get-user-role-by-username").permitAll();
    http.authorizeRequests().antMatchers("/user/all").permitAll();
    http.authorizeRequests().antMatchers("/user/antique-user-verification-requested").permitAll();



            http.authorizeRequests().antMatchers("/user/reset-password").permitAll();
    http.authorizeRequests().antMatchers("/user/token/refresh-token").permitAll();

    http.authorizeRequests().antMatchers("/user/forgot-password").permitAll().and().csrf().disable()
        .cors();
    http.authorizeRequests().antMatchers("/api/v1/login").permitAll().and().csrf().disable().cors()
        .configurationSource(request -> corsConfiguration);

/*
            http.authorizeRequests().antMatchers("/user/save-tokens").hasAnyAuthority("ROLE_USER");
*/
    http.authorizeRequests().antMatchers("/api/v1/user/**").hasAnyAuthority("ROLE_USER");
    http.authorizeRequests().antMatchers("/appointment/add-appointment").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/update-appointment-all").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/appraiser-choose-appointment").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/change-appointment").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/normal-user-delete-appointment").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/change-appointment").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/get-appointment-status-by-id").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/get-all-appointment").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/normal-user-get-all-appointment").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/appraiser-get-all-appointment").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/get-all-appointment-by-date").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/validate-appointment-time").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/appraiser-user-cancel-appointment").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appointment/get-appointment-by-id").permitAll().and().csrf().disable().cors();

    http.authorizeRequests().antMatchers("/all-appointment-view/all").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/all-appointment-view/get-by-id").permitAll().and().csrf().disable().cors();

    http.authorizeRequests().antMatchers("/normal-user-appointment-view/find-all-by-username").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appraiser-user-appointment-view/find-all-by-username").permitAll().and().csrf().disable().cors();
    http.authorizeRequests().antMatchers("/appraiser-user-appointment-view/get-by-appointment-id").permitAll().and().csrf().disable().cors();

            http.authorizeRequests().anyRequest().authenticated();
    http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
    http.addFilterBefore(new CustomAuthorizationFilter(),
        UsernamePasswordAuthenticationFilter.class);

    // ? Development
    /*
     * http.authorizeRequests().antMatchers("/api/v1/login").permitAll().and().csrf(
     * ).disable().cors().configurationSource(request -> corsConfiguration);
     */
    /*
     * http.authorizeRequests().anyRequest().permitAll().and().csrf().disable().cors
     * ()
     * .configurationSource(request -> corsConfiguration);
     * http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
     * http.addFilterBefore(new CustomAuthorizationFilter(),
     * UsernamePasswordAuthenticationFilter.class);
     */

  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}
