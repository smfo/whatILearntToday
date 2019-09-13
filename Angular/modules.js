
// Make a "library" of similar components that can be imported to other components
// in the project

//Basic setup with one import, MatRadioModule and two components

import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material';
import { ApplicationRoleComponent } from '@app/application-role/application-role.component';
import { ApplicationNameComponent } from '@app/application-role/application-name.component';

@NgModule({
	imports: [MatRadioModule],
	declarations: [ApplicationRoleComponent, ApplicationNameComponent],
    providers: [],
    exports: [ApplicationRoleComponent]
})
export class ApplicationRoleModule {}

//Declarations: all custom components belonging to this module, services in providers

//NB: the root module of the project, typically app.module.ts will need to import
import { BrowserModule } from '@angular/platform-browser';


//To create singletons of the services export a forRoot object
//This makes sure we don't have multiple instances of the same service

import { NgModule, ModuleWithProviders } from '@angular/core';
/* ...other imports... */

@NgModule({
  imports: [CommonModule],
  declarations: [
    CreditCardMaskPipe,
    CreditCardComponent
  ],
  exports: [CreditCardComponent]
})
export class CreditCardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CreditCardModule,
      providers: [CreditCardService]
    }
  }
}

//And import in app.module.ts like this
@NgModule({
    imports: [
      BrowserModule,
      CreditCardModule.forRoot()
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
  })
  export class AppModule { }