package Java.Database.Antique;

import Java.Database.AllAppointmentView.AllAppointmentView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AntiqueUserRepository extends JpaRepository<AntiqueUser, Long> {
    List<AntiqueUser> findAllByUsername(String username);
    AntiqueUser findByAntiqueID(Long AntiqueID);

}
