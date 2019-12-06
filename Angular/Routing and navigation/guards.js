


// Route guards (authorization):
// a route guard's return value, controls the router's behavior
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
// redirect the user if they are not authorized

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