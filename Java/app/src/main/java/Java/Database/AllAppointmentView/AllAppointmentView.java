package Java.Database.AllAppointmentView;

import Java.Database.appointment.AppointmentID;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Immutable
@AllArgsConstructor
@Table(name = "`AllAppointmentView`")
public class AllAppointmentView {
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
    @Column(name = "AntiqueOwnerID")
    private Long antiqueOwnerID;

    @Basic
    @Column(name = "Username")
    private String username;
    @Basic
    @Column(name = "Description")
    private String description;

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

    public Long getAntiqueOwnerID() {
        return antiqueOwnerID;
    }

    public void setAntiqueOwnerID(Long antiqueOwnerID) {
        this.antiqueOwnerID = antiqueOwnerID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "FirstName")
    private String firstName;

    @Basic
    @Column(name = "LastName")
    private String lastName;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AllAppointmentView() {

    }
}
