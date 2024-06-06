"use client";

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Books, GearSix } from "@phosphor-icons/react";

import { CreateBookPanel } from "../(panels)/CreateBook.panel";

type OwnerControlsProps = {
  id: string;
}

export function OwnerControls(
  { id }: OwnerControlsProps
) {
  const [createBookOpened, { open: openCreateBook, close: closeCreateBook }] = useDisclosure(false);

  return (
    <div className="mt-2 flex gap-2">
      <CreateBookPanel opened={createBookOpened} close={closeCreateBook} />
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="filled"
          size="sm"
          radius="xl"
          onClick={openCreateBook}
          leftSection={<Books size={20} />}
          rightSection={
            <span
              className="text-curious-blue-800 flex h-full w-12 items-center justify-center rounded-full bg-blue-100/40 text-sm">
              4
            </span>
          }>
          පොතක් හදන්න
        </Button>
      </div>
      <Button
        variant="filled"
        size="sm"
        radius="xl"
        leftSection={<GearSix size={20} />}>
        සැකසුම්
      </Button>
    </div>
  );
}