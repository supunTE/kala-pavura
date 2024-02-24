import { forwardRef } from 'react';
import { Icon } from '@phosphor-icons/react';
import cs from 'classnames';

export type ToolBarCoreButtonProps = {
  icon?: Icon;
  iconText?: string;
  onClick?: (() => void) | undefined;
  isSelected?: boolean;
  className?: string;
};

export const ToolBarCoreButton = forwardRef<
  HTMLDivElement,
  ToolBarCoreButtonProps
>((props: ToolBarCoreButtonProps, ref) => {
  // HoverCard.Target will inject few other props to the element
  const { icon, onClick, isSelected, className, iconText, ...rest } = props;
  const Icon = icon;

  return (
    <div
      ref={ref}
      onClick={onClick || (() => {})}
      className={cs(
        'rounded-full p-2 hover:bg-white hover:text-neutral-900',
        'transition-colors duration-200',
        'flex cursor-pointer items-center justify-center',
        {
          'bg-gray-100/20': isSelected,
        },
        className,
      )}
      {...rest}>
      {Icon && <Icon size={16} />}
      {iconText && (
        <div className="flex items-center justify-center gap-2 text-xs">
          <span>{iconText}</span>
        </div>
      )}
    </div>
  );
});

ToolBarCoreButton.displayName = 'ToolBarCoreButton';
