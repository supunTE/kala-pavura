import { ReactNode } from 'react';
import cs from 'classnames';

export type ToolBarCoreButtonGroupProps = {
  children: ReactNode | ReactNode[];
};

export const ToolbarCoreButtonGroup = ({
  children,
}: ToolBarCoreButtonGroupProps) => {
  return (
    <span
      className={cs(
        'inline-flex gap-2 p-2',
        'border border-gray-200/20',
        'rounded-full',
      )}>
      {children}
    </span>
  );
};
