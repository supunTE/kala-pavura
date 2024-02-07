import { forwardRef } from 'react';
import { Icon } from '@phosphor-icons/react';
import cs from 'classnames';

export type ToolBarCoreButtonProps = {
  icon: Icon;
  onClick?: (() => void) | undefined;
  isSelected?: boolean;
  className?: string;
};

export const ToolBarCoreButton = forwardRef<
  HTMLDivElement,
  ToolBarCoreButtonProps
>((props: ToolBarCoreButtonProps, ref) => {
  // HoverCard.Target will inject few other props to the element
  const { icon, onClick, isSelected, className, ...rest } = props;
  const Icon = icon;

  return (
    <div
      ref={ref}
      onClick={onClick || (() => {})}
      className={cs(
        'p-2 rounded-full hover:bg-white hover:text-neutral-900',
        'transition-colors duration-200',
        'flex items-center justify-center',
        {
          'bg-gray-100/20': isSelected,
        },
        className,
      )}
      {...rest}>
      {<Icon size={16} />}
    </div>
  );
});

ToolBarCoreButton.displayName = 'ToolBarCoreButton';
