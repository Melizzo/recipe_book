import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, 
              private recipeService: RecipeService){}

  // We are injecting the recipes Service into this service to be able to see currently loaded recipes. 
  // .json is specific to Firebase
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-angular-recipe-book-9cb50-default-rtdb.firebaseio.com/recipes.json', recipes)
    .subscribe(response => {
      console.log('putRecipes', response);
      
    });
    // need to subscribe to send the request. 
  }

  fetchRecipes() {
    this.http.get<Recipe[]>('https://ng-angular-recipe-book-9cb50-default-rtdb.firebaseio.com/recipes.json')
    .subscribe(recipes => {

      console.log('llama?', recipes)
      this.recipeService.setFetchedRecipes(recipes);
    })
  }
}