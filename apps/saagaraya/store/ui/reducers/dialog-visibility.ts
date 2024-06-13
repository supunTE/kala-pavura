import { UIStateModel } from '@/models/store/ui';

export type UpdateDialogVisibilityPayload = {
  key: string;
  visible: boolean;
};

export const updateDialogVisibilityReducer = (
  state: UIStateModel,
  payload: UpdateDialogVisibilityPayload,
): UIStateModel => {
  return {
    ...state,
    dialogVisibility: {
      ...state.dialogVisibility,
      [payload.key]: payload.visible,
    },
  };
};
