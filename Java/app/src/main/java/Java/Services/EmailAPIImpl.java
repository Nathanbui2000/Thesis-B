package Services;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

public class EmailAPIImpl implements EmailAPI {
    public static String api_key = "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";
    public static String targetEmail = "nathan.bui@sbm.com.au";

    public EmailAPIImpl() {

    }

    public String sendEmailInformation(String data, String receiverName, String receiverEmailAddressEmail,
            String senderName, String subject) {
        String JSONbody = "";
        JSONbody += "{\"personalizations\":[{\"to\":[{\"email\":\"" + receiverEmailAddressEmail;
        JSONbody += "\",\"name\":\"" + receiverName;
        JSONbody += "\"}],\"subject\":\"CourseMania: " + subject + "\"}],";
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
        String SendEmailReturnResult = sendEmailInformation(emailData, firstName, username, "CourseMania",
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
        String SendEmailReturnResult = sendEmailInformation(emailData, firstName, username, "CourseMania",
                "Verify you Account");
        return SendEmailReturnResult;
    }

    @Override
    public String sendEmailConfirmDocumentsUpload(String userEmailAddress, String firstName, String documentationTitle) {
        String emailData = formatUploadDocumentsEmailContent(firstName,documentationTitle);
        String SendEmailReturnResult = sendEmailInformation(emailData, firstName, userEmailAddress, "CourseMania","Your Recent Document Uploaded Successful !");
        return SendEmailReturnResult;
    }

    @Override
    public String sendEmailUpdatePassword(String userEmailAddress, String firstName) {
        String emailData = formatPasswordUpdateEmail(firstName);
        String SendEmailReturnResult = sendEmailInformation(emailData, firstName, userEmailAddress, "CourseMania","Your Password Has Been Changed!");
        return SendEmailReturnResult;
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
        returnData += "<p> CourseMania Team </p>";

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
        returnData += "<p> CourseMania Team </p>";
        System.out.println(returnData);
        return returnData;
    }
}
