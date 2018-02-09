
;
import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../ingredient.model';


export class ShoppingListService {
  updateList = new Subject<Ingredient[]>(); //SUBJECT for emitting data of time Ingredient
  editIngredient = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Orange', 10)
  ];

  setIngredients(i : Ingredient[]){
    this.ingredients = i;
    this.updateList.next(i);
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIndredient(index: number) {
    return this.ingredients[index];
  }


  addIngredient(temp: Ingredient) {
    this.ingredients.push(temp);

    // we need to update the list because we are giving a copy of a the ingredients
    this.updateList.next(this.ingredients.slice());

  }

  addIngredients(ingredients: Ingredient[]) {

    // we can loop through the ingredients array and then add 1 by 1 but 
    // faster if we use spread operator
    // turns an array into a list of elements then we can push to an arrya in 1 go

    this.ingredients.push(...ingredients);
    
    this.updateList.next(this.ingredients.slice());

  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    // this.deleteIngredient(index);
    // this.ingredients.splice(index,0,newIngredient);
    this.ingredients[index] = newIngredient;
    this.updateListFn();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.updateListFn();
  }

  updateListFn() {
    this.updateList.next(this.ingredients.slice());
  }

}