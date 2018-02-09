import { Component, OnInit, OnDestroy} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../shared/services/recipe.service';
import { ServerService } from '../../shared/services/server.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //variable to store subscription -> so we can unsubscribe onDestroy of component
  //subscriptions are stored on memory -> memory leaks if not unsubscribed
  subscription : Subscription;
  
  //Array of recipes to loop through 
  recipes: Recipe[];
  

  constructor(private recipeService: RecipeService
       ) { }

  //Good practice to initialize anything in here rather than constructor
  ngOnInit() {

    

    this.recipes = this.recipeService.getRecipes();

    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }

      );
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }


}
