package Java.Database.AllAppointmentView;

import Java.Database.appointment.Appointment;
import Java.Database.appointment.AppointmentID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AllAppointmentViewRepository extends JpaRepository<AllAppointmentView, Long> {
    List<AllAppointmentView> findAll();
    AllAppointmentView findByAppointmentID(Long appointmentID);
}
