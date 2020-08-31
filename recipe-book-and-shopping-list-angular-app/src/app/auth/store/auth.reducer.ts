import { User } from '../user.model';
import * as AuthActions from './auth.action';

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initalState = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initalState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user: User = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return { ...state, user: user, authError: null, loading: false };
    case AuthActions.LOGOUT:
      return { ...state, user: null, authError: null, loading: false };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.AUTHENTICATE_FAILED:
      return {
        ...state,
        authError: action.payload,
        loading: false,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
