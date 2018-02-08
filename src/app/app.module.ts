import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";

import { RecipesModule } from "./recipes/recipes.module";
import { SharedModule } from "./shared/shared.module";
import { ShoppingListModule } from "./shopping-list/shopping-list.module";
import { AuthModule } from "./auth/auth.module";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  declarations: [
    AppComponent,
  ],
  //put all the imports that app component html uses
  imports: [
    //always have this
    BrowserModule,
    //header uses this
    AppRoutingModule,
    //need this for HttpClient
    HttpClientModule,
    // this is for the dropdown directive => can't declare directive twice.
    SharedModule, 
    //import feature model - Shopping list
    ShoppingListModule,
    
    AuthModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
