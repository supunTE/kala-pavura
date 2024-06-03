import { createModel } from '@rematch/core';

import { Dispatch, RootModel } from '../store';

import {
  toggleUIBackgroundDarkness,
  ToggleUIBackgroundDarknessPayload,
} from './effects/background';
import { uiInitialState } from './initial-state';
import * as reducers from './reducers';

export const UIStore = createModel<RootModel>()({
  state: uiInitialState,
  reducers,
  effects: (dispatch: Dispatch) => ({
    toggleUIBackgroundDarkness: (
      payload: ToggleUIBackgroundDarknessPayload,
    ) => {
      toggleUIBackgroundDarkness(dispatch, payload);
    },
  }),
});
