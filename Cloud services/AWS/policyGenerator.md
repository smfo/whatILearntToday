
# Policy generator

There are many policies that can be created for AWS. Here is an S3 example:

* select polity type S3
* Principal: who should this policy apply to (AWS accounts: arn for that account(s), * for everyone)
* select actions to performe in the chosen service
* ARN: arn:aws:s3:::s3bucketname/object (/* can be added at the end for access to all bucket objects)

Add as many statements as deciered and generate the policy. Copy to where it is needed.

In S3 example: chosen policy - permissions - bucket policy.