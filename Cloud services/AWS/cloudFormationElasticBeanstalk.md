
# Cloud Formation
Create AWS infrastructure over and over using templates.

**Templates**
A JSON document containing configuration for recourses and how they relate. Can be used with version control. There is no limit to the
amount of resources.

**Stack**
A group of resources created by a single template. Each template can create multiple stacks, with unique names.\
We can also update or delete stacks. Deleting a stack removes all the resources present in it.

**Cloud formation designer**
Visual presentation, and design tool.

**CloudFormer**
Looks at existing resources and creates a template based on these.

The template contains a resource object that lists everything that cloud formation should create, this is basically the entire document.\
Each resource has a type field that says what kind of service they are, and properties that vary depending on this.
```javascript
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Resources": {
    "vpc0d9ce469": {
      "Type": "AWS::EC2::VPC",
      "Properties": {
        "CidrBlock": "10.0.0.0/16",
        "InstanceTenancy": "default",
        "EnableDnsSupport": "true",
        "EnableDnsHostnames": "true",
        "Tags": [
          {
            "Key": "Name",
            "Value": "pizza-vpc-cloudformation"
          }
        ]
      }
    },
    "subnet0a00807c": {
      "Type": "AWS::EC2::Subnet",
      "Properties": {
        "CidrBlock": "10.0.1.0/24",
        "AvailabilityZone": "us-west-2b",
        "VpcId": {
          "Ref": "vpc0d9ce469"
        },
        "Tags": [
          {
            "Key": "Name",
            "Value": "pizza-subnet-b"
          }
        ]
      }
    }
```

Make sure the launchconfiguration has the correct imageId, this can be found in the AMI.
```javascript
"lcpizzalauncher2": {
      "Type": "AWS::AutoScaling::LaunchConfiguration",
      "Properties": {
        "AssociatePublicIpAddress": true,
        "ImageId": "ami-00c7708966942bfd4", //use the correct AMIId here
        "InstanceType": "t2.micro",
        "KeyName": "pizza-keys",
        "IamInstanceProfile": "pizza-ec2-role",
        "SecurityGroups": [
          {
            "Ref": "sgpizzaec2sg"
          }
        ],
        "BlockDeviceMappings": [
          {
            "DeviceName": "/dev/xvda",
            "Ebs": {
              "VolumeSize": 8
            }
          }
        ],
        "UserData": "IyEvYmluL2Jhc2gNCmVjaG8gInN0YXJ0aW5nIHBpenphLWx1dnJzIg0KY2QgL2hvbWUvZWMyLXVzZXIvcGl6emEtbHV2cnMNCm5wbSBzdGFydA=="
      }
    }
```

**Create** stacks via the dashboard with a ready template or a new template.

**Delete** in the cloudformation menu. This will delete all resources and it will be like they never existed.


# Elastic Beanstalk
Automate deployment of the application (scaling, monitoring, resource provisioning).

Upload the application code and ES will create an EC2 instance with the correct AMI and platform.

Requirements for the application:
* Logical application
* Select what platform to run on
* One or more application versions

Like in a VPC a ES application has multiple environments that contains a AMI, EC2 instance, ASG and a application version. 
The application can have multiple environments, ex. running a test and a prod environment or only differ by running different
application versions.

Create a new application in the environments tab. Select the correct platform and upload the application code as a zip file. This should 
not be a zip of the root folder, but a zip containing all the lose folders and files in the root folder.\
Click "configure more options" to select already existing versions of VPC and subnets, Security groups, load balancers, roles, databases etc.

Elastic beanstalk uses cloud formation to create the new application, and this will be visible in the cloud formation dashboard.

After creating the application, make sure it has access to all resources it needs access to.

To upload and deploy new versions use the "Actions" dropdown or click the "Upload and deploy" button of the elastic beanstalk environment.

# The difference
Elastic beanstalk is made to be easy to use even for users of AWS that does not know everything about the underlying services. It is a layer that abstracts away
the EC2 instance, load balancers, auto scaling groups and S3 and sets this up accordingly so the user doesnt have to thing about it. Elastic beanstalk takes care of
the content on the resources created as well, whereas cloudofation created the resources but does not care about their content.

CloudFormation duplicates infrastructure setups, but only from a already existing template, unlike ElasticBeanstalk that does everything for you after
uploading the application code. Essentialy you need to know more about the infrastructure even using halp tools. CloudFormer needs a existing project
to create a template and cloud formation is just a helping tool that makes visualising the infrastructure easier.

CloudFormation updates and deletes whole stacks by..
While Elastic Beanstalk creates a new application version when a new version of the application is uploaded.