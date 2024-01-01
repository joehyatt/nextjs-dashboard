import Image from 'next/image';
import logoImg from '@/app/ui/puffin_logo.png'

export default function PuffinLogo() {
  return (
    // <div
    //   className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    // >
    //   {/* <div className="text-[30px]">🐧</div> */}
    //   {/* <p className="ml-2 pt-2 text-[30px] md:text-[36px]">🐧&nbsp;&nbsp;Puffin</p> */}
    //   <Image src="/public/puffin_logo.png" alt="PUFFIN" width={64} height={16}/>
    // </div>
    <Image src={logoImg} alt="PUFFIN" width={144} height={38.16}/>
  );
}
