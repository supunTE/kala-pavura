import { UIStateModel } from '@/models/store/ui';
import { UIBackground } from '@/models/store/ui/background';

// TODO: Change to Update Background Reducer
export const updateUIBackground = (
  state: UIStateModel,
  payload: UIBackground,
): UIStateModel => {
  return {
    ...state,
    background: {
      ...state.background,
      ...payload,
    },
  };
};
