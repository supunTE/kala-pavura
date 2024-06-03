/// <reference types="redux-persist" />

import { init, Models, RematchDispatch, RematchRootState } from '@rematch/core';
import persistPlugin from '@rematch/persist';
import storage from 'redux-persist/lib/storage';

import { UIStore } from './ui';

export interface RootModel extends Models<RootModel> {
  ui: typeof UIStore;
}

export const models: RootModel = { ui: UIStore };

const persistConfig = {
  key: 'root',
  storage,
};
export const store = init<RootModel>({
  models,
  plugins: [persistPlugin(persistConfig)],
});
export const dispatch = store.dispatch;

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
