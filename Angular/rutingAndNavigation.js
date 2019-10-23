
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
    this.hero$ = this.route.paramMap.pipe(  //this.route.params.subscribe() is also an option
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))
    );
  }

//optionally 
//   this.route.params.subscribe(params => {
// 				let id = params['id'];        access the parameter

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

  https://angular.io/guide/router#clear-secondary-routes