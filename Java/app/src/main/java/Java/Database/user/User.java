package Java.Database.user;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.AUTO;

import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import Java.Database.role.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@Table(name = "`User`") // backtick to force quote table name in generated hibernate SQL.
public class User {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "UserId")
    private Long userId;

    @Basic
    @Column(name = "Username", nullable = false)
    private String username;

    @Basic
    @Column(name = "FirstName", nullable = false)
    private String firstName;

    @Basic
    @Column(name = "LastName", nullable = false)
    private String lastName;

    @Basic
    @Column(name = "PasswordHash", nullable = false)
    private String passwordHash;


    @Basic
    @Column(name = "VerifySignUpToken")
    private String token;

    @Basic
    @Column(name = "verified", nullable = false)
    private Boolean verified;

    @ManyToMany(fetch = EAGER)
    @Column(name = "Roles")
    private Collection<Role> roles = new ArrayList<Role>();

    //? New Attribute
    @Basic
    @Column(name = "AppraiserExperiencesYear")
    private String appraiserExperiencesYear;

    @Basic
    @Column(name = "AppraiserDriverLicence")
    private String appraiserDriverLicence;

    //* Appraiser User Sign Up
    public User(
                String username,
                String firstName,
                String lastName,
                String passwordHash,
                String appraiserExperiencesYear,
                String appraiserDriverLicence,
                String blockchainAddress,
                String token
                ) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;
        this.appraiserExperiencesYear = appraiserExperiencesYear;
        this.appraiserDriverLicence = appraiserDriverLicence;
        this.blockchainAddress = blockchainAddress;
        this.verified = false;
        this.token = token;
    }

    @Basic
    @Column(name = "BlockchainAddress")
    private String blockchainAddress;

    public String getResetPasswordToken() {
        return resetPasswordToken;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public void setResetPasswordToken(String resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    public User() {
    }

    public User(Long userId) {
        this.userId = userId;
    }

    //* Normal User Account Signup
    public User(
            String userName,
            String firstName,
            String lastName,
            String passwordHash,
            String blockchainAddress,
            String token) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;
        this.token = token;
        this.username = userName;
        this.blockchainAddress = blockchainAddress;
        this.verified = false;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

   public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isVerified() {
        return this.verified;
    }

    public void verify() {
        this.verified = true;
    }

    public String getAppraiserExperiencesYear() {
        return appraiserExperiencesYear;
    }

    public void setAppraiserExperiencesYear(String appraiserExperiencesYear) {
        this.appraiserExperiencesYear = appraiserExperiencesYear;
    }

    public String getAppraiserDriverLicence() {
        return appraiserDriverLicence;
    }

    public void setAppraiserDriverLicence(String appraiserDriverLicence) {
        this.appraiserDriverLicence = appraiserDriverLicence;
    }


    public String getBlockchainAddress() {
        return blockchainAddress;
    }

    public void setBlockchainAddress(String blockchainAddress) {
        this.blockchainAddress = blockchainAddress;
    }


}
