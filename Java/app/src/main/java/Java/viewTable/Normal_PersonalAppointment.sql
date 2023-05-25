
select appointment.appointmentid,appointment.appointment_date, appointment.appointment_time,appointment.antique_ownerid,user.first_name,user.last_name
from appointment
         left join (
    user left join user_roles ur
        on user.user_id = ur.user_user_id
        left join role r on ur.roles_role_id = r.role_id
)
                   on appointment.antique_ownerid=user.user_id
where user.user_id = 3


SELECT appointment.appointmentid,
       appointment.appointment_date,
       appointment.appointment_time,
       appointment.professional_appraiserid,
       user.first_name,
       user.last_name,
       appointment.status

FROM appointment
         LEFT JOIN user
                   ON appointment.professional_appraiserid = user.user_id
WHERE appointment.antique_ownerid = 3;

create view AntiqueIoTChain.normal_user_appointment_view As
SELECT appointment.appointmentid,
       appointment.appointment_date,
       appointment.appointment_time,
       appointment.professional_appraiserid,
       appointment.antique_ownerid,
       appointment.status as appointment_status,
       user.first_name,
       user.last_name
FROM appointment
         LEFT JOIN user
                   ON appointment.professional_appraiserid = user.user_id
         LEFT JOIN user_roles ur
                   ON user.user_id = ur.user_user_id
         LEFT JOIN role r
                   ON ur.roles_role_id = r.role_id
