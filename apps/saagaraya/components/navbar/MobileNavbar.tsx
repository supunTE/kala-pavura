import { MobileNavLinks } from '@/components/navbar/molecules';

export function MobileNavbar() {
  return (
    <div className="fixed bottom-0 z-40 flex w-full items-center justify-between p-2 sm:hidden">
      <div className="flex w-full items-center gap-4 rounded-full border border-zinc-400/20 bg-zinc-700/40 p-2 backdrop-blur-md">
        <MobileNavLinks />
      </div>
    </div>
  );
}
