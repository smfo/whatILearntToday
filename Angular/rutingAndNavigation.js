
import { RouterModule, Routes } from '@angular/router';

// The angular router interprets the browser url as an instruction to navigate to a client-generated view.
// Parameters can be passed along to the view component, that help decide what specific content to present.
// The router has no default values, all values has to be set by the programmer

const appRoutes: Routes = [
    { path: 'crisis-center',
      component: CrisisListComponent },
    { path: 'hero/:id',             //path with route parameter
      component: HeroDetailComponent },
    {
      path: 'heroes',
      component: HeroListComponent,
      data: { title: 'Heroes List' } //stores static data associated with the route
    },
    { path: '',
      redirectTo: '/heroes',
      pathMatch: 'full'
    },
    { path: '**',           //wildcard, path does not match any of the above
      component: PageNotFoundComponent }
  ];

//   import the module to the component and add the routes Array
  
  @NgModule({
    imports: [
      RouterModule.forRoot(   //RouterModules.forChild is used if the component setting the paths is not the root
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only

// The order of the paths matters! First match wins strategy. Place routes from most to least specific

// Enable tracing: allows for seeing which events are happening during the navigation lifecycle. This outputs
// each router event taking place during each navigation lifecycle to the console. This is set in the imports

//a routerLink="path" directive can be added to a html tag to give the router control over the element
<a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
//takes the user to the /crisis-center path if clicked
altenrativly

<button (click)="gotoHeroes()">Back</button>

gotoHeroes() {
    this.router.navigate(['/heroes']);
  }

ng generate module my-module --routing
// this command generates a routing file for the application and imports @angular/router
// this is used to cinfigure the routes in its own component instead of in app.modules.ts

//child component route module
@NgModule({
    imports: [
      RouterModule.forChild(heroesRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class HeroesRoutingModule { }

//child component
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HeroesRoutingModule
    ],
    declarations: [
      HeroListComponent,
      HeroDetailComponent
    ]
  })
  export class HeroesModule {}

  //app.module
  @NgModule({
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HeroesModule,             //child component and routes
      AuthModule,
      AppRoutingModule          //other routes

// when creating routing modules for child components, import these into the child components module only.
// These routes will be avaiable to app because the child components module will be imported here
// the child routes are to be placed ABOVE the main routes (that contain the wildcard), because of the first
// fit strategy

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
 				let id = params['id'];        access the parameter

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
//   there is no need to change the origional "heroes" path

// child route configuration
// it is possible to have multiple <router-outlet> tags in one applicationCache. The components containing this have the
// following in common:
// they are the root if a area (AppComponent is the root of the entire application)
// they are a shell for this area

// child routes
const crisisCenterRoutes: Routes = [
    {
      path: 'crisis-center',
      component: CrisisCenterComponent,         //center
      children: [
        {
          path: '',
          component: CrisisListComponent,       //list
          children: [
            {
              path: ':id',
              component: CrisisDetailComponent  //detail
            },
            {
              path: '',
              component: CrisisCenterHomeComponent //center home
            }
          ]
        }
      ]
    }
  ];

//these will be displayed in the RouterOutlet of the CrisisCenterComponent, not in the AppComponent shell
//crisis detail component is a child of the crisis list component. Because of this, you never really degenerate the list
//the detail component will be reused as different crisis are selected. In contrast to what we saw before ("Why subscribe?")

//Relative navigation
// calculate the new path based on the active route's location

// Relative navigation back to the crises
this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
//gives the resulting path
/crisis-center/;id=3;foo=foo

// ../ goes up one folder, while ./ stays in the same folder

//Display multiple router outlets within the same template
// It is only allowed to display one UNnamed outlet per template. A template can also have any number of named outlets that display
// contant at the same time. Each outlet has its own set of routes with their own components
// having multiple outlets allows for one of them to remain unchanged while the target of the other outlet changes

<div [@routeAnimation]="getAnimationData(routerOutlet)">
  <router-outlet #routerOutlet="outlet"></router-outlet>
</div>
<router-outlet name="popup"></router-outlet>        //router named popup

named routes are the targets of secondary routes. the difference from primary routes:
they are independent of eachother
they work in combination with other routes
they are displayed in named outlets

//how to target the names outlet (from the app-routing.module Routes array)
{
    path: 'compose',
    component: ComposeMessageComponent,
    outlet: 'popup'                         //target this popup
  },

//target from html
<a [routerLink]="[{ outlets: { popup: ['compose'] } }]">Contact</a>
//primary outlet target
<a [routerLink]="['/hero', hero.id]">

// the url for the crisis-component while the componseMessage component is selected to display in the popup outlet
http://.../crisis-center(popup:compose)
// if we instead navigate the primary outlet to heroes, we get this
http://.../heroes(popup:compose)

// Clear a secondary outlet by navigating to it with a null
closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null }}]);
  }

// Route guards:
// a route guard's return value controls the router's behavior
// these are used to restrict the navigation of user who are not authorized to reach all urls
//  - true: navigation continues
//  - false: the nagivation process stops and the user stays put 
//  - UrlTree: the current navigation is canceled and a new navigation is initiated to the UrlTree returned
// the observable provided to the Router MUST complete or else the navigation will not continue 

// canActivate: block or limit access until the user's account is activated. access only permited to authenticated users
// or users with a certain role

ng generate guard auth/auth  //genereates an AuthGuard in the auth folder

//authGuard
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
    return true;
  }
}

