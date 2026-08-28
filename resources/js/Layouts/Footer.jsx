import { IoLocationSharp, IoLogoWhatsapp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
    return (
        <footer className="w-full px-10 pt-6 pb-4 bg-white border-t">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
            <ul className="flex flex-col space-y-2 text-sm font-semibold text-gray-700">
                <li className="flex items-center gap-2">
                    <IoLocationSharp className="text-lg" />
                    <span>
                        Jl. Kali Abang Tengah No.8, Perwira, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17122
                    </span>
                </li>
                <li className="flex items-center gap-2">
                    <IoLogoWhatsapp className="text-lg text-green-700" />
                    <span>085848773284</span>
                </li>
                <li className="flex items-center gap-2">
                    <MdEmail className="text-lg" />
                    <span>skilltech@gmail.com</span>
                </li>
            </ul>
            <p className="text-sm font-medium opacity-80 mt-4 sm:mt-0">
                ©2024 SkillTech Pro. All Rights Reserved.
            </p>
        </div>
    </footer>

    );
}
