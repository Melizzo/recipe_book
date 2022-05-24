import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {


  constructor(private shoppingListService: ShoppingListService) { }
  // access the local form reference 'f' from HTML
  @ViewChild('f', {static: false}) slForm: NgForm
  // we want to destroy the editing if done so save it in property
  subscription: Subscription
  editMode = false;
  editedItemIndex: number
  editedItem: Ingredient

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number)=> {
        console.log(this.subscription);
        
        this.editedItemIndex = index;
        console.log('this.editedItemIndex', this.editedItemIndex);
        
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index)
        console.log('this.editedItem', this.editedItem);
        
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset()
  }

  onClearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClearForm();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
