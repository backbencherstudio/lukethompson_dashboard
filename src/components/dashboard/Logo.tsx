import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex h-[46px] items-center gap-1 px-4">
      <div className="" />
      <Image
        src="/app_icon.png"
        alt="Logo"
        width={50}
        height={50}
        className="rounded-lg"
      />
      <span className="text-xl font-bold text-white">Get<span className="text-green-success">Dock</span>Pay</span>
    </div>
  );
};
