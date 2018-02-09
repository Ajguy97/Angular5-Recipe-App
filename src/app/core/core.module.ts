import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { ShoppingListService } from "../shared/services/shopping-list.service";
import { RecipeService } from "../shared/services/recipe.service";
import { ServerService } from "../shared/services/server.service";
import { AuthService } from "../shared/services/auth.service";
import { AuthGuard } from "../shared/services/auth-guard.service";
import { AuthInterceptor } from "../shared/services/auth.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoggingInterceptor } from "../shared/services/logging.interceptor";
import { FooterComponent } from './footer/footer.component';



//good practice to provide all services in a core module 
//then importing this core module to app module
//makes app module cleaner


@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        FooterComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule //importing this because header needs this
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent, // exporting this because app component uses header
        FooterComponent
    ],
    providers : [
        ShoppingListService,
        RecipeService,
        ServerService, 
        AuthService,
        AuthGuard,
        //handles http requests and changes them
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi : true },
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi : true }
    ]
})

export class CoreModule {

}