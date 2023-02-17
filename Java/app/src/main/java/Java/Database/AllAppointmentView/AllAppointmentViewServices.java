package Java.Database.AllAppointmentView;

import java.util.List;

public interface AllAppointmentViewServices {
    List<AllAppointmentView> getAllAppointments();

    AllAppointmentView getByID(Long appointmentID);
}
