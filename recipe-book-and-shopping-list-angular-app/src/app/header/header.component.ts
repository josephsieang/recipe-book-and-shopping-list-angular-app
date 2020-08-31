import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/store/auth.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as RecipeActions from '../recipes/store/recipe.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .subscribe((authState: AuthState) => {
        this.isAuthenticated = !authState.user ? false : true;
      });
  }

  onSave() {
    // this.dataStorageService.storeRecipes().subscribe();
    this.store.dispatch(new RecipeActions.SaveRecipes());
  }

  onFetch() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.GetRecipes());
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
