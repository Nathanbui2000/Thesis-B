package Java.Services;

public interface EmailAPI {
    String sendEmailForgotPasswordServices(String username, String firstName, String token);

    String sendEmailVerifyEmailServices(String username, String firstName, String url);

    String sendEmailConfirmDocumentsUpload(String userEmailAddress, String firstName, String documentationTitle);

    String sendEmailUpdatePassword(String userEmailAddress, String firstName);

    String sendEmailConfirmAntiqueUser(String antiqueEmailAddress, String firstname, String lastname, String verificationCode);
}