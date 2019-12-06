

// sometimes we want the component to receive values without these being a part of the path 
// these values can stille be available to the component by adding route parameters

// route parameters
// it is the component that the user is directed to that handles the routing parameter (here the HeroDetailComponent)

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}

  ngOnInit() {
    this.hero$ = this.route.paramMap.pipe(  //this.route.params.subscribe() is also an option (below)
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))
    );
  }

//optionally 
   this.route.params.subscribe(params => {
 				let id = params['id'];        //access the parameter

// Why subscribe?
// Lets say you wanna visit another hero, and pass a new hero/:id URL, the compoent is only recreated if 
// another component has been visited in the meantime. In the case that we navigate from a hero to a hero,
// the component is reused, except with a new parameter value. However, ngOnInit won't be called a second time
// hence the subscription/route parameter map (other example)
// if this is NEVER the case, it is possible to use a snapshot instead (if the user changes the url directly,
// the component is recreated)

ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.hero$ = this.service.getHero(id);
  }

// Asking for a required parameter id
  <a [routerLink]="['/hero', hero.id]">

// how to pass optional parameters (foo is for demonstration purposes)
  gotoHeroes(hero: Hero) {
    let heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

  //resulting url
  localhost:4200/heroes;id=15;foo=foo

//   optional parameters 
//   there is no need to change the original "heroes" path



// query parameters and fragments
// query parameters allow for optional parameters for all routes
// fragments refer to certain elements on the page indentified with an id attribute

checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
  
    this.authService.redirectUrl = url;
  
    let sessionId = 123456789;
  
    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },     //parameters
      fragment: 'anchor'                            // fragment used to navigate to a specific point on the page
    };
  
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
  
  // the parameters will remain after navigating to another route and the fragment makes it possible to
  // navigate to a specific point on the page
  // add to router.navigate()
  // access the values via using .. in the component navigated to
  this.route.queryParamsMap.pipe(map(params => params.get('session_id') || 'None'));
  this.route.fragment.pipe(map(fragment => fragment || 'None'))
  