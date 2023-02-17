package Java.Database.NormalUserAppointmentView;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class NormalUserAppointmentViewServicesImpl implements NormalUserAppointmentViewServices{
    private final NormalUserAppointmentViewRepository normalUserAppointmentViewRepository;

    @Override
    public List<NormalUserAppointmentView> getAllByAntiqueOwnerID(Long antiqueOwnerID) {
        return normalUserAppointmentViewRepository.findAllByAntiqueOwnerID(antiqueOwnerID);
    }
}
