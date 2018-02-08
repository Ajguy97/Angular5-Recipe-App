import { Component, OnInit} from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../../shared/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  

  constructor(
    public route: ActivatedRoute,
    public recipeService: RecipeService,
    public router: Router
  ) { }

  ngOnInit() {

    this.recipe = this.recipeService.getRecipe(+this.route.snapshot.params['id']);
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

}
