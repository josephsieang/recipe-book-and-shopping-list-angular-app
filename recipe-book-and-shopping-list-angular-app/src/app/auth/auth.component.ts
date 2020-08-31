import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  authenticationForm: FormGroup;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: true })
  alertHost: PlaceholderDirective;
  closeSub: Subscription;
  storeSub: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.initAuthenticationForm();
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) this.showErrorAlert(this.error);
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  private initAuthenticationForm() {
    this.authenticationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (!this.authenticationForm.valid) return;

    const email = this.authenticationForm.value.email;
    const password = this.authenticationForm.value.password;
    // let auth$: Observable<AuthResponse>;

    this.isLoading = true;
    this.store.dispatch(new AuthActions.ClearError());
    if (this.isLoginMode) {
      // auth$ = this.authService.login(email, password);
      // console.log('login start');
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
      // console.log('login end');
    } else {
      // auth$ = this.authService.signUp(email, password);
      this.store.dispatch(
        new AuthActions.SignUpStart({ email: email, password: password })
      );
    }

    this.store.select('auth').subscribe((authState) => {});

    // auth$.subscribe(
    //   (resData: AuthResponse) => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     this.error = errorMessage;
    //     this.showErrorAlert(errorMessage);
    //     this.isLoading = false;
    //   }
    // );

    this.authenticationForm.reset();
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent<AlertComponent>(
      alertCmpFactory
    );
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
      this.store.dispatch(new AuthActions.ClearError());
      this.closeSub.unsubscribe();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) this.closeSub.unsubscribe();
    if (this.storeSub) this.storeSub.unsubscribe();
  }
}
