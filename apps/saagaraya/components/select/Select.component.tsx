import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CaretUpDown, Check } from '@phosphor-icons/react';
import cs from 'classnames';

export type SelectOption = {
  value: string;
  label: string;
  className?: string;
};

type SelectProps<T> = {
  data: SelectOption[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
};

export function Select<T>({
  data,
  selected,
  onChange,
  className,
}: SelectProps<T>) {
  const selectedOption = data.find((option) => option.value === selected);

  return (
    <Listbox value={selected} onChange={onChange}>
      <div className={cs('relative mt-1 w-full', className)}>
        <Listbox.Button
          className={cs(
            'relative w-full cursor-default rounded-full',
            'py-2 pl-4 pr-10 text-left',
            'border border-gray-300 dark:border-neutral-500',
            'focus:outline-none focus-visible:border-blue-400 focus-visible:ring-[0.0075rem] focus-visible:ring-blue-400',
            'bg-white sm:text-sm dark:bg-neutral-800',
          )}>
          {selectedOption && (
            <span
              className={cs(
                'block truncate text-black dark:text-neutral-300',
                selectedOption.className,
              )}>
              {selectedOption.label}
            </span>
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <CaretUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options
            className={cs(
              'z-2 absolute mt-3 max-h-60 w-full overflow-auto rounded-2xl',
              'py-1 text-base',
              'ring-1 ring-black/5 focus:outline-none',
              'bg-white dark:bg-neutral-700',
              'sm:text-sm',
            )}>
            {data.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? 'bg-gray-100 text-gray-900 dark:bg-neutral-600 dark:text-neutral-200'
                      : 'text-gray-900 dark:text-neutral-300'
                  }`
                }
                value={item.value}>
                {({ selected }) => (
                  <>
                    <span
                      className={cs(
                        'block truncate',
                        {
                          'font-medium': selected,
                          'font-normal': !selected,
                        },
                        item?.className,
                      )}>
                      {item.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 dark:text-neutral-200">
                        <Check className="h-5 w-5" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