// in routing module
const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],       //admin is now protected by this guard
    children: [
      {
        path: '',
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ],
      }
    ]
  }
];

// service that determines if the user is logged in or not
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}


//updated guard
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,         //contains the future route that will be activated if you pass the guard
    state: RouterStateSnapshot): boolean {    //contains the future RouterState if you pass the guard
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {                      //using the authService to clarify is the user is logged in or not
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}


// canActivateChild: guarding child routes. runs before any child routes are activated

// add method to the updated guard seen above
canActivateChild(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
  return this.canActivate(route, state);
}

// updated routing module
const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard], // all the children are now protected
        children: [
          { path: 'crises', component: ManageCrisesComponent },
          { path: 'heroes', component: ManageHeroesComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}

// canDeactivate: deactivates navigation, for example while waiting for a server reply

export class DialogService {
  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns observable resolving to `true`=confirm or `false`=cancel
   */
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');

    return of(confirmation);
  };
}
// window.confirm is a blocking ActivatedRouteSnapshot, that displays a modal dialog and waits for user interaction

ng generate guard can-deactivate
// the guard detects if any component has a canDeactivate() method and calls this, this makes it reusable

import { Injectable }    from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs';

export interface CanComponentDeactivate {
 canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;   // does the checked component have a canDeactivate method?
  }
}

//The canDeactivate method in the crisis-detail component
canDeactivate(): Observable<boolean> | boolean {
  // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
  if (!this.crisis || this.crisis.name === this.editName) {
    return true;
  }
  // Otherwise ask the user with the dialog service and return its
  // observable which resolves to true or false when the user decides
  return this.dialogService.confirm('Discard changes?');
}


// if it is only desierable to use the guard for one component it can be made component-specific
export class CanDeactivateGuard implements CanDeactivate<CrisisDetailComponent> {

  canDeactivate(
    component: CrisisDetailComponent,   //the specified component
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {  // implement method specific for this component
    // Get the Crisis Center ID
    console.log(route.paramMap.get('id'));

    // Get the current URL
    console.log(state.url);

    if (!component.crisis || component.crisis.name === component.editName) {
      return true;
    }
    return component.dialogService.confirm('Discard changes?');
  }
}

// the guard is added to the desiered coponent(s) like so

const crisisCenterRoutes: Routes = [
  {
    path: 'crisis-center',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],   //can deactivate guard
            resolve: {
              crisis: CrisisDetailResolverService // resolver, next paragraf
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];


// resolve: delays rendering of the routed component (while waiting for server/database response), until
// all necessary data has been fetched. This prevents the app from routing to the component just to later 
// redirect the user is they are not authorized

// the resolver service for the crisis detail component
export class CrisisDetailResolverService implements Resolve<Crisis> {
  constructor(private cs: CrisisService, private router: Router) {}

  //the reply is returned as an observable to prevent the route from loading until the data is fetched
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> | Observable<never> {
    let id = route.paramMap.get('id');

    return this.cs.getCrisis(id).pipe(
      take(1),
      mergeMap(crisis => {
        if (crisis) {
          return of(crisis);          //if crisis is found, return this
        } else { // id not found
          this.router.navigate(['/crisis-center']); //if not, navigate back to the crisis-center
          return EMPTY;
        }
      })
    );
  }
}

//see the previous routing example for implementation here


// get the crisis in the component
// the retrived crisis is now in the ActivatedRoute.data.crisis and can be acessed with this.route.data.crisis
ngOnInit() {
  this.route.data
    .subscribe((data: { crisis: Crisis }) => {
      this.editName = data.crisis.name;
      this.crisis = data.crisis;
    });
}


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




  https://angular.io/guide/router#clear-secondary-routes