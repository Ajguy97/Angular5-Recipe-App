import { Injectable } from "@angular/core";
import { Recipe } from "../recipe.model";
import { Subject } from "rxjs/Subject";
import { ShoppingListService } from "./shopping-list.service";
import { Ingredient } from "../ingredient.model";



@Injectable()
export class RecipeService {
      recipesChanged = new Subject<Recipe[]>();


      constructor(
            private slService: ShoppingListService
      ) { }


      private recipes: Recipe[] = [
            new Recipe('Grilled Chicken', 'Grilled Chicken is nice :).',
                  'https://static01.nyt.com/images/2015/08/14/dining/14ROASTEDSALMON/14ROASTEDSALMON-articleLarge.jpg'
                  , [
                        new Ingredient("Chicken", 1),
                        new Ingredient("Garlic", 1),
                        new Ingredient("Olive oil", 1)
                  ]),
            new Recipe('Burger', "Burgers are nice but they're bad for you :(",
                  'https://commentform.marketforce.com/images/BK-WebComment/BB_WHOPPER-v1.png'
                  , [
                        new Ingredient("Buns", 1),
                        new Ingredient("Beef Burger", 4),
                        new Ingredient("Vegetables and Sauces", 1)
                  ])
      ];

      //.slice() will return a copy of the recipes
      getRecipes() {
            return this.recipes.slice();
      }

      getRecipe(id: number): Recipe {
            return this.recipes[id];
      }

      addIngredientsToShoppingList(ingredientArray: Ingredient[]) {
            this.slService.addIngredients(ingredientArray);
      }

      addRecipe(recipe: Recipe) {
            this.recipes.push(recipe);
            this.resetRecipes();
      }

      updateRecipe(index: number, recipe: Recipe) {
            this.recipes[index] = recipe;
            this.resetRecipes();
      }
      //function to emit a new array of recipes to whoever is listening
      resetRecipes() {
            this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
            this.recipes.splice(index, 1);
            this.resetRecipes();
      }

      updateRecipeList(recipes: Recipe[]) {
            this.recipes = recipes;
            this.resetRecipes();
      }

      setRecipes(recipes : Recipe[]){
            this.recipes = recipes;
            this.resetRecipes();
      }

}