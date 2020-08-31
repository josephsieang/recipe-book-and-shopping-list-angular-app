import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPE = '[Recipes] SET_RECIPE';
export const GET_RECIPE = '[Recipes] GET_RECIPE';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipes] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';
export const SAVE_RECIPE = '[Recipes] SAVE_RECIPE';

export type RecipesActions =
  | SetRecipes
  | GetRecipes
  | AddRecipes
  | UpdateRecipes
  | DeleteRecipes
  | SaveRecipes;

export class SetRecipes implements Action {
  readonly type = SET_RECIPE;

  constructor(public payload: Recipe[]) {}
}

export class GetRecipes implements Action {
  readonly type = GET_RECIPE;
}

export class AddRecipes implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipes implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipes implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class SaveRecipes implements Action {
  readonly type = SAVE_RECIPE;
}
