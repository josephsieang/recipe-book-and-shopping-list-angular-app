import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import * as RecipesActions from './recipe.action';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.GET_RECIPE),
    switchMap(() => {
      return this.httpClient.get<Recipe[]>(
        `https://ng-recipe-and-shopping-list.firebaseio.com/recipes.json`
      );
    }),
    map((recipes: Recipe[]) => {
      if (!recipes) return [];
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes: Recipe[]) => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect()
  saveRecipes = this.actions$.pipe(
    ofType(RecipesActions.SAVE_RECIPE),
    switchMap(() => {
      let r: Recipe[];
      this.store
        .select('recipes')
        .pipe(map((recipesState) => recipesState.recipes))
        .subscribe((recipes: Recipe[]) => (r = recipes));
      return this.httpClient.put<Recipe[]>(
        `https://ng-recipe-and-shopping-list.firebaseio.com/recipes.json`,
        r
      );
    }),
    map((recipes: Recipe[]) => {
      if (!recipes) return [];
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes: Recipe[]) => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );
}
