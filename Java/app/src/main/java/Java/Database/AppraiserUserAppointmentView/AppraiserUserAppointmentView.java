package Java.Database.AppraiserUserAppointmentView;

import lombok.AllArgsConstructor;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;

@Entity
@Immutable
@AllArgsConstructor
@Table(name = "AppraiserUserAppointmentView")
public class AppraiserUserAppointmentView {
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
    @Basic
    @Column(name = "FirstName")
    private String antiqueOwnerFirstName;

    @Basic
    @Column(name = "LastName")
    private String antiqueOwnerLastName;

    @Basic
    @Column(name = "AppointmentDescription")
    private String appointmentDescription;

    @Basic
    @Column(name = "AppointmentStatus")
    private String appointmentStatus;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "username")
    private String username;

    public AppraiserUserAppointmentView() {

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

    public String getAntiqueOwnerFirstName() {
        return antiqueOwnerFirstName;
    }

    public void setAntiqueOwnerFirstName(String antiqueOwnerFirstName) {
        this.antiqueOwnerFirstName = antiqueOwnerFirstName;
    }

    public String getAntiqueOwnerLastName() {
        return antiqueOwnerLastName;
    }

    public void setAntiqueOwnerLastName(String antiqueOwnerLastName) {
        this.antiqueOwnerLastName = antiqueOwnerLastName;
    }

    public String getAppointmentDescription() {
        return appointmentDescription;
    }

    public void setAppointmentDescription(String appointmentDescription) {
        this.appointmentDescription = appointmentDescription;
    }

    public String getAppointmentStatus() {
        return appointmentStatus;
    }

    public void setAppointmentStatus(String appointmentStatus) {
        this.appointmentStatus = appointmentStatus;
    }
}
