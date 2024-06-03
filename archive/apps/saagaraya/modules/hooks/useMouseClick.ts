'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type MouseClickHookParams = {
  considerClickableAreaAsInside?: boolean;
};

type MouseClickHookResult = {
  isOpened: boolean;
  /** Ref to the clickable area, which will trigger the event */
  clickableAreaRef: MutableRefObject<any>;
  /** Ref to the container, which will be used to check if the click was inside or outside of it */
  insideContainerRef?: MutableRefObject<any>;
  forceClose: () => void;
};

export function useMouseClickOpen({
  considerClickableAreaAsInside = false,
}: MouseClickHookParams = {}): MouseClickHookResult {
  const [isOpened, setOpened] = useState(false);
  const clickableAreaRef = useRef<any>(null);
  const insideContainerRef = useRef<any>(null);

  const handleOutsideClick = useCallback((event: Event) => {
    const isInsideContainer = insideContainerRef.current?.contains(
      event.target as any,
    );

    if (!isInsideContainer) {
      setOpened(false);
    }
  }, []);

  useEffect(() => {
    const onClickHandler = (event: Event) => {
      const isInsideClickableArea = clickableAreaRef.current?.contains(
        event.target as any,
      );

      if (isInsideClickableArea) {
        if (!considerClickableAreaAsInside) setOpened((prev) => !prev);
        else setOpened(true);
        return;
      }

      const isInsideContainer = insideContainerRef.current?.contains(
        event.target as any,
      );

      if (!isInsideContainer) setOpened(false);
    };

    document.addEventListener('click', onClickHandler);

    return () => {
      document.removeEventListener('click', onClickHandler);
    };
  }, [
    clickableAreaRef,
    insideContainerRef,
    handleOutsideClick,
    considerClickableAreaAsInside,
  ]);

  const forceClose = useCallback(() => {
    setOpened(false);
  }, []);

  return {
    isOpened,
    clickableAreaRef,
    insideContainerRef,
    forceClose,
  };
}
