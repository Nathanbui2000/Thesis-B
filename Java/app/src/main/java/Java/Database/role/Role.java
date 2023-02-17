package Java.Database.role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Role")
public class Role {
    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "RoleId")
    private Long roleId;

    @Basic
    @Column(name = "RoleName", nullable = false)
    private String roleName;
}
