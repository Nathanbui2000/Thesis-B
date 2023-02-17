package Java.Database.AppraiserUserAppointmentView;

import Java.Database.NormalUserAppointmentView.NormalUserAppointmentView;
import Java.Database.appointment.Appointment;

import java.util.List;

public interface AppraiserUserAppointmentViewServices {
    List<AppraiserUserAppointmentView> getAllByAppraiserID(Long antiqueOwnerID);
    AppraiserUserAppointmentView getByAppointmentID (Long appraiserID);
}
