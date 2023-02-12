
select appointment.appointmentid,appointment.appointment_date, appointment.appointment_time,appointment.antique_ownerid,user.first_name,user.last_name
from appointment
         left join (
    user left join user_roles ur
        on user.user_id = ur.user_user_id
        left join role r on ur.roles_role_id = r.role_id
)
                   on appointment.antique_ownerid=user.user_id
where user.user_id = 3