import { createModel } from '@rematch/core';

import { Dispatch, RootModel } from '../store';

import {
  toggleUIBackgroundDarkness,
  UpdateDialogVisibilityPayload,
} from './effects/dialog-visibility';
import { uiInitialState } from './initial-state';
import * as reducers from './reducers';
import { UIStateModel } from '@/models/store/ui';
import { effects } from './effects';

export const UIStore = createModel<RootModel>()({
  state: uiInitialState,
  reducers,
  effects,
});
