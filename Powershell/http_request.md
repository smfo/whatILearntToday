# Http request with Powershell

```ps1
Invoke-WebRequest -Uri {REQUESTURI} -Method {REQUESTTYPE} [-Body (@{grant_type='VALUE';scope='VALUE'} | ConvertTo-Json)] -Headers @{"Authorization"="TOKENTYPE {TOKEN}"; "Content-Type"="application/json"; "Accept"="application/json"}
```

For endpoint with authentication (bearer token)
- Get credentials and convert to byte -> base64
- Make authentication request to get token
- Make request call

The credentials to get the bearer token from the auth endpoint needs to be in base64
```ps1 
$Bytes = [System.Text.Encoding]::UTF8.GetBytes({CLIENTID}:{CLIENTSECRET})
$base64Text = [Convert]::ToBase64String($Bytes)

# Get bearer token
$tokenResponse = Invoke-WebRequest -Uri https://auth.eps.udir.no/v1/oauth2/tokens -Method POST -Body (@{grant_type='client_credentials';scope='datastore-api:read datastore-api:write'} | ConvertTo-Json) -Headers @{"Authorization"="Basic $base64Text"; "Content-Type"="application/json"; "Accept"="application/json"}
```

Collect the token from the response and use it in your requests
```ps1

Invoke-WebRequest -Uri https://data.eps.udir.no/api/v1/deliveries/d853c0b397a7 -Method GET -Headers @{"Authorization"="Bearer {TOKEN}"; "Content-Type"="application/json"; "Accept"="application/json"}

Invoke-WebRequest -Uri https://data.eps.udir.no/api/v1/deliveries/d853c0b397a7/https%253A%252F%252Fforfatter.eps.udir.no%252F%2523i62c6926a051d63576f86d62bdea9a4304 -Method GET -Headers @{"Authorization"="Bearer {TOKEN}"; "Content-Type"="application/json"; "Accept"="application/json"} | Set-Content -Path C:\delete_me_item.json
```