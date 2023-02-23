package Java.Database.Antique;

import java.util.List;

public interface AntiqueUserServices {
    List<AntiqueUser> findAllByUsername(String username);

    String addAntiqueIDByUsername(String username, String antiqueID);
}
