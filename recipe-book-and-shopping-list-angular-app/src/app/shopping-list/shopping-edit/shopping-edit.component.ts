import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromApp from '../../store/app.reducer';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  slForm: FormGroup;
  editMode = false;
  editIngredient: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.slForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
    });

    this.store
      .select('shoppingList')
      .subscribe((stateData: fromShoppingList.ShoppingListState) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editIngredient = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editIngredient.name,
            amount: this.editIngredient.amount,
          });
        } else this.editMode = false;
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onAddIngredient(): void {
    const ingredient: Ingredient = new Ingredient(
      this.slForm.get('name').value,
      this.slForm.get('amount').value
    );
    if (this.editMode) {
      // this.shoppingListService.editIngredients(
      //   this.editIngredientIndex,
      //   ingredient
      // );
      console.log('ingredient in sec:', ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
      this.editMode = false;
    } else {
      // this.shoppingListService.addIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.slForm.reset();
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editIngredientIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
