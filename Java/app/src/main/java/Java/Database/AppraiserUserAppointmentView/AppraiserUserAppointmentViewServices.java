package Java.Database.AppraiserUserAppointmentView;

import java.util.List;

public interface AppraiserUserAppointmentViewServices {
    List<AppraiserUserAppointmentView> getAllByAppraiserID(Long antiqueOwnerID);

    AppraiserUserAppointmentView getByAppointmentID(Long appraiserID);

}
