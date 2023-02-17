package Java.Database.appointment;

import Java.App;
import Java.Database.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import Java.Database.appointment.Appointment;
import Java.Database.appointment.AppointmentID;
import Java.Database.user.User;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, AppointmentID> {

    Appointment findAppointmentByAppointmentID(Long appointmentID);
    Appointment findAppointmentByAntiqueOwnerID(Long antiqueOwnerID);
    Appointment findAppointmentByProfessionalAppraiserID(Long appraiserID);
    List<Appointment> findAllByAppointmentDate(String appointmentDate);
    List<Appointment> findAll();

    @Query("SELECT " +
            "appointment.appointmentID," +
            "appointment.appointmentDate," +
            "appointment.appointmentTime," +
            "appointment.professionalAppraiserID," +
            "user.firstName," +
            "appointment.description," +
            "appointment.status " +
            "FROM " +
            "Appointment as appointment " +
            "LEFT JOIN " +
            "User as user " +
            "ON " +
            "appointment.antiqueOwnerID = user.userId " +
            "WHERE " +
            "appointment.professionalAppraiserID = ?1")
    List<Appointment> findAllByProfessionalAppraiserID(Long appraiserID);

    @Query("SELECT " +
            "appointment.appointmentID," +
            "appointment.appointmentDate," +
            "appointment.appointmentTime," +
            "appointment.professionalAppraiserID," +
            "user.firstName," +
            "appointment.description," +
            "appointment.status " +
            "FROM " +
            "Appointment as appointment " +
            "LEFT JOIN " +
            "User as user " +
            "ON " +
            "appointment.professionalAppraiserID = user.userId " +
            "WHERE " +
            "appointment.antiqueOwnerID = ?1")
    List<Appointment> findAllByAntiqueOwnerID(Long antiqueOwnerID);

    void deleteByAppointmentID(Long appointmentID);


}
