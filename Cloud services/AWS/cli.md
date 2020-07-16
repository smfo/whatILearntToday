
# Cli and setup of account

Windows:  download the AWS cli from amazon.com/cli and create an account.\
Navigate to "My security credentials" by clicking the username in the header. Click the "Access key" tab and create a new key. Download this and input the information in the cli as asked after inputting "aws configure".
This will ask for the access key, the secret key, your region and your deciered data output format.

To activate MFA from my security credentials, expand the tab and click the button. Select virtual devices for use of mobile phone. Download an MFA app, scan the QRCode and register using two codes. Now everyone who logs in have to use both a password and a MFA code in order to logg in to his account.

* aws ec2 describe-instances: lists all your EC2 instances