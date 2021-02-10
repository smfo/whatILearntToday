
# SmtpClient

SmtpClient is used to send emails from .NET asynchronously.

```C#
using System.Net.Mail;

try{
    // the constructor can have no inputs, only server or server and port
    SmtpClient smtpClient = new SmtpClient("specific smtp server", specific port){
        Credentials = new NetworkCredential("access email", "password")
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
```

## For gmail

smtp server: smtp.gmail.com\
port: 587

In addition you have to allow your email to be accessed by less secure [applications](https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4MCaZdzyWUtFJnAinFPC2JHhx974L-IRC3zjMsp0Q7-tGgJWjcXwIEX_0WAW8GB4MU7kEUJTyf0dV9IjY3RdtNK-cn6Lg). It will take some time before the settings update.

```C#
try
{
     
    SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587)
    {
        Credentials = new NetworkCredential("email here", "password here"),
        EnableSsl = true
    };

    MailMessage mailMessage = new MailMessage("from email", "to email")
    {
        Subject = "Subject string",
        Body = "Body content"
    };

    smtpClient.Send(mailMessage);
    Console.WriteLine("Finished, message sent");
}
catch (Exception ex)
{
    Console.WriteLine("Sending failed", ex);
    System.Diagnostics.Debug.WriteLine(ex);
};
```

## Html message body
To write the message using html add `IsBodyHtml = true` to your `MailMessage` object.

```C#
MailMessage mailMessage = new MailMessage("from email", participant.Email)
    {
        Subject = "Fog-Bråthen Secret Santa",
        IsBodyHtml = true,

        Body = "<b>Hei, velkommen til Fog-Bråthen secret santa 2020!</b> <br/><br/>" +
        "Din secret santa er <b>" + participant.Friend+ "</b<br/>" + 
        "Ønskene de har sendt inn er " + participaFriendWishList + ".<br/> Budsjettet er satt til 200-300kr. <br/><br/>" + 
        "Vi sees 26. desember. Lykke til!"
    };
```