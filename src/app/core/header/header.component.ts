import { Component, EventEmitter, Output } from '@angular/core';
import { ServerService } from '../../shared/services/server.service';
import { Recipe } from '../../shared/recipe.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpEvent } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
   


    constructor(
        private serversService: ServerService,
        private authService: AuthService,
        private router: Router
    ) { }

    logout() {
        this.authService.logoutUser();

    }

    onSaveData() {
        this.serversService.storeRecipes()
            .subscribe(
            (error) => console.log(error)
            );

        this.serversService.storeIngredients().subscribe(
            (error) => console.log(error)
        );

        }

    onFetchData() {
        this.serversService.getRecipes();

        this.serversService.getIngredients();

    }
}