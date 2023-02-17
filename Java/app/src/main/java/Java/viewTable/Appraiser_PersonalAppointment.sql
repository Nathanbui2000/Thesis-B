
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

create view AntiqueIoTChain.appraiser_user_appointment_view As
SELECT
    appointment.appointmentid,
    appointment.appointment_date,
    appointment.appointment_time,
    appointment.professional_appraiserid,
    user.first_name,
    user.last_name,
    appointment.description,
    appointment.status
FROM
    appointment
        LEFT JOIN
    user
    ON
            appointment.antique_ownerid = user.user_id
        LEFT JOIN
    user_roles ur
    ON
            user.user_id = ur.user_user_id
        LEFT JOIN
    role r
    ON
            ur.roles_role_id = r.role_id
WHERE
        appointment.professional_appraiserid = 6


create view AntiqueIoTChain.appraiser_user_appointment_view As
SELECT
    appointment.appointmentid,
    appointment.appointment_date,
    appointment.appointment_time,
    appointment.professional_appraiserid,
    user.first_name,
    user.last_name,
    appointment.description as appointment_description,
    appointment.status as appointment_status,
    user.username
FROM
    appointment
        LEFT JOIN
    user
    ON
            appointment.antique_ownerid = user.user_id
