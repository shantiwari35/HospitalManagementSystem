import { createReducer, on } from '@ngrx/store';
import { changeViewType, getViewType } from '../Action/viewAction.action';

interface IViewState {
  viewType: string;
}

const initialState: IViewState = {
  viewType: 'list',
};

export const viewReducer = createReducer(
  initialState,
  on(changeViewType, (state) => ({
    ...state,
    viewType: state.viewType == 'list' ? 'card' : 'list',
  })),
);
