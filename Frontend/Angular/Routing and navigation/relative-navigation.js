


//Relative navigation
// calculate the new path based on the active route's location (ex. find an about page with a specific id)

// Relative navigation back to the crises
this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
//gives the resulting path
/crisis-center/;id=3;foo=foo

// ../ goes up one folder, while ./ stays in the same folder