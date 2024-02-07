import { ToolbarCoreButtonGroup } from '@/components/atoms';

import { ToolBarButtonGroupProps } from '../models';
import { ToolBarActionButton } from '../molecules';

export const ToolBarButtonGroup = ({
  toolBarButtons,
  editor,
}: ToolBarButtonGroupProps) => {
  return (
    <ToolbarCoreButtonGroup>
      {toolBarButtons.map((toolBarButton, index) => (
        <ToolBarActionButton key={index} editor={editor} {...toolBarButton} />
      ))}
    </ToolbarCoreButtonGroup>
  );
};
