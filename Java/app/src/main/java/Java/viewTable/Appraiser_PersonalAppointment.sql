
--? Appraiser Personal Appointment Data
select appointment.appointmentid,appointment.appointment_date, appointment.appointment_time,appointment.professional_appraiserid,user.first_name,user.last_name
from appointment
         left join (
    user left join user_roles ur
        on user.user_id = ur.user_user_id
        left join role r on ur.roles_role_id = r.role_id
)
                   on appointment.professional_appraiserid=user.user_id
where appointment.professional_appraiserid = 6