import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function PuffinLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BuildingOffice2Icon className="h-12 w-12 rotate-[0deg]" />
      <p className="ml-2 pt-2 text-[30px] md:text-[36px]">Puffin</p>
    </div>
  );
}
