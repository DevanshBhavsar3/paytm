import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

export function Footer() {
  return (
    <footer className="bg-stone-800 p-5 w-full text-white flex justify-between items-center">
      <Link
        href={"/"}
        className="font-semibold text-xl flex justify-center items-center gap-1"
      >
        <RiMoneyRupeeCircleLine size={24} className="text-blue-500" />
        ePay
      </Link>
      <a href="https://github.com/DevanshBhavsar3/paytm" target="_blank">
        <FiGithub size={18} />
      </a>
    </footer>
  );
}
