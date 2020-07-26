
# Databases

## Relational database service (RDS)
An RDS Instance installes a EC2 instance under the covers.

RDS takes daily backups, multi-AZ deployment (database replicated to different availability zone in the same region in case one goes down),
database read replica.

There are many different engines to choose from, with different costs (due to licenses).

**Create PostSQL database**\
From the dashboard, create the deciered database. Make sure it delongs to the correct VPC and has the correct public accessibility.

**Connect**\
Make sure you have access to the database. If running locally this means adding a rule to the security group to let get access with your IP.

Use a GUI like pgAdmin to connect to the RDS endpoint and log in with the admin user created with the database.
Create the tables you want in the database and connect to it using the endpoint, username, password and database name.

https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_NET.rds.html

## DynamoDB
NoSQL database, stores data in tables without a schema. Each table contains different items with the same primary key.

The items tab work as the GUI for the database, and the capacity tab tells you the cost of this database per month.

**Creating table**\
From the dashboard, create a table from the dashboard with a name and primary key field.

**Connecting using code**\
```javascript
const AWS = require('aws-sdk')

AWS.config.update({ region: 'eu-north-1' })

const dynamodb = new AWS.DynamoDB.DocumentClient()

//example query
async function getItem (table, idKey, id) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
      Key: {
        [idKey]: id
      }
    }

    dynamodb.get(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Item)
      }
    })
  })
}
```