package Java.Database.AppraiserUserAppointmentView;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppraiserUserAppointmentViewRepos extends JpaRepository<AppraiserUserAppointmentView, Long> {
    List<AppraiserUserAppointmentView> findAllByProfessionalAppraiserID(Long appraiserID);

    AppraiserUserAppointmentView findByAppointmentID(Long appointmentId);
}
