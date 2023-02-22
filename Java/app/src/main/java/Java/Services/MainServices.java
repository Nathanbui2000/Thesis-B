package Java.Services;

public class MainServices {
    private static MainServices instance;
    private EmailAPI emailAPI = new EmailAPIImpl();;

    public static MainServices getInstance() {
        if (instance == null) {
            instance = new MainServices();
        }
        return instance;
    }

    private MainServices mainServices() {
        instance = new MainServices();

        return instance;
    }

    public void sendEmailForgotPasswordServices(String username, String firstName, String url) {
        if (username == null || firstName == null || url == null) {
            return;
        } else {
            emailAPI.sendEmailForgotPasswordServices(username, firstName, url);
        }
    }

    public void sendEmailVerifyAccountServices(String username, String firstName, String url) {
        if (username == null || firstName == null || url == null) {
            return;
        } else {
            emailAPI.sendEmailVerifyEmailServices(username, firstName, url);
        }
    }

    public String sendEmailConfirmUploadResource(String userEmailAddress, String firstName, String documentationTitle ) {
        if (userEmailAddress == null || firstName == null || documentationTitle == null) {
            return null;
        } else {
            return emailAPI.sendEmailConfirmDocumentsUpload(userEmailAddress, firstName, documentationTitle);
        }
    }
    public String sendEmailConfirmPasswordChange(String userEmailAddress, String firstName)
    {
        if(userEmailAddress == null || firstName == null)
        {
            return null;
        }
        else{
            return emailAPI.sendEmailUpdatePassword(userEmailAddress, firstName);
        }
    }

    public String sendEmailVerifyAntiqueUserByToken(String userEmailAddress,
                                                    String firstName,
                                                    String lastName,
                                                    String antiqueUserVerificationCode
                                                    )
    {
        if (userEmailAddress == null ||
                firstName ==null ||
                lastName == null ||
                antiqueUserVerificationCode == null
        )
        {
            return null;
        }
        return emailAPI.sendEmailConfirmAntiqueUser(userEmailAddress,firstName,lastName,antiqueUserVerificationCode);
    }


}
