import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.httpClient.put<Recipe[]>(
      `https://ng-recipe-and-shopping-list.firebaseio.com/recipes.json`,
      recipes
    );
  }

  fetchRecipes() {
    return this.httpClient
      .get<Recipe[]>(
        `https://ng-recipe-and-shopping-list.firebaseio.com/recipes.json`
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          // why we do not need to get recipe in route in the component?
          // because we set it here using service and get the recipe using service in the component
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
