import { createModel } from '@rematch/core';

import { RootModel } from '../store';

import { effects } from './effects';
import { uiInitialState } from './initial-state';
import * as reducers from './reducers';

export const UIStore = createModel<RootModel>()({
  state: uiInitialState,
  reducers,
  effects,
});
