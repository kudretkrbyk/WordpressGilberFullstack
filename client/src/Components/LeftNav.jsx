import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function LeftNav() {
  return (
    <div className="z-40 hidden md:flex flex-col items-start justify-start fixed top-32 p gap-4 w-28 ">
      <div className="flex flex-col items-center gap-10   w-28">
        {" "}
        <div className="bg-gray-500 w-[1px] h-44"></div>
        <div className="flex flex-col gap-5 text-white">
          <div>
            <FaFacebookF className="size-8" />
          </div>
          <div>
            <FaTwitter className="size-8" />
          </div>
          <div>
            <FaInstagram className="size-8" />
          </div>
        </div>
        <div className="bg-gray-500 w-[1px] h-44"></div>
      </div>
      <div className=" flex items-end justify-end w-40 text-white px-3">
        {" "}
        <div>© Gilber. 2020</div>
      </div>
    </div>
  );
}
