

// Cookies were created to solve the problem "how to remember information about the user"
// Information should be stored in cookies with the understanding that all cookie values will be visible to, 
// and can be changed by, the end-user

// Create/change cookie with JS:
document.cookie = "userName=John; expires=Thu, 18 Dec 2019 12:00:00 UTC; path=/"
// THe cookie belongs to the user John, it lasts until the set time and belongs to the current page

// Session cookie
// only exists in temporary memory while the user navigates the website. Are normally deleted
// by the browser when the client shuts down. Unlike other cookies, the do not have expiration dates,
// which is how the browser knows to treat them as session cookies


// Secure cookies
// A secure cookie is only sent to the server with an encrypted request over the HTTPS protocol.
// even with secure, sensitive information shoud never be stored in cookies, they are insecure
// and cannot offer real protection

// Domain and path 
// domain and path define the scope of the cookie, which URLs they should be sent to
// Domain specifies the allowed host to receive the cookie. If unspecifies the default if the host
// of the current document location, excluding subdomains. If the domain is specified, the subdomains
// are alwaysincluded
// Path indicates the URL path that must exist in the requested URL in order to send the cookie header.
// Subdirectives will match as well, as "/" is considered a directiry separator

