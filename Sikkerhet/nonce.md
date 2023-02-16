# Nonce

Number used once\
A Nonce is a one-time token meant to protect forms and URLs from certain types of misuse.

They are usually attached to a certain user, as well as an action, a time etc. This way, changing the userId in the submitted url will cause an error.

Nonces can be used more than once, within a set lifespan.

## Errors

Caused by a request without the correct nonce. Might be thrown when:

* Submitting a form
* Deleting or editing forms
* Whenever urls that contain a nonce are commited to backend, and the nonce is incorrect