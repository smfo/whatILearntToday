

// the wildcard has to be placed at the bottom of the last imported routing file!
// Or else it will catch all the calls meant for routes that are declared after it

{ path: '**',           //wildcard, path does not match any of the above
      component: PageNotFoundComponent }