import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { ShoppingListService } from '../../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false; // true if the item we have is in the ingredients list
  editedItemIndex: number;
  editedItem: Ingredient;


  // this is entirely template driven approach
  // new recipe is reactive
  //get the form reference
  @ViewChild('f') slForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.editIngredient.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIndredient(index);
        this.setInput(this.editedItem.name, this.editedItem.amount);
      }
    );
  }

  deleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.slForm.reset();
    this.editMode = false;
  }

  addItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    this.slForm.reset();
  }


  clearInput() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setInput(name: string, amount: number) {
    this.slForm.setValue({
      name: name,
      amount: amount
    });
  }

}
