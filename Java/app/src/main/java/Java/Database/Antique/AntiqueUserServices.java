package Java.Database.Antique;

import Java.Database.user.User;

import java.util.List;

public interface AntiqueUserServices {
    List<AntiqueUser> findAllByUsername(String username);

    String addAntiqueIDByUsername(String username, String antiqueID, String antiqueNameOrMaterial);

    User getUserByAntiqueID(Long antiqueID);
}

