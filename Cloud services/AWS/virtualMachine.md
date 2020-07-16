
# Setting up a virtual machine

## Virtual private cloud
From the VPC dashboard: make sure you are in the correct region, click launch VPC wizard, select a VPC type and fill in any other required information.\
VPCs are listed under virtual private cloud - your VPCs

To access the internett: Select the VPC - description and click the Route table link. Go to the routes tab, edit routes, add route. Add a 0.0.0.0/0 destination with the preset igw-... target.

### Subnets
One subnet can only exist in one availability zone.\

Add via the subnet menu choice. Name it, chose the assosiated VPC and select a availability zone. Add a CIDR block that does not interfeer with already existing CIDRs, see the list on the page.

## Elastic cloud compute
A EC2 is a virtual machine. The operating system is also refered to as AMI (Amazon machine image).

Create by chosing launch instance, select the image to use, an instance type, select the assosiated VPC, subnet and any other information. Add a security group and add security rules. 
For localhost access add a rule using "Custom TCP", the port number and anywhere. Creat an download a keypair to be able to SSH into the application.

The EC2 instances are listed under instances. Information available include the public IP, private IPs and the key pair name.

### ElasticIP
Public IP addresses that are created, destroyed and assigned independetly. Can be assigned to new EC2 instances if the old one is destroyed.

From the EC2 dashboard: network and security - Elastic IP. To associate with a instance click actions - associate with IP and fill in the form. This elastic IP will now be the public IP for chosen instance.

### Connection to the EC2 instance
Follow these steps to connect to the instance using Putty: https://linuxacademy.com/guide/17385-use-putty-to-access-ec2-linux-instances-via-ssh-from-windows/\
Remember to save as **private** key and use the ElasticIP as the public_dns_name.

In the CLI type sudo yum update to update the packages. Type curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash - and then sudo yum install -y nodejs to install node.

### Upload application
To save time, delete the node_modules folder from the application, this will be installed again after uploading the file.

On windows it is possible to use pscp to upload files, but that sucks so use WinSCP instead. Log in using the public IP as the host name and the user name that fits the EC2 image. Select the advanced option for password, click authentication
and upload the private key. When in session drag and drop files from the computer (left) to the EC2 instance (right) to transfer files.

Log in to the instance using putty, navigate to the project folder and type `npm install`. Start the application by typing `npm start` and go to the public IP followed by the localhost port.

### Scaling EC2 instance
AWS allows for copying a snapshot of the EC2 instance to another instance. This can also be done using a auto scaling group.

**Load balancer**\
However, if an application runs on multiple instances with different IP adresses, there has to be a system to direkt the users to the right adress.
The Load balancer is a routing appliance that maintains a cinsisten DNS entry and balances requests to multiple instances in AWS. The user sends a request to the load balancer instead of
directly to one of the EC2 instances. The load balancer keeps track of which instances can accept requests and sends the user request there. That way the user only has to keep track
of where the load balancer is.\
A load balancer can be directly connected to a auto scaling group.

### Create an AMI (Amazone machine image) from EC2 image
EC2 - instances, select the deciered instance to duplicate and click actions - image - create image. Give the image a name and change any variables if deciered. 
The EC2 instance image will now be available under "My images" when choosing a image for future EC2 instances. An overview over created instanses can be found under
EC2 - AIMs.

Duplicated AMIs have the same operative system, installations and files as the original instance.\
In order to protect users from having their AIMs modifyed, it is not possible to update AMIs. If the AMI needs to be changed, create a new one and use this in ex. launch configurations and auto scaling groups.

### Creating a Load Balancer (ABL)
From EC2 dashboard - Load balancers - create load balancer\
Select the type of balancer based on what application is being used. In step 4 set what port the load balancer should be listening to, available applications on that port
will be displayed in step 5. Select which instances the balancer should connect to.\
Load balancers are available under EC2 - Load balancing - load balancers

**Stickiness**\
Enable stickiness to make sure users that have connected to an instance will stay connected to that instance instead of sending a request to another one.\
EC2 - load balancing - target groups\
Select the target group, edit attributes, enable stickiness and set stickiness duration.

**Load balancer IP vs Elastic IP**\
The Elastic IP creates a public IP for an EC2 instance, however if we have multiple instances using the same AMI but f.ex. in different regions, these will have different IPs. By directing the 
user to the load balancer IP instead, they only have to know one IP but can behind the scene access any of the EC2 instances, even instances that does not have an Elastic IP.

### Creating an auto scaling group (ASG)
This is used to automatically scale EC2 instances based on a set metric.\
First create a launch configuration with a AMI, security group, node script and key pair.

To start the application in node, insert this in the configure details user data
```javascript
#!/bin/bash
echo "message to console"
cd /application folder placement on ec2 instance
npm start
```
In the auto scaling group select a launch configuration or launch template.

To actually scale automatically you need to add scaling policies. A policy is connected to an alarm. The policy say what actions the auto scaling group should take when an alarm is triggered, 
and the alarm sets the conditions for the action to trigger. This could be amount of data traffic or other metices.\
The target group chosen in the ASG connects it to the ABL using the same target group. This does so that the ABL knows which instances are created by the ASG. To have access to these the rules of
the scalers security group needs to allow requests from the loader. This can be done by allowing all requests, or a bit more securly, allow access from the security group used by the loader. This can be done in all
security groups and means that all resources using the set security group has access to instances belonging to the security group setting the rule.

**EC2 instances**\
If the instances look healthy in ASG but not in the target group, there can be something wrong with how the ASG starts the instances in node. Check the user data script in the launch configuration, from above.\
If this is done correctly, check the security group being used by the instances. The ASG security group needs a rule that lets the ABL, and the target groups, security group access it.

* EC2 instance: the virtual machine the application is running on
* AMI: operating system and software used on an EC2 instance. Can be used to take a snapshot of an EC2 instance and copy it for scaling
* Load balancer: recives requests from the user and directs them to a available targets within the target group they have access to, can connect to a auto scaling group
* Target group: a collection of instances that can be refered to in other setups. ex. EC2 instance subnets, EC2 instances, containers, IP adresses
* Security group: a set of security rules that apply to the instances in the group. ex. ow can the instances be accessed from the internett
* Auto scaling group: require a launch configuration. Monitors the chosen instances and scales them up/down as needed