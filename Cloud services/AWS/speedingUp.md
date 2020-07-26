
# Speeding up the application with CloudFront and ElasticCache

## CloudFront
Improves latency in the application, by "reducing" the distance between user and app. Instead of the user request getting sent to a server far away, cloudfront sets up a
intermediat point between the server and the user, so that the distance the data has to travel to the user is shorter, therefore reducing the response time.\
Cloudfront has several edge locations that holds copies of some of the information on the server. A request is first sent to a edgelocation close to the user to see
if the data requested is stored there. If this is not the case, the request is forwarded to the original server. The edge locations holds data that is frequently requested in
that area, this information can be from one or more origin services, ECs, S3, load balancers etc.

You can create multiple distributions that hosts different types of data and needs seperate configuration values.

## ElasticCache
Used for usecases that require much faster data retrival than RDS and DynamoDB can offer. In memory cache storage. Elasticach offer
Memcached and Redis. Both engines operate with a cluster containing nodes. While memcached can contain up to 20 nodes per cluster, redis only have one node per cluster.

The cluster needs to ba associated with a sercurity group. However these cannot be created while creating the cluster and must therefore be created previous. Create a security group
using the correct VPC and make sure do include this when creating the cluster.

When connectiong to elasticache in the code, use the primary endpoint, up until .com, provided from the ElastiCache dashboard, and set up caching in the application.
```javascript
 const server = Hapi.Server({
    port: 3000,
    cache: [
      {
        name: 'redis',
        provider: {
          constructor: require('@hapi/catbox-redis'),
          options: {
            partition: 'cache',
            host: 'pizza-cluster.2e3he0.0001.eun1.cache.amazonaws.com'
          }
        }
      }
    ]
  })


   // setup cache
  const cache = server.cache({
    segment: 'sessions',
    expiresIn: 24 * 60 * 60 * 1000,
    cache: 'redis'
  })
  server.app.cache = cache
```