package Java.Database.NormalUserAppointmentView;

import lombok.AllArgsConstructor;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;

@Entity
@Immutable
@AllArgsConstructor
@Table(name = "NormalUserAppointmentView")
public class NormalUserAppointmentView {
    @Id
    @Column(name = "AppointmentID")
    private Long appointmentID;

    @Basic
    @Column(name = "AppointmentDate")
    private String appointmentDate;

    @Basic
    @Column(name = "AppointmentTime")
    private String appointmentTime;

    @Basic
    @Column(name = "ProfessionalAppraiserID")
    private Long professionalAppraiserID;

    public Long getAntiqueOwnerID() {
        return antiqueOwnerID;
    }

    public void setAntiqueOwnerID(Long antiqueOwnerID) {
        this.antiqueOwnerID = antiqueOwnerID;
    }

    @Basic
    @Column(name = "AntiqueOwnerID")
    private Long antiqueOwnerID;

    @Basic
    @Column(name = "FirstName")
    private String appraiserFirstName;

    @Basic
    @Column(name = "LastName")
    private String appraiserLastName;

    @Basic
    @Column(name = "AppointmentStatus")
    private String appointmentStatus;


    public NormalUserAppointmentView() {

    }

    public Long getAppointmentID() {
        return appointmentID;
    }

    public void setAppointmentID(Long appointmentID) {
        this.appointmentID = appointmentID;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public Long getProfessionalAppraiserID() {
        return professionalAppraiserID;
    }

    public void setProfessionalAppraiserID(Long professionalAppraiserID) {
        this.professionalAppraiserID = professionalAppraiserID;
    }

    public String getAppraiserFirstName() {
        return appraiserFirstName;
    }

    public void setAppraiserFirstName(String appraiserFirstName) {
        this.appraiserFirstName = appraiserFirstName;
    }

    public String getAppraiserLastName() {
        return appraiserLastName;
    }

    public void setAppraiserLastName(String appraiserLastName) {
        this.appraiserLastName = appraiserLastName;
    }

    public String getAppointmentStatus() {
        return appointmentStatus;
    }

    public void setAppointmentStatus(String appointmentStatus) {
        this.appointmentStatus = appointmentStatus;
    }
}
