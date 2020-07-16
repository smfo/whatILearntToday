
# Administration

## IAM (Identity and access management service)
Simple user and access management.\
Who can have access to what in AWS. Users can have full or limited access to certain services. All services are available for the Root account to administer, it can also manage billing and other users.

One of the things you can do to secure your root user is to activate MFA, see cli.
Another is to assign different policies to specific users or groups of users. One user can belong to multiple groups.

### Policies
Policies consist of multiple policy statements. These statements declaring whether a user is allowed to do something or not. By default users have no permissions.\'
There are ready made policies and customer made policies. View then in the IAM Service - Policies.\

Policy statement:\
* Effect: allow or deny, how does the policy respons to a user requesting access
* Action: operations users can performe on a services
* Resource: specifies which resources the user can perform an action on. Typically contains the arn to the choosen resources

**Users and groups**\
Create and add users from the IAM dashboard and insert the keys in the CLI. Activate the password policy.
Add users to groups in the groups tab.

Select the user, security credentials and manage the console access, enable console access and set a password.

**Roles**\
Roles are like users without any way of logging in. They are something that can be used to attach policies to.\
When creating, chose the service it should be attached to and select permissions the role should have.

**Logging in**\
Users will not log in using the "Log in to console" the root user uses. Instead they use a custom link that can be found at the top of the IAM dashboard. The Accont ID is preoccupied based on the link used to get there, log in as a user here.

## CloudWatch
Set alarms and notifications in response to events.
Set alarms based on metrices in other services, forwards this to SNS that decides how the notification should be transmitted to the user. CloudWatch can also trigger an action to solve the alarm, ex. auto scaling.

**Set up alarm**\
For billing alarms:\
Billing alarms are only available in the North Virginia region, so set that region. Also make billing alarms available by selecting "Recive billing alerts" from Username - My billing dachboard - Billing preferences

Create an alarm by selectiong Alarms from the sice menu and clicking create alarm. Click Select metric and select the metric the alarm should be watching. Fill in the requirements, select next and decide which SNS, and therefore which subscriptions, should be notified when the alarm goes off. The alarm will be added to the alarms list.

## SNS (Simple notification service)
Pushes alerts to the notification endpoints.

Topic: used to greate a arn that can be subscribed to using sms or email. Region specific, can only be notified by alarms in the same region.

Create SNS and set up subscription: Go to SNS and create a topic, giving it a name is the only thing that is  required. On the SNS dashboard select Topics, click the desiered topic, select the subscriptions tab and click create subscription. Then select the desiered subscription protocol.
To get to the dashboard, search for the SNS.