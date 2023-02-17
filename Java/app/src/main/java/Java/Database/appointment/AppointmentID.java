package Java.Database.appointment;

import javax.persistence.IdClass;
import java.io.Serializable;

public class AppointmentID implements Serializable {
    public AppointmentID(Long appointmentID, Long antiqueOwnerID) {
        this.appointmentID = appointmentID;
        this.antiqueOwnerID = antiqueOwnerID;
    }

    private Long appointmentID;


    public Long getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(Long appointmentID) {
        this.appointmentID = appointmentID;
    }

    public Long getAntiqueOwnerID() {
        return antiqueOwnerID;
    }

    public void setAntiqueOwnerID(Long antiqueOwnerID) {
        this.antiqueOwnerID = antiqueOwnerID;
    }



    private Long antiqueOwnerID;



    public AppointmentID()
    {

    }


}
