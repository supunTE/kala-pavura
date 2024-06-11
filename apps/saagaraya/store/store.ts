/// <reference types="redux-persist" />

import { init, Models, RematchDispatch, RematchRootState } from '@rematch/core';

import { UIStore } from './ui';

export interface RootModel extends Models<RootModel> {
  ui: typeof UIStore;
}

export const models: RootModel = { ui: UIStore };

export const store = init<RootModel>({
  models,
});
export const dispatch = store.dispatch;

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
