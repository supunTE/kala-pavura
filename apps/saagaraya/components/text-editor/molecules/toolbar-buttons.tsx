import { ColorPicker, Group, HoverCard } from '@mantine/core';
import { Palette } from '@phosphor-icons/react';

import { ToolBarCoreButton } from '@/components/atoms';

import { ToolBarIconButtonProps } from '../models';

export const ToolBarIconButton = ({
  icon,
  iconText,
  onClick,
  action,
  editor,
  isActive: isIconButtonActive,
}: ToolBarIconButtonProps) => {
  let isActionActive = false;

  if (isIconButtonActive !== undefined) {
    isActionActive = isIconButtonActive;
  } else if (action && editor) {
    if (action.name)
      isActionActive = editor.isActive(action.name, action.attributes);
    else if (action.attributes)
      isActionActive = editor.isActive(action.attributes);
  }

  return (
    <ToolBarCoreButton
      onClick={onClick}
      icon={icon}
      iconText={iconText}
      isSelected={isActionActive}
    />
  );
};

type ColorPickerButtonProps = {
  onPick?: (value: string) => void;
};

export const ToolBarColorPickerButton = ({
  onPick,
}: ColorPickerButtonProps) => {
  return (
    <Group justify="center">
      <HoverCard
        shadow="md"
        styles={{
          dropdown: {
            borderRadius: '20px',
          },
        }}>
        <HoverCard.Target>
          <ToolBarCoreButton icon={Palette} />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <ColorPicker
            format="hex"
            size="xs"
            onChange={onPick}
            withPicker={false}
            swatches={[
              '#ffffff', // TODO: implement colors for light mode.
              '#868e96',
              '#fa5252',
              '#e64980',
              '#be4bdb',
              '#7950f2',
              '#4c6ef5',
              '#228be6',
              '#15aabf',
              '#12b886',
              '#40c057',
              '#82c91e',
              '#fab005',
              '#fd7e14',
            ]}
          />
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};
