package Java.Database.appointment;

import Java.Database.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;

import java.io.Serializable;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Data
@AllArgsConstructor
@IdClass(AppointmentID.class)
@Table(name = "`Appointment`")
public class Appointment {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "AppointmentID")
    private Long appointmentID;


    @Id
    @Column(name = "AntiqueOwnerID")
    private Long antiqueOwnerID;


    public Long getProfessionalAppraiserID() {
        return professionalAppraiserID;
    }

    public void setProfessionalAppraiserID(Long professionalAppraiserID) {
        this.professionalAppraiserID = professionalAppraiserID;
    }

    @Basic
    @Column(name = "ProfessionalAppraiserID")
    private Long professionalAppraiserID;

    @Basic
    @Column(name = "AppointmentDate")
    private String appointmentDate;

    @Basic
    @Column(name = "AppointmentTime")
    private String appointmentTime;

    @Basic
    @Column(name = "Description")
    private String description;

    @Basic
    @Column(name = "status")
    private String status;

    @Basic
    @Column(name = "appointmentConfirmed")
    private boolean confirmation;

    public Appointment() {

    }

    public Appointment(Long antiqueOwnerID,
                       String appointmentDate,
                       String appointmentTime,
                       String description,
                       String status,
                       boolean confirmation) {
        this.antiqueOwnerID = antiqueOwnerID;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.description = description;
        this.status = status;
        this.confirmation = confirmation;
    }


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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isConfirmation() {
        return confirmation;
    }

    public void setConfirmation(boolean confirmation) {
        this.confirmation = confirmation;
    }
}
