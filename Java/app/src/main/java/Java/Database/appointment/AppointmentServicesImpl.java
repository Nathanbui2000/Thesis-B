package Java.Database.appointment;

import Java.Database.role.RoleRepository;
import Java.Database.user.User;
import Java.Database.user.UserRepository;
import Java.Database.user.UserService;
import Java.Services.MainServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.security.auth.callback.ConfirmationCallback.OK;
import static org.springframework.http.HttpStatus.BAD_REQUEST;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AppointmentServicesImpl implements AppointmentServices{
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final MainServices mainService = MainServices.getInstance();
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    public Appointment addAppointment
            (String appointmentDate,
             String appointmentTime,
             boolean appointmentConfirmed,
             String appointmentDescription,
             String appointmentStatus,
             Long antiqueOwnerID,
             HttpServletResponse response)
    {
        //? Validate Parameters
        List<String> parameters = new ArrayList();
        parameters.add(appointmentDate);
        parameters.add(appointmentTime);
        parameters.add(appointmentDescription);
        parameters.add(appointmentStatus);

        if (!validateMethodParameter(null,"addAppointment",parameters,response))
            return null;

        //? Add Appointment Data
        try
        {
            Appointment appointment = new Appointment
                    (       antiqueOwnerID,
                            appointmentDate,
                            appointmentTime,
                            appointmentDescription,
                            appointmentStatus,
                            false
                    );
            appointment.setProfessionalAppraiserID(0L);
            appointmentRepository.save(appointment);
            return appointment;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return null;
    }

    /***
     * Update Appointment Details Such as
     * Appointment Description, Date, Time, Status
     * @param appointmentID
     * @param appraiserID
     * @param appointmentDate
     * @param appointmentTime
     * @param appointmentDescription
     * @param appointmentStatus
     * @param appointmentConfirmation
     * @param response
     * @return Appointment Objects
     */
    @Override
    public Appointment updateAppointmentAllData
                    (Long appointmentID,
                    Long appraiserID,
                    String appointmentDate,
                    String appointmentTime,
                    String appointmentDescription,
                    String appointmentStatus,
                    boolean appointmentConfirmation,
                    HttpServletResponse response)
    {
        //? Validate Parameters
        List<String> parameters = new ArrayList();
        parameters.add(appointmentDate);
        parameters.add(appointmentTime);
        parameters.add(appointmentDescription);
        parameters.add(appointmentStatus);
        if(!validateMethodParameter(appointmentID,"addAppointment",parameters,response))
            return null;

        if (appraiserID < 0)
        {
            //? Invalid Parameter Appraiser ID Provided
            response.setHeader("Error", "updateAppointmentAllData received Invalid Appraiser ID ");
            response.setStatus(BAD_REQUEST.value());
            log.info("updateAppointmentAllData Methods Received Invalid Appraiser Id");
            return null;
        }

        //? Update Appointment Details.
        Appointment currentAppointmentData =
                appointmentRepository.findAppointmentByAppointmentID(appointmentID);
        if (currentAppointmentData == null)
        {
            response.setHeader("Error", "updateAppointmentAllData received Not Found AppointmentID");
            response.setStatus(BAD_REQUEST.value());
            log.info("updateAppointmentAllData Methods Received Invalid AppointmentID");
            return null;
        }
        User appraiserUser =  userRepository.findByUserId((long) appraiserID);

        if (appraiserID > 0)
        {
            currentAppointmentData.setProfessionalAppraiserID(appraiserID);
        }

        currentAppointmentData.setAppointmentDate(appointmentDate);
        currentAppointmentData.setAppointmentTime(appointmentTime);
        currentAppointmentData.setStatus(appointmentStatus);
        currentAppointmentData.setConfirmation(appointmentConfirmation);
        currentAppointmentData.setDescription(appointmentDescription);
        appointmentRepository.save(currentAppointmentData);
        return currentAppointmentData;
    }

    /***
     * When Appraiser Choose Appointment, Update Appraiser ID for Appointment Data
     * @param appointmentID
     * @param appraiserConfirmedAppointmentID
     * @param
     * @Return: Response Status
     * @return
     */
    @Override
    public String chooseAppointment(Long appointmentID,
                                            Long appraiserConfirmedAppointmentID)
    {
        if (!validateMethodParameter(appointmentID,"chooseAppointment" ,null,null))
            return "Not Valid Parameters";
        Appointment currenAppointmentData = appointmentRepository.findAppointmentByAppointmentID(appointmentID);

        //Todo: Validate Appraiser ID
        User appraiserData = userRepository.findByUserId(appraiserConfirmedAppointmentID);
        currenAppointmentData.
                setProfessionalAppraiserID(appraiserConfirmedAppointmentID);
        currenAppointmentData.setConfirmation(true);
        appointmentRepository.save(currenAppointmentData);
        //response.setStatus(OK);
        return "Successful";
    }

    @Override
    public String changeTimeAppointment(Long appointmentID,
                                      String newAppointmentDate,
                                      String newAppointmentTime,
                                      HttpServletResponse response)
    {
        List<String> parameters = new ArrayList();
        parameters.add(newAppointmentDate);
        parameters.add(newAppointmentTime);
        if (!validateMethodParameter(appointmentID,
                "changeTimeAppointment",parameters,response))
            return "Invalid Parameter provided. Please Checked";

        //? Update Appointment Data
        Appointment currentAppointment = appointmentRepository.findAppointmentByAppointmentID(appointmentID);
        currentAppointment.setAppointmentTime(newAppointmentTime);
        currentAppointment.setAppointmentDate(newAppointmentDate);
        appointmentRepository.save(currentAppointment);
        response.setStatus(OK);
        return "Success";
    }

    /***
     * When Normal User Choose To Cancel Appointment, Remove it
     * @param appointmentID
     * @param response
     */
    @Override
    public String cancelAppointmentByNormalUser(Long appointmentID,
                                  HttpServletResponse response)
    {
        if (!validateMethodParameter(appointmentID,"cancelAppointmentByNormalUser",null,response))
            return "Invalid AppointmentID Provided";

        //? Remove Appointment From Database
        appointmentRepository.deleteByAppointmentID(appointmentID);
        response.setStatus(OK);
        return "Success";
    }



    /***
     *  Validate Appointment DateTime Compare to Current Datetime
     * @param appointmentID
     * @param response
     * @return
     * True: If Appointment is in the future
     * False: If Appointment Date Time is already passed current time
     */
    @Override
    public boolean validateAppointmentTime
            (Long appointmentID,
             HttpServletResponse response)
    {
        if (validateMethodParameter(appointmentID,
                "validateAppointmentTime",
                null,
                        response))
        {
            Appointment appointment =  appointmentRepository.findAppointmentByAppointmentID(appointmentID);
            if(appointment != null )
            {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
                try
                {
                    Date date = dateFormat.parse(appointment.getAppointmentDate());
                    Date currentDateTime = new Date();
                    if (date.before(currentDateTime))
                    {
                        return false;
                    }

                    //? In future
                    else if (date.after(currentDateTime))
                    {
                        return true;
                    }
                    else if (date.equals(currentDateTime))
                    {
                        //Time of the meeting
                        Date stringTime = dateFormat.parse(appointment.getAppointmentTime());

                        //? If Time passed current Time ( Later on the same date)
                        if (stringTime.after(currentDateTime))
                        {
                            return true;
                        }
                        return false;

                    }
                }
                catch (ParseException e)
                {
                    e.printStackTrace();
                }
            }
        }

        return false;
    }

    @Override
    public Appointment getByAppointmentID(Long appointmentID) {
        if(appointmentID != null && appointmentID > 0)
        {
            return appointmentRepository.findAppointmentByAppointmentID(appointmentID);
        }
        return null;
    }

    @Override
    public String cancelAppointmentByAppraiserUser
            (Long appointmentID, HttpServletResponse response)
    {
        if (!validateMethodParameter(appointmentID,"cancelAppointmentByNormalUser",null,response))
            return "Invalid AppointmentID Provided";

        //? Remove AppraiserUserID From The Appointment
        Appointment appointmentData = appointmentRepository.findAppointmentByAppointmentID(appointmentID);
        appointmentData.setProfessionalAppraiserID(null);
        appointmentRepository.save(appointmentData);
        return "Appraiser Cancel Appointment Successful";

    }

    /***
     * Check Current Status of Appointment By Appointment ID
     * @param appointmentID
     * @param response
     * @return
     */
    @Override
    public String getAppointmentStatusByAppointmentID
            (Long appointmentID,
             HttpServletResponse response)
    {
        if(!validateMethodParameter(appointmentID,"getAppointmentStatusByAppointmentID",null,response))
            return null;
        return appointmentRepository.findAppointmentByAppointmentID(appointmentID).getStatus();
    }

    /***
     * Display List of Available Appointment For Appraiser [Main Dashboard]
     * @param response
     * @return
     */
    @Override
    public List<Appointment> getAllAppointments(HttpServletResponse response)
    {
        return appointmentRepository.findAll();
    }

    /***
     * Display List of Appointment For Normal User [My Upcoming Appointment]
     * @param antiqueOwnerUsername
     * @param response
     * @return
     */
    @Override
    public List<Appointment> getAllAppointmentsByAntiqueOwnerUsername
            (String antiqueOwnerUsername,
             HttpServletResponse response)
    {
        if(antiqueOwnerUsername == null)
        {
            response.setHeader("Error", "getAllAppointmentsByAntiqueOwnerID received Invalid AntiqueOwnerID");
            response.setStatus(BAD_REQUEST.value());
            log.info( "getAllAppointmentsByAntiqueOwnerID Methods Received Invalid AntiqueOwnerID");
            return null;
        }
        if (userRepository.findByUsername(antiqueOwnerUsername) == null )
            return null;
        return appointmentRepository.findAllByAntiqueOwnerID(userRepository.findByUsername(antiqueOwnerUsername).getUserId());
    }


    /***
     * Display Appointment List For Appraiser [My Appointment Tab]
     * @param professionalAppraiserUsername
     * @param response
     * @return
     */
    @Override
    public List<Appointment> getAllAppointmentByProfessionalAppraiserUsername
            (String professionalAppraiserUsername,
             HttpServletResponse response)
    {
        //Todo: Validate Professional AppraiserID
        if (professionalAppraiserUsername == null )
        {
            response.setHeader("Error", "getAllAppointmentByProfessionalAppraiserID received Invalid AppraiserID");
            response.setStatus(BAD_REQUEST.value());
            log.info( "getAllAppointmentByProfessionalAppraiserID Methods Received Invalid AppraiserID");
            return null;
        }
        if(userRepository.findByUsername(professionalAppraiserUsername) ==null)
            return null;
        return appointmentRepository.findAllByProfessionalAppraiserID(userRepository.findByUsername(professionalAppraiserUsername).getUserId());
    }

    /***
     *
     * @param appointmentDate
     * @return
     */
    @Override
    public List<Appointment> findAllByAppointmentDate(String appointmentDate)
    {
        if (appointmentDate == null )
        {
            throw new IllegalArgumentException("Null Argument");
        }
        return appointmentRepository.findAllByAppointmentDate(appointmentDate);
    }


    /***
     * Used To Validate Given Parameter
     * @param appointmentID
     * @param methodName
     * @param parameters
     * @param response
     * @return
     * True: If all parameters are valids
     * False: If null, Invalid Parameters
     */
    private boolean validateMethodParameter(Long appointmentID,
                                         String methodName,
                                         List<String> parameters,
                                         HttpServletResponse response)
    {
        //? Validate Given Parameters
        if(appointmentID != null &&  appointmentID < 0)
        {
            response.setHeader("Error",methodName + " received null parameter");
            response.setStatus(BAD_REQUEST.value());
            log.info( methodName + " Methods Received Invalid Parameters");
            return false;
        }
        if( parameters != null)
        {
            for (int i = 0; i < parameters.size(); i++) {
                if (parameters.get(i) == null) {
                    response.setHeader("Error", methodName + " received null parameter " + "at position " + i);
                    response.setStatus(BAD_REQUEST.value());
                    log.info(methodName + " Methods Received Null Parameters");
                    return false;
                }
            }
        }

        return true;
    }


}
