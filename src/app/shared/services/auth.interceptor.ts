import { HttpInterceptor, HttpHandler, HttpEvent } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

//Interceptors are basically a service so we can inject other services into it

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
        ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
        console.log('intercepted' , req);
        // http requests are immutable

        //clones can be edited
        // const copiedRequest = req.clone({headers: req.headers.set('','')});
        const copiedRequest = req.clone({
            params: req.params.set('auth', this.authService.getToken())
        });
        //now we let the request continue with a modified params
        return next.handle(copiedRequest);
    }


}