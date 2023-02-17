package Java.Database.appointment;

import Java.App;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface AppointmentServices {


    Appointment addAppointment
                                (String appointmentDate,
                                 String appointmentTime,
                                 boolean appointmentConfirmed,
                                 String appointmentDescription,
                                 String appointmentStatus,
                                 Long antiqueOwnerID,
                                 HttpServletResponse response);

    Appointment updateAppointmentAllData (Long appointmentID,
                                   Long appraiserID,
                                   String AppointmentDate,
                                   String appointmentTime,
                                   String appointmentDescription,
                                   String status,
                                   boolean appointmentConfirmation,
                                   HttpServletResponse response);

    //? Used when Appraiser Choose Appointment
    String chooseAppointment(Long appointmentID,
                                     Long appraiserConfirmedAppointmentID
                                     );

    //? Used when Appraiser Change Appointment Time
    String changeTimeAppointment (Long appointmentID,
                                String newAppointmentDate,
                                String newAppointmentTime,
                                HttpServletResponse response
                                );
    //? Used when Appraiser/Normal  Want to Cancel Appointment
    String cancelAppointmentByNormalUser (Long appointmentID,
                            HttpServletResponse response);


    //? Appointment Table
    String getAppointmentStatusByAppointmentID(Long appointmentID,
                                               HttpServletResponse response);

    //? Used for table display information
    List<Appointment> getAllAppointments(HttpServletResponse response);

    List<Appointment> getAllAppointmentsByAntiqueOwnerUsername
            (String antiqueOwnerUsername,
             HttpServletResponse response);

    List<Appointment> findAllByAppointmentDate(String appointmentDate);
    List<Appointment> getAllAppointmentByProfessionalAppraiserUsername
            (String professionalAppraiserUsername,
             HttpServletResponse response);

    //? Validate Appointment Meeting Time
    boolean validateAppointmentTime(Long appointmentID,
                                    HttpServletResponse response);

    Appointment getByAppointmentID(Long appointmentID);


    String cancelAppointmentByAppraiserUser(Long appointmentID, HttpServletResponse response);
}
