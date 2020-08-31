import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipesActions from './store/recipe.action';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // don't need to subscribe it, route resolver will call RecipesResolverService take care of it
    // if (recipes.length === 0) return this.dataStorageService.fetchRecipes();
    // this.store.select('recipes').pipe(map(recipeState => recipeState.recipes), switchMap(recipes +))
    this.store.dispatch(new RecipesActions.GetRecipes());
    return this.actions$.pipe(ofType(RecipesActions.SET_RECIPE), take(1));
  }
}
