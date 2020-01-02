

// Use child routes to group related routes in one module

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

//child module
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HeroesRoutingModule //imports the child component route module
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
    ]
})

// when creating routing modules for child components, import these into the child components module only.
// These routes will be avaiable to app because the child components module will be imported here
// the child routes are to be placed ABOVE the main routes (that contain the wildcard), because of the first
// fit strategy


// child route configuration
// it is possible to have multiple <router-outlet> tags in one applicationCache. The components containing this have the
// following in common:
// they are the root of an area (AppComponent is the root of the entire application)
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
//the detail component will be reused as different crisis are selected. In contrast to what we saw in parameters.js ("Why subscribe?")