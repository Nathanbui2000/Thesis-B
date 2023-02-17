package Java.Database.AllAppointmentView;

import Java.Database.appointment.AppointmentServicesImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AllAppointmentViewImpl implements AllAppointmentViewServices{
    private final AllAppointmentViewRepository allAppointmentViewRepository;

    @Override
    public List<AllAppointmentView> getAllAppointments()
    {
        return allAppointmentViewRepository.findAll();
    }

    @Override
    public AllAppointmentView getByID(Long appointmentID) {
        return allAppointmentViewRepository.findByAppointmentID(appointmentID);
    }
}
