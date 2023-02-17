package Java;

import Java.Database.appointment.Appointment;
import Java.Database.appointment.AppointmentRepository;
import Java.Database.appointment.AppointmentServicesImpl;
import Java.Database.role.Role;
import Java.Database.role.RoleRepository;
import Java.Database.user.User;
import Java.Database.user.UserRepository;
import Java.Database.user.UserServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Configuration
public class DatabaseConfiguration {
    @Bean(name = "MySQL DB Bean")
    CommandLineRunner commandLineRunner(RoleRepository roleRepository,
                                        UserServiceImpl userService,
                                        UserRepository userRepository,
                                        AppointmentServicesImpl appointmentServices,
                                        AppointmentRepository appointmentRepository
                                        )
    {
        return args -> {
            //? Create new Users
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String nathanPassword = passwordEncoder.encode("1234");
            String encodedPassword = passwordEncoder.encode("1234");
            User nathan = new User("nathan.hoangbui@outlook.com","Firstname1","Lastname1",encodedPassword,"Blockchain Address 1",null);
            User testUser1 = new User("normalUsername1@gmail.com","normalFirstname1","normalLastname1",encodedPassword,"normalBlockchain Address 1",null);
            User testUser2 = new User("normalUsername2@gmail.com","normalFirstname2","normalLastname2",encodedPassword,"normalBlockchain Address 2",null);

            User testUser3 = new User("normalUsername3@gmail.com","normalFirstname3","normalLastname3",encodedPassword,"normalBlockchain Address 3",null);

            User testUser4 = new User("normalUsername4@gmail.com","normalFirstName4","normalLastName4",encodedPassword,"Normal Blockchain Address 4 ",null);
            User testUser5 = new User("Appraiser1@gmail.com","AppraiserFirstname5","AppraiserLastname5",encodedPassword,"Appraiser Blockchain Address 5",null);
            User testUser6 = new User("Appraiser2@gmail.com","AppraiserFirstname6","AppraiserLastname6",encodedPassword,"Appraiser Blockchain Address 6",null);
            User testUser7 = new User("Appraiser3@gmail.com","AppraiserFirstname7","AppraiserLastname7",encodedPassword,"Appraiser Blockchain Address 7",null);


            nathan.setVerified(true);
            testUser1.setVerified(true);
            testUser2.setVerified(true);
            testUser3.setVerified(true);
            testUser4.setVerified(true);
            testUser5.setVerified(true);
            testUser6.setVerified(true);
            testUser7.setVerified(true);

            userRepository.saveAll(List.of(nathan, testUser1,testUser2, testUser3,testUser4,testUser5,testUser6,testUser7));


            roleRepository.save(new Role(1L, "ROLE_USER"));
            roleRepository.save(new Role(2L, "ROLE_APPRAISER"));
            roleRepository.save(new Role(3L, "ROLE_ADMIN"));
            roleRepository.save(new Role(4L, "ROLE_NONE"));

            userService.addRoleToUser("nathan.hoangbui@outlook.com", "ROLE_USER");
            userService.addRoleToUser("nathan.hoangbui@outlook.com", "ROLE_APPRAISER");
            userService.addRoleToUser("nathan.hoangbui@outlook.com", "ROLE_ADMIN");
            userService.addRoleToUser("normalUsername2@gmail.com", "ROLE_USER");
            userService.addRoleToUser("normalUsername3@gmail.com", "ROLE_USER");
            userService.addRoleToUser("normalUsername4@gmail.com", "ROLE_USER");
            userService.addRoleToUser("Appraiser1@gmail.com", "ROLE_APPRAISER");
            userService.addRoleToUser("Appraiser2@gmail.com", "ROLE_APPRAISER");
            userService.addRoleToUser("Appraiser3@gmail.com", "ROLE_APPRAISER");


            //? Create Appointment
            Appointment appointment1 = new Appointment
                    (
                           3L,
                           "Appointment Date 1",
                           "Appointment Time 1",
                           "Description 1",
                           "Status 1",
                            false

                    );
            Appointment appointment2 = new Appointment
                    (
                            2L,
                            "Appointment Date 2",
                            "Appointment Time 2",
                            "Description 2",
                            "Status 2",
                            false

                    );

            Appointment appointment3 = new Appointment
                    (
                            3L,
                            "Appointment Date 3",
                            "Appointment Time 3",
                            "Description 3",
                            "Status 3",
                            true

                    );
            Appointment appointment7 = new Appointment
                    (
                            4L,
                            "Appointment Date 7",
                            "Appointment Time 7",
                            "Description 7",
                            "Status 7",
                            true

                    );
            Appointment appointment4 = new Appointment
                    (
                            4L,
                            "Appointment Date 4",
                            "Appointment Time 4",
                            "Description 4",
                            "Status 4",
                            true

                    );
            Appointment appointment5 = new Appointment
                    (
                            5L,
                            "Appointment Date 5",
                            "Appointment Time 5",
                            "Description 5",
                            "Status 5",
                            true

                    );
            Appointment appointment6 = new Appointment
                    (
                            5L,
                            "Appointment Date 6",
                            "Appointment Time 6",
                            "Description 6",
                            "Status 6",
                            true

                    );
            appointmentRepository.saveAll(List.of(appointment1,appointment2,appointment3,appointment4,appointment5,appointment6,appointment7));


            //? Appraiser Choose Appointment
            //? Get Appointment Data

            appointmentServices.chooseAppointment(
                    appointmentRepository.findAppointmentByAppointmentID(13L).getAppointmentID()
                    , 6L);
            appointmentServices.chooseAppointment(
                    appointmentRepository.findAppointmentByAppointmentID(14L).getAppointmentID(),
                    6L);
            appointmentServices.chooseAppointment(
                    appointmentRepository.findAppointmentByAppointmentID(15L).getAppointmentID(),
                    6L);
            appointmentServices.chooseAppointment(
                    appointmentRepository.findAppointmentByAppointmentID(16L).getAppointmentID(),
                    7L);
            appointmentServices.chooseAppointment(
                    appointmentRepository.findAppointmentByAppointmentID(17L).getAppointmentID(),
                    8L);
            appointmentServices.chooseAppointment(
                    appointmentRepository.findAppointmentByAppointmentID(18L).getAppointmentID(),
                    9L);


        };
    }

    @Bean(name = "Security")
        BCryptPasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
}
