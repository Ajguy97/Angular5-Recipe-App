import { Component, OnInit} from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../../shared/services/recipe.service';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  recipe: Recipe;
  

  constructor(
    public route: ActivatedRoute,
    public recipeService: RecipeService,
    public router: Router
  ) { }

  ngOnInit() {
    //we get the recipe that the user selected by getting the index from the params
    //parameters are string -> we need to convert it into an integer
    //   " + " does this -> can also use Numner(this.route.snapshot.params['id']);
    this.recipe = this.recipeService.getRecipe(+this.route.snapshot.params['id']);

    //standard subscribiption -> incase the parameter changes -> component wont be loaded again
    //need to keep listening for changes
    this.route.params.subscribe(
      (params: Params ) => {
        this.recipe = this.recipeService.getRecipe(+params['id']);
      }
    );
  }


  addToList(ingredientArray: Ingredient[]) {
  this.recipeService.addIngredientsToShoppingList(ingredientArray);
  }

  onDelete(){
    this.recipeService.deleteRecipe(+this.route.params['id']);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy(){
    if(this.paramsSubscription){
      this.paramsSubscription.unsubscribe();
    }
  }

}
