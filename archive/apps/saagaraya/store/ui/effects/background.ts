import { Dispatch } from '../../store';

export type ToggleUIBackgroundDarknessPayload = {
  enableDarkOverlay: boolean;
};

export const toggleUIBackgroundDarkness = (
  dispatch: Dispatch,
  payload: ToggleUIBackgroundDarknessPayload,
) => {
  dispatch.ui.updateUIBackground({
    enableDarkOverlay: payload.enableDarkOverlay,
  });
};
