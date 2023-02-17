package Java.Database.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(Long UserId);

    User findByUsername(String username);

    User findByResetPasswordToken(String token);

    User findByToken(String token);
    void deleteByUsername(String username);

}