import Link from "next/link";
import logo from "../../assets/logo.svg";
import Image from "next/image";
import Search from "./Search";

const Nav = () => {
  return (
    <div className="bg-[#02040A] w-full h-16 flex justify-between items-center px-10 py-2 pt-3 z-50">
      <Link href="/">
        <Image
          unoptimized={true}
          src={logo}
          alt="logo"
          width={400}
          height={300}
          className="object-contain w-[180px] h-[50px]"
        />
      </Link>
      <Search />
      <div className="absolute top-14 z-50 left-0 w-full h-16 bg-gradient-to-b from-black to-transparent"></div>
    </div>
  );
};

export default Nav;
