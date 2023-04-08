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

    public Long getAntiqueID() {
        return antiqueID;
    }

    public void setAntiqueID(Long antiqueID) {
        this.antiqueID = antiqueID;
    }

    public AntiqueUser(Long antiqueID, String username) {
        this.antiqueID = antiqueID;
        this.username = username;
    }

    @Basic
    @Column(name = "AntiqueID")
    private Long antiqueID;

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



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


}