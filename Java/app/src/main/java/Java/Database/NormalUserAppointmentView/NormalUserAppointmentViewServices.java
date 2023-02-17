package Java.Database.NormalUserAppointmentView;

import java.util.List;

public interface NormalUserAppointmentViewServices {
    List<NormalUserAppointmentView> getAllByAntiqueOwnerID(Long antiqueOwnerID);
}
