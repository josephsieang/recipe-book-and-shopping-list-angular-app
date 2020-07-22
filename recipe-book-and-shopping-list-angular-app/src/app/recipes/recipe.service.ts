import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://thumbs.dreamstime.com/b/tasty-schnitzel-boiled-potato-top-view-flat-lay-food-150762671.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://images.squarespace-cdn.com/content/v1/5dc06b43e6229c77b655f005/1580236069855-JSTABHMHONPQ804LBT5L/ke17ZwdGBToddI8pDm48kKCabKVeKR_XW1u-Z7ZRqKx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USUDRyFcsPft0tso21cMMJQ3SSGCluuQbAP9I952fHRA2xBYZqvX3lv7h_sLFX56JA/DSC04369.jpg?format=2500w',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 3)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addItemToSL(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number): Recipe {
    return this.recipes.slice()[index];
  }
}
