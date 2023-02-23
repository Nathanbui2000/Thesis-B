package Java.Database.Antique;

import Java.Database.AllAppointmentView.AllAppointmentViewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.lang.Long.parseLong;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AntiqueUserServicesImpl implements AntiqueUserServices {
    private final AntiqueUserRepository antiqueUserRepository;

    @Override
    public List<AntiqueUser> findAllByUsername(String username) {
        if (username == null)
            return null;
        return antiqueUserRepository.findAllByUsername(username);
    }

    @Override
    public String addAntiqueIDByUsername(String username, String antiqueID) {
        if (username == null || antiqueID == null)
            return "Received Null Username or AntiqueID";
        AntiqueUser newData = new AntiqueUser(parseLong(antiqueID),username);
        antiqueUserRepository.save(newData);
        return "Successfully Added";
    }
}
