import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private mySubscription: Subscription;


  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.mySubscription = this.shoppingListService.updateList.subscribe( //anonymous function syntax ECMA6
      (temp: Ingredient[]) => {

        this.ingredients = temp;
      }
    );
  }
  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

  onEditItem(index: number): void {
    this.shoppingListService.editIngredient.next(index);
  }


}
