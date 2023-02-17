package Java.Database.role;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long>
{
    Role findByRoleId(Long roleId);
    Role findByRoleName(String roleName);
}
