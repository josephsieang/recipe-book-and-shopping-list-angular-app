import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddItemToSL(): void {
    this.recipeService.addItemToSL(this.recipe.ingredients);
  }

  onEditRecipe(): void {
    // demo purpose
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
