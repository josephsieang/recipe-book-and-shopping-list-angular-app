import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  slForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  editIngredientIndex: number;
  editIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.slForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]),
    });

    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIngredientIndex = index;
        this.editIngredient = this.shoppingListService.getIngredients()[index];
        this.slForm.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount,
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddIngredient(): void {
    const ingredient: Ingredient = new Ingredient(
      this.slForm.get('name').value,
      this.slForm.get('amount').value
    );
    if (this.editMode) {
      this.shoppingListService.editIngredients(
        this.editIngredientIndex,
        ingredient
      );
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.slForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editIngredientIndex);
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
  }
}
