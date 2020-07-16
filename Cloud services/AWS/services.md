
# Core services

## EC2 (Elastic cloud compute)
Basic unit of computing, "virtual machine".

* Run applications
* Virtual desktop
* 3rd party software

Can be used for computing of services hosted around the world. The operations can increase or decrease as needed.\
See Virtual machines for more.

**Instance**
A virtual server hosting an application.\
Amazone machine image (AMI): oparating system and software used on an EC2 instance. Amazone maintains these images.
Instance type: specs for instance, number of cpus, ram etc
Elastic block storage (EBS): for EC2 file systems, not file storage

**Pricing**
Charges by the hour. Price depends on instance type and image type

## S3 (Simple storage service)
Stores any type of files.\
See S3 for more.

Structured in buckets. These can have different authorization, hosting opptions, logging. Objects are added, updated and deleted from buckets.
Buckets are available via urls.
`https://s3-us-west-1.amazonaws.com/okfido.org/img/okfido_logo.png`\
s3-us-west-1: region\
okfido: bucket name\
img/okfido_logo.png: object path

Pricing (differ per region):
* Amount of data stored
* Number of requests
* Amount of data transferred

## RDS (Relational database service)
It is possible to install your own database in EC2, however RDS takes care of a lot of managed database aspects
such as backup, redundancy, software patches, security etc.\
Options: MySql, SqlServer, MariaDB, Oracle, Amazone Aurora, PostGreSql (also offer other options such as NoSQL and document databases)\
Match to the correct EC2 instance, 5TB limit.

Pricing:
* Type of database
* Region
* EC2 instance type

## Route53
Service for DNS (domain name system, translates URLs to IP adresses) management.\
Matches URLs with AWS instances.

# Extended services

## EB (Elastic Beanstalk)
Application scaling. Deploys the app to EC2 and much more. Monitors and loggs the application.

Manages multiple application versions and deploys them to different environments (test, prod etc). Application versions are
stored in S3. Each application has a lomit of 1000 versions.

Free service (need to pay for EC2, load balancers and S3).

## Lambda
Function code execution, function as a service.

Lambda will execute code almost without configuration. No server management required. Only pay when the code is run.

## DynamoDB
Managed NoSQL document database. 

Vs RDS: Unlimited elastic storage, No hardware choices, only pay for what you use.

Pricing depends on amount of data stored and provisioned throughput capacity (reads and writes).

## VPC (Virtual private cloud)
Secure groups of instances. Resources in one VPC are isolated from other VPCs.\
See Virtual machines for more.

Consists of subnets. Recourses can be grouped in these to use different configurations and follow different rules (ex. private and public subnet). Subnets allow for different behaviour in the same VPC.

Free service.

## CloudWatch
Monitoring service for other services in AWS.\
Monitoring resources, alarms from other AWS services.\
See "Administration" for more.

Price: differ depending on the function (alarms, ingesting logs, archived logs, dashboards)

## CloudFront
Serve files locally with very fast connections. Works with S3, EC2, Load balancer, Route53.