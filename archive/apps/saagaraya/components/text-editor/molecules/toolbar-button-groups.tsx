import { ToolbarCoreButtonGroup } from '@/components/atoms';

import { ToolBarButtonGroupProps } from '../models';
import { ToolBarIconButton } from '../molecules';

export const ToolBarButtonGroup = ({
  toolBarButtons,
  editor,
}: ToolBarButtonGroupProps) => {
  return (
    <ToolbarCoreButtonGroup>
      {toolBarButtons.map((toolBarButton, index) => (
        <ToolBarIconButton key={index} editor={editor} {...toolBarButton} />
      ))}
    </ToolbarCoreButtonGroup>
  );
};
