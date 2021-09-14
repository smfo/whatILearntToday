# Azure service bus

**Message**: a container containing metadata and data. This can be any kind of information. Messages are used to transfer data between different applications and services.

S service bus is as platform-as-a-service (PaaS).`
Azure takes care of the following tasks for you

* Worrying about hardware failures
* Keeping the operating systems or the products patched
* Placing logs and managing disk space
* Handling backups
* Failing over to a reserve machine

## Queues

Messages are sent to and recived from queues. These store messages intil the reciving application is available to recive and process them. The messages are ordered and timestamped on arrival in the reciving application.\
Once a message is accepted it is helt durably in triple-dedundant storage across availability zones (this is done by azure).\
Service bus never keaves messages in memory or volatile storage after they have been accepted.

## Topics

While queues are used for point-to-point communication, topics are used in publish/subscribe scenarios.\
Topics can have multiple, independent subscriptions. These attach to the topis, otherwise they work exactly like queues reon the recivers perspective.

A subscriber to a topic recives every message sent to that topic.\

## Service bus vs. queue

A queue is a simple service to store large numbers of messages, whereas a service bus is a part of a broader messaging service that supports queueing, pub/sub and more advanced patterns.

If your requirements are simple, if you want to send each message to only one destination, or if you want to write code as quickly as possible, 
a storage queue may be the best option. Otherwise, Service Bus queues provide many more options and flexibility.