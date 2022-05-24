import { Component } from "@angular/core";

import { DataStorageService } from "../shared/data-storage.service";

import { OnInit } from "@angular/core";
import { Recipe } from "../../../src/app/recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { RecipeService } from "../recipes/recipe.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{

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
  
  constructor(private dataStorage: DataStorageService, 
    private recipeService: RecipeService){}

  ngOnInit(): void {
    console.log('hola :)')
  }

  randomFunction(){
    this.recipeService.setFetchedRecipes(this.recipes);
  }

  onFetchData() {
    this.dataStorage.fetchRecipes()

  }
  
  onSaveData(){
    this.dataStorage.storeRecipes()
  }
}