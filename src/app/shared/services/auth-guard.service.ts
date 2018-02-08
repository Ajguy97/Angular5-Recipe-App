import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

//basic auth guard
//we add this to path in chosen routing module
//ie. before a user can make a new recipe
//there is an AuthGuard on path: 'new'  , canActivate: [AuthGuard]
//this returns a boolean -> isAuthenticated returns true if there is a token

@Injectable()
export class AuthGuard implements CanActivate {

    constructor( private authService : AuthService ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.authService.isAuthenticated(); 
    }

}