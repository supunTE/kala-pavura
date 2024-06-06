"use client";

import { useAuth } from "@/modules/context";

import { OwnerControls } from "./OwnerControls";
import { ViewerControls } from "./ViewerControls";


type ControlsProps = {
  id: string;
}

export function Controls(
  { id }: ControlsProps
) {
  const { user } = useAuth();
  if (!user) return null;

  if (user.uid === id) {
    return <OwnerControls
      id={id}
    />;
  } else {
    return <ViewerControls />;
  }
}