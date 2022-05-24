import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy, AfterViewInit {
  recipes: Recipe[]
  subscription: Subscription
  folder_id$: Observable<any>;

  
  constructor(private  recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
                this.folder_id$ = recipeService.getObservable();
                this.folder_id$.subscribe(( recipes: Recipe[] )=>{
                  console.log('se llama padre', recipes);
                  
                  this.recipes = recipes
                })
                this.recipes = this.recipeService.getRecipes()
              }

  ngOnInit(): void {
    // this.subscription = this.recipeService.recipesChanged
    // .subscribe(( recipes: Recipe[] )=>{
    //   console.log('se llama padre', recipes);
      
    //   this.recipes = recipes
    // })
    // this.recipes = this.recipeService.getRecipes()
  }

  ngAfterViewInit(): void {
    this.subscription = this.recipeService.recipesChanged
    .subscribe(( recipes: Recipe[] )=>{
      console.log('se llama padre', recipes);
      
      this.recipes = recipes
    })
    this.recipes = this.recipeService.getRecipes()
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
    this.recipeService.deleteRecipe(0)
    this.recipeService.setFetchedRecipes(this.recipes)
  }

  ngOnDestroy(): void {
    console.log('destroy');

    this.subscription.unsubscribe();
  }
 
}
