
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

ng generate module my-module --routing
// this command generates a routing file for the application and imports @angular/router
// this is used to configure the routes in its own component instead of in app.modules.ts



  // get the crisis in the component
  // the retrived crisis is now in the ActivatedRoute.data.crisis and can be acessed with this.route.data.crisis
  ngOnInit() {
    this.route.data
      .subscribe((data: { crisis: Crisis }) => {
        this.editName = data.crisis.name;
        this.crisis = data.crisis;
      });
  }

  https://angular.io/guide/router#clear-secondary-routes