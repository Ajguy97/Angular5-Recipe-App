import { Injectable } from "@angular/core";
import { HttpClient,HttpParams, HttpRequest } from "@angular/common/http";
import { RecipeService } from "./recipe.service";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { Recipe } from "../recipe.model";
import { AuthService } from "./auth.service";
import { ShoppingListService } from "./shopping-list.service";



@Injectable()
export class ServerService {
    
    hasGottenRecipes: boolean  = false;
    hasGottenIngredients: boolean  = false;
    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService,
        private slService: ShoppingListService
    ) { }

    /*
    storeRecipes() {
        const token = this.authService.getToken();

        return this.httpClient.put('https://recipe-app-d34fb.firebaseio.com/recipes.json',
            this.recipeService.getRecipes()
            // , {
            //     observe: 'events'
            // } 
            // incase you want to do something while
            // the HttpRequest of type sent response download etc are still in progress
            // default is body
            ,{
                observe: 'body',
                params: new HttpParams().set('auth', token) //cleaner version instead of adding "?auth="" at url
                //if u have more add .append()
            }
        );
    }*/

    //alternative HttpRequest

    storeRecipes() {
        //first we create the request
        const req = new HttpRequest('PUT', 'https://recipe-app-d34fb.firebaseio.com/recipes.json',
        this.recipeService.getRecipes(),
            {
               reportProgress: true,
            })
        //then we send it
        return this.httpClient.request(req);
    }

    storeIngredients() {
        //first we create the request
        const req = new HttpRequest('PUT', 'https://recipe-app-d34fb.firebaseio.com/ingredients.json',
        this.slService.getIngredients(),
            {
               reportProgress: true,
            })
        //then we send it
        return this.httpClient.request(req);
    }

    getRecipes() {
        if(!this.hasGottenRecipes){
      this.httpClient.get<Recipe[]>('https://recipe-app-d34fb.firebaseio.com/recipes.json',
            //third parameter
            {
                //can have headers
                // observe: 'response',// full response
                observe: 'body', // just the body
                responseType: 'json',  // text, blob, array
            })
            .map(
            (recipes) => {
                for (let recipe of recipes) {
                    //if the recipe has np ingredients
                    // => we have to create an empty ingredient array property => stop errors
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                    return recipes;
                }
            }
            ////////////////////////////////// Alternative 
            // (response) => {
            //     const recipes : Recipe[] = <Recipe[]>response;
            //     for(let recipe of recipes){
            //     if (!recipe['ingredients']) {
            //                     recipe['ingredients'] = [];
            //                 }
            //             }
            //                 return recipes;
            //             }

            )//we can subscribe to this observable map returns
            .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
            );
    }
    this.hasGottenRecipes = true;
}

getIngredients() {
    if(!this.hasGottenIngredients){
  this.httpClient.get<Recipe[]>('https://recipe-app-d34fb.firebaseio.com/ingredients.json',
        //third parameter
        {
            //can have headers
            // observe: 'response',// full response
            observe: 'body', // just the body
            responseType: 'json',  // text, blob, array
        })
        .map(
        (ingredients) => {
           
                return ingredients;
            }
        }
    )
        .subscribe(
        (recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
        }
        );
}
this.hasGottenIngredients = true;
}


}