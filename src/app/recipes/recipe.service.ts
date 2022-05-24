import { Injectable } from "@angular/core";

import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";
import {BehaviorSubject} from 'rxjs'

@Injectable()
export class RecipeService {


  private recipes: Recipe[] = [
    new Recipe(
        'Fish', 
        'Fish & Veggies', 
        'https://c.pxhere.com/images/4d/d9/217e44fc0745a30e468d5e9a68c8-1438643.jpg!d',
        [
          new Ingredient('White Fish', 2),
          new Ingredient('Broccoli', 12)
        ]
    ),
    new Recipe(
      'Med Salad', 
      'A Tasty Salad', 
      'https://upload.wikimedia.org/wikipedia/commons/0/04/Salad.jpg',
      [
        new Ingredient('Spinach', 2),
        new Ingredient('Tomatos', 12)
      ]
    )
  ];

  // recipesChanged = new BehaviorSubject<Recipe[]>(this.recipes);
  // borrowerChangedObservable = this.recipesChanged.asObservable()

  
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  getObservable() {
    return this.recipesChanged.asObservable();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
    console.log('deleted this.recipes', this.recipes);
    
  }

  setFetchedRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  getRecipes() {
    return this.recipes.slice();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }
}