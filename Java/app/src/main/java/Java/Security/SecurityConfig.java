package com.coursemania.api.security;

import com.coursemania.api.filter.CustomAuthenticationFilter;
import com.coursemania.api.filter.CustomAuthorizationFilter;
import java.util.ArrayList;
import java.util.List;
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
    http.authorizeRequests().antMatchers("/user/sign-up").permitAll();
    http.authorizeRequests().antMatchers("/user/verify").permitAll();
    http.authorizeRequests().antMatchers("/user/verified-email").permitAll();
    http.authorizeRequests().antMatchers("/user/user-profile/**").permitAll();
    http.authorizeRequests().antMatchers("/user/logged-in-user").permitAll();
    http.authorizeRequests().antMatchers("/uos/resources/**").permitAll();
    http.authorizeRequests().antMatchers("/uos/resource/**").permitAll();
    http.authorizeRequests().antMatchers("/uos").permitAll();
    http.authorizeRequests().antMatchers("/uos/all").permitAll();
    http.authorizeRequests().antMatchers("/uos/**").permitAll();

    http.authorizeRequests().antMatchers("/user/reset-password").permitAll();
    http.authorizeRequests().antMatchers("/university/all").permitAll();
    http.authorizeRequests().antMatchers("/user/token/refresh-token").permitAll();
    http.authorizeRequests().antMatchers("/uos/get-by-unitcode").permitAll();
    http.authorizeRequests().antMatchers("/user/forgot-password").permitAll().and().csrf().disable()
        .cors();
    http.authorizeRequests().antMatchers("/api/v1/login").permitAll().and().csrf().disable().cors()
        .configurationSource(request -> corsConfiguration);

/*
            http.authorizeRequests().antMatchers("/user/save-tokens").hasAnyAuthority("ROLE_USER");
*/
    http.authorizeRequests().antMatchers("/api/v1/user/**").hasAnyAuthority("ROLE_USER");

    http.authorizeRequests().antMatchers("/uos/resource/save-document")
        .hasAnyAuthority("ROLE_USER");
    http.authorizeRequests().antMatchers("/study-resource/delete/**").hasAnyAuthority("ROLE_USER");
    http.authorizeRequests().antMatchers("/study-resource/user-upload-document-check").hasAnyAuthority("ROLE_USER");
    http.authorizeRequests().antMatchers("/user/update-user").hasAnyAuthority("ROLE_USER");
    http.authorizeRequests().antMatchers("/resource-rating/save-resource-rating").permitAll();
    http.authorizeRequests().antMatchers("/resource-rating/get-resource-rating").permitAll();
    http.authorizeRequests().antMatchers("/resource-rating/all-resource-rating").permitAll();
    http.authorizeRequests().antMatchers("/comment/save-comment").permitAll();
    http.authorizeRequests().antMatchers("/comment/get-comment").permitAll();
    http.authorizeRequests().antMatchers("/comment/all-comments").permitAll();
    http.authorizeRequests().antMatchers("/uos/rate/save-rating").permitAll();
    http.authorizeRequests().antMatchers("/uos/rate/get-ratings").permitAll();
    http.authorizeRequests().antMatchers("/study-resource/get-study-resource").permitAll();
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
