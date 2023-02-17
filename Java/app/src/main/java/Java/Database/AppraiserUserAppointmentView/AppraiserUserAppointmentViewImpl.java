package Java.Database.AppraiserUserAppointmentView;

import Java.Database.AllAppointmentView.AllAppointmentViewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AppraiserUserAppointmentViewImpl implements AppraiserUserAppointmentViewServices{
    private final AppraiserUserAppointmentViewRepos appraiserUserAppointmentViewRepos;

    @Override
    public List<AppraiserUserAppointmentView> getAllByAppraiserID(Long appraiserID) {
        return this.appraiserUserAppointmentViewRepos.findAllByProfessionalAppraiserID(appraiserID);
    }
    @Override
    public AppraiserUserAppointmentView getByAppointmentID(Long appointmentID) {
        return this.appraiserUserAppointmentViewRepos.findByAppointmentID(appointmentID);
    }
}
