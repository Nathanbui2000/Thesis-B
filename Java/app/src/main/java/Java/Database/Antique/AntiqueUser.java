package Java.Database.Antique;

import Java.Database.appointment.AppointmentID;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Data
@AllArgsConstructor
@Table(name = "AntiqueUser")
public class AntiqueUser {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "AntiqueUserID")
    private Long AntiqueUserID;

    @Basic
    @Column(name = "AntiqueID")
    private Long AntiqueID;

    @Basic
    @Column(name = "Username")
    private String username;


    public AntiqueUser() {

    }

    public Long getAntiqueUserID() {
        return AntiqueUserID;
    }

    public void setAntiqueUserID(Long antiqueUserID) {
        AntiqueUserID = antiqueUserID;
    }

    public Long getAntiqueID() {
        return AntiqueID;
    }

    public void setAntiqueID(Long antiqueID) {
        AntiqueID = antiqueID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public AntiqueUser(Long antiqueID, String username) {
        AntiqueID = antiqueID;
        this.username = username;
    }
}