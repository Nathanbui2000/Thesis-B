package Java.Database.NormalUserAppointmentView;
import Java.Database.AllAppointmentView.AllAppointmentView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NormalUserAppointmentViewRepository extends JpaRepository<NormalUserAppointmentView, Long> {
    List<NormalUserAppointmentView> findAllByAntiqueOwnerID(Long antiqueOwnerID);

}
