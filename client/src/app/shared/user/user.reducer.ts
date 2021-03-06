import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthActionTypes, authSuccess } from './auth.action';
import { User } from './user';
import { UserActions, login, loginSuccess, loginFailure } from './user.action';

export interface UserState {
  user: User | null;
  error: any | null;
}

const userFeature = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(userFeature, state => (state ? state.user : null));
export const loginError = createSelector(userFeature, state => (state && state.error ? state.error.message : null));

export function userReducer(state: UserState, action: UserActions | AuthActionTypes): UserState {
  switch (action.type) {
    case login.type:
      return { user: null, error: null };
    case authSuccess.type:
      return { ...state, user: action.payload.user };
    case loginSuccess.type:
      return { ...state, user: action.payload.user };
    case loginFailure.type:
      return { user: null, error: action.payload.error };
    default:
      return state;
  }
}
