# Microsoft graph

A gatewat to data and intelligence in Microsoft 365.

## Microsoft graph API

Offers a single endpoint `https://graph.microsoft.com`. Can be accessed through the REST APIs or SDKs. Install the `Microsoft.Graph` nuget package to use the SDK.

Contains two core libraries, the service library and the core library. The service library contains models and request builders. The core library provides featyres that makes it easier to work with Microsoft Graph. Embedded support for retry handling, secure redirects, transparent authentication etc.

If you only use a small subset of the SDK, consider creating a client using **Kiota** instead.

### Client credential provider

Used this provider when the application should be able to run without user interaction. Access is based on the identity of the application run.

```C#
var scopes = new[] { "https://graph.microsoft.com/.default" };

// Values from app registration
var clientId = "YOUR_CLIENT_ID";
var tenantId = "YOUR_TENANT_ID";
var clientCertificate = new X509Certificate2("MyCertificate.pfx");

// using Azure.Identity;
var options = new ClientCertificateCredentialOptions
{
    AuthorityHost = AzureAuthorityHosts.AzurePublicCloud,
};

// https://learn.microsoft.com/dotnet/api/azure.identity.clientcertificatecredential
var clientCertCredential = new ClientCertificateCredential(
    tenantId, clientId, clientCertificate, options);

var graphClient = new GraphServiceClient(clientCertCredential, scopes);
```