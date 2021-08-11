import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromBook from '../book/state/book.reducer';


export interface AppState {

  [fromBook.booksFeatureKey]: fromBook.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromBook.booksFeatureKey]: fromBook.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
