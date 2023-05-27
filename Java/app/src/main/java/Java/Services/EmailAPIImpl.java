package Java.Services;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

public class EmailAPIImpl implements EmailAPI {

    //TODO: Add SendGrid Account
    public static String api_key = "";
    public static String targetEmail = "";

    public EmailAPIImpl() {

    }

    public String sendEmailInformation(String data, String receiverName, String receiverEmailAddressEmail,
            String senderName, String subject) {
        String JSONbody = "";
        JSONbody += "{\"personalizations\":[{\"to\":[{\"email\":\"" + receiverEmailAddressEmail;
        JSONbody += "\",\"name\":\"" + receiverName;
        JSONbody += "\"}],\"subject\":\"AntiqueIoTChain: " + subject + "\"}],";
        JSONbody += "\"from\":{\"email\":\"" + targetEmail;
        JSONbody += "\",\"name\":\"" + senderName;
        JSONbody += "\"},";
        JSONbody += "\"content\": [{\"type\":\"text/html\", \"value\":\"" + data + "\"}]}";
        System.out.println(JSONbody);
        try {
            HttpResponse<String> response = Unirest.post("https://api.sendgrid.com/v3/mail/send")
                    .header("authorization", "Bearer " + api_key)
                    .header("content-type", "application/json")
                    .body(JSONbody)
                    .asString();
            System.out.println(response);

            System.out.println(response.getBody());
            return response.getBody();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;

    }

    public String formatForgotPasswordEmailContent(String firstName, String url) {
        if (firstName == null) {
            return null;
        }
        String returnData = "";

        // * Add The Header to the data
        returnData += "<h1> Reset Password </h1>";
        returnData += "Dear: " + firstName + " We have received your request to reset password <br>";
        returnData += "<br><br>";
        returnData += " <strong> Please Click On The Link Below To Reset Your Password  </strong>";
        returnData += "<br><br>";
        returnData += "<br>" + url + "<br>";
        returnData += "<br><br>";
        returnData += "<Strong> Please Changing Your Password If You didn't request to change password <Strong>";
        returnData += "<br><br><br>";
        System.out.println(returnData);
        return returnData;
    }

    @Override
    public String sendEmailForgotPasswordServices(String username, String firstName, String url) {
        String emailData = formatForgotPasswordEmailContent(firstName, url);
        String SendEmailReturnResult = sendEmailInformation(emailData, firstName, username, "AntiqueIoTChain",
                "Reset Your Password");
        return SendEmailReturnResult;
    }

    private String formatVerifyEmailContent(String firstName, String url) {
        if (firstName == null) {
            return null;
        }
        String returnData = "";

        // * Add The Header to the data
        returnData += "<h1> Verify Account </h1>";
        returnData += "Dear: " + firstName;
        returnData += "<br><br><br>";
        returnData += " <strong> Please Click On The Link Below To Verify your account  </strong>";
        returnData += "<br><br>";
        returnData += "<br>" + url + "<br>";
        returnData += "<br><br><br>";
        System.out.println(returnData);
        return returnData;
    }

    @Override
    public String sendEmailVerifyEmailServices(String username, String firstName, String url) {
        String emailData = formatVerifyEmailContent(firstName, url);
        System.out.println("Account Verification URL:" + url);
        String SendEmailReturnResult = sendEmailInformation(emailData, firstName, username, "AntiqueIoTChain",
                "Verify you Account");
        return SendEmailReturnResult;
    }

    @Override
    public String sendEmailConfirmDocumentsUpload(String userEmailAddress, String firstName, String documentationTitle) {
        String emailData = formatUploadDocumentsEmailContent(firstName,documentationTitle);
        String SendEmailReturnResult = sendEmailInformation(emailData, firstName, userEmailAddress, "AntiqueIoTChain","Your Recent Document Uploaded Successful !");
        return SendEmailReturnResult;
    }

    @Override
    public String sendEmailUpdatePassword(String userEmailAddress, String firstName) {
        String emailData = formatPasswordUpdateEmail(firstName);
        String SendEmailReturnResult = sendEmailInformation(emailData, firstName, userEmailAddress, "AntiqueIoTChain","Your Password Has Been Changed!");
        return SendEmailReturnResult;
    }

    @Override
    public String sendEmailConfirmAntiqueUser(String antiqueEmailAddress, String firstname, String lastname, String verificationCode ) {
       String emailContent = formatVerifyAntiqueUserEmailContent(firstname,lastname,verificationCode);
       String sendEmailResult = sendEmailInformation(emailContent,firstname,antiqueEmailAddress,"AntiqueIoTChain","Antique User Verification Code");
       return sendEmailResult;
    }

    @Override
    public String sendEmailAddAntiqueSuccessful
            (
                    String userEmailAddress,
                    String firstName,
                    String lastName,
                    String antiqueID,
                    String antiqueNameOrMaterial
            )
    {
        String emailContent = formatNormalUserAddAntiqueSuccessful
                (
                        firstName,
                        lastName,
                        antiqueID,
                        antiqueNameOrMaterial
                );
        String sendEmailResult = sendEmailInformation
                (
                        emailContent,
                        firstName,
                        userEmailAddress,
                        "AntiqueIoTChain",
                        "Antique Object Successfully Verified !");
        return sendEmailResult;
    }

    private String formatUploadDocumentsEmailContent(String firstName, String documentationTitle) {
        if (firstName == null || documentationTitle ==null) {
            return null;
        }
        String returnData = "";

        // * Add The Header to the data
        returnData += "<h1> Thank You For Your Contribution ! </h1>";
        returnData += "Dear: " + firstName;
        returnData += "<br><br>";
        returnData += " <h3> We Have Received Your Recent Upload Documents For: " + documentationTitle + " </h3>";
        returnData += "<p>We appreciated your contribution for the community ! </p>";
        returnData += "<br><br>";
        returnData += "<p> Kind Regards </p>";
        returnData += "<p> AntiqueIoTChain Team </p>";

        System.out.println(returnData);
        return returnData;
    }
    private String formatPasswordUpdateEmail(String firstName) {
        if (firstName == null) {
            return null;
        }
        String returnData = "";

        // * Add The Header to the data
        returnData += "<h1>Your Password Has Been Updated !</h1>";
        returnData += "Dear: " + firstName;
        returnData += "<br><br><br>";
        returnData += " <h3> Your Password has recently been changed  </h3>";
        returnData += "<br><br>";
        returnData += " <p> If this isn't you, Please Consider Changing Your Password Immediately  </p>";
        returnData += "<br><br><br>";
        returnData += "<br><br>";
        returnData += "<p> Kind Regards </p>";
        returnData += "<p> AntiqueIoTChain Team </p>";
        System.out.println(returnData);
        return returnData;
    }
    private String formatVerifyAntiqueUserEmailContent(String firstName, String lastName, String verificationCode)
    {
        if (firstName == null) {
            return null;
        }
        String returnData = "";
        // * Add The Header to the data
        returnData += "<h1>Antique Verification Code ! </h1>";
        returnData += "Dear Mr: " + firstName + " " + lastName ;
        returnData += "<br><br><br>";
        returnData += " <h3> You have recently requested a verification for <strong>Add Antique Object</strong>. Below is the verification code </h3>";
        returnData += "<br><br>";
        returnData += "<strong>" + verificationCode +"</strong>";
        returnData += "<br><br>";
        returnData += " <p> If this isn't you, Please Consider Changing Your Password Immediately  </p>";
        returnData += "<br><br><br>";
        returnData += "<br><br>";
        returnData += "<p> Kind Regards </p>";
        returnData += "<p> AntiqueIoTChain Team </p>";
        System.out.println(returnData);
        return returnData;

    }

    private String formatNormalUserAddAntiqueSuccessful
            (
                    String firstName,
                    String lastName,
                    String antiqueID,
                    String antiqueNameOrMaterial
            )
    {
        if (firstName == null) {
            return null;
        }
        String returnData = "";
        // * Add The Header to the data
        returnData += "<h1>Antique Verification Successful!</h1>";
        returnData += "Dear Mr: " + firstName + " " + lastName ;
        returnData += "<br><br>";
        returnData += " <h3> We have recently completed your antique Verification for:  <strong>" +  antiqueNameOrMaterial + "</strong>.</h3>";
        returnData += "<br><br>";
        returnData += " <p> The Unique Antique Object For "+ antiqueNameOrMaterial +" <strong>: " + antiqueID + " </strong>  </p>";
        returnData += "<br>";
        returnData += "<br>";
        returnData += "<p> Kind Regards </p>";
        returnData += "<p> AntiqueIoTChain Team </p>";
        System.out.println(returnData);
        return returnData;

    }
}
