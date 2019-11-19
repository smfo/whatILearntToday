
// SmtpClient is used to send emails from .NET asynchronously

using System.Net.Mail;

try{
    // the constructor can have no inputs, only server or server and port
    SmtpClient smtpClient = new SmtpClient("specific smtp server", specific port){
        Credentials = new NetworkCredentials("access email", "password")
    };

    MailMessage mailMessage = new MailMessage("from email", "to email"){
        Subject = "Subject string",
        Body = "Body content"
    };

    mailMessage.To.Add("another email adress");

    smtpClient.Send(mailMessage);
}
catch(Exception ex)
{
    System.Diagnostics.Debug.WriteLine(ex);
};