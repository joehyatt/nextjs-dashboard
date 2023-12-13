import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function PuffinLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <div className="text-[30px]">🐧</div> */}
      <p className="ml-2 pt-2 text-[30px] md:text-[36px]">🐧&nbsp;&nbsp;Puffin</p>
    </div>
  );
}
