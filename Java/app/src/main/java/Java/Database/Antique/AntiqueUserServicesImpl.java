package Java.Database.Antique;

import Java.Database.AllAppointmentView.AllAppointmentViewRepository;
import Java.Database.user.User;
import Java.Database.user.UserRepository;
import Java.Services.MainServices;
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
    private final UserRepository userRepository;
    private MainServices mainServices;

    @Override
    public List<AntiqueUser> findAllByUsername(String username) {
        if (username == null)
            return null;
        return antiqueUserRepository.findAllByUsername(username);
    }

    @Override
    public String addAntiqueIDByUsername
            (
                    String username,
                    String antiqueID,
                    String antiqueNameOrMaterial
            )
    {
        mainServices = MainServices.getInstance();
        if (username == null || antiqueID == null)
            return "Received Null Username or AntiqueID";
        AntiqueUser newData = new AntiqueUser(parseLong(antiqueID),username);
        User userData = userRepository.findByUsername(newData.getUsername());
        antiqueUserRepository.save(newData);
        //Todo: Send Email to username
        this.mainServices.sendEmailAddAntiqueSuccessful
                (
                    userData.getUsername(),
                    userData.getFirstName(),
                    userData.getLastName(),
                    antiqueID,
                    antiqueNameOrMaterial
                );
        return "Successfully Added";
    }

    @Override
    public User getUserByAntiqueID(Long antiqueID)
    {
        //mainServices = MainServices.getInstance();
        if (antiqueID == null)
            return null;
        AntiqueUser data = antiqueUserRepository.findByAntiqueID(antiqueID);
        if (data == null)
        {
            return null;
        }

        return userRepository.findByUsername(data.getUsername());
    }
}
