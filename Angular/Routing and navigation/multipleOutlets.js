

// Display multiple router outlets within the same template
// It is only allowed to display one UNnamed outlet per template. A template can also have any number of named outlets that display
// content at the same time. Each outlet has its own set of routes with their own components
// having multiple outlets allows for one of them to remain unchanged while the target of the other outlet changes

<div [@routeAnimation]="getAnimationData(routerOutlet)">
  <router-outlet #routerOutlet="outlet"></router-outlet>
</div>
<router-outlet name="popup"></router-outlet>        //router named popup

// named routes are the targets of secondary routes. the difference from primary routes:
// - they are independent of eachother
// - they work in combination with other routes
// - they are displayed in named outlets

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