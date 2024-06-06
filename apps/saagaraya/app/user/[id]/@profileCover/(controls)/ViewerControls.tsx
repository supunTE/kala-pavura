"use client";

import { Button } from "@mantine/core";
import { PaperPlaneTilt, UserPlus } from "@phosphor-icons/react";

export function ViewerControls() {
  return (
    <div className="mt-2 flex gap-2">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="filled"
          size="xs"
          radius="xl"
          leftSection={<UserPlus size={20} />}
          rightSection={
            <span
              className="text-curious-blue-800 flex h-full w-12 items-center justify-center rounded-full bg-blue-100/40 text-sm">
              156
            </span>
          }>
          එක් කරගන්න
        </Button>
      </div>
      <Button
        variant="filled"
        size="xs"
        radius="xl"
        leftSection={<PaperPlaneTilt size={20} />}>
        පණිවිඩ
      </Button>
    </div>
  );
}