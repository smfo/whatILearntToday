


//a routerLink="path" directive can be added to a html tag to give the router control over the element
<a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>

// this takes the user to the /crisis-center path if clicked
// altenativly

<button (click)="gotoHeroes()">Back</button>

gotoHeroes() {
    this.router.navigate(['/heroes']);
  }