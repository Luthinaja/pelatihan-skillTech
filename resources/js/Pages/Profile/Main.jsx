import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import { FaUser } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, Head } from "@inertiajs/react";

export default function Main({ user, kelas }) {
    return (
        <div className="w-full">
            <Head>
                <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
                <title>Profile</title>
            </Head>
            <Navbar auth={user} />
            <div className="px-12 w-full flex justify-center items-center my-24">
                <div className="w-[800px] relative flex flex-col overflow-hidden border items-center justify-start py-10 min-h-screen">
                    <div className="w-[110%] h-64 rounded-full bg-cyan-500 flex justify-start items-start px-20 absolute -top-8">
                        <div className="flex gap-2 mt-16">
                            <div className="bg-white w-14 h-14 rounded-full flex justify-center items-center">
                                <FaUser className="text-4xl text-gray-500" />
                            </div>
                            <div className="flex flex-col text-white">
                                <span className="text-sm font-medium">
                                    Selamat datang
                                </span>
                                <p className="text-xl font-semibold">
                                    {user.name}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[95%] bg-white mt-20 z-[999] h-80 rounded-md flex flex-col items-center justify-between py-8">
                        <Link
                            href="/account/data-pribadi"
                            className="w-[90%] rounded-md bg-slate-200 hover:bg-slate-100 flex items-center justify-between p-3"
                        >
                            <p className="text-sm font-semibold">
                                Data Pribadi
                            </p>
                            <MdKeyboardArrowRight className="text-lg" />
                        </Link>
                        <div className="w-full h-36">
                            <img
                                src="/storage/banner/banner.png"
                                alt="Banner Promosi"
                                className="object-cover object-center w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-start bg-sky-500 mt-32 rounded-md text-white py-6 px-8">
                        <span className="text-sm font-semibold flex gap-1 justify-center items-center">
                            <img
                                src="/images/logo.png"
                                alt="Logo SkillTech Pro"
                                className="w-4"
                            />
                            SkillTech
                            <span className="underline underline-offset-1 opacity-85">
                                Pro
                            </span>
                        </span>
                        <div className="flex w-full flex-col items-start"> 
                            <p className="text-xl font-semibold mt-6 mb-4">
                                Deskripsi company
                            </p>
                            <div className="w-full grid grid-cols-3 gap-[420px] overflow-x-scroll scrollbar-none">
                                <div className="min-w-96 h-44 rounded-lg flex flex-col items-start text-black p-4 overflow-hidden relative bg-gradient-to-r from-white from-70% ">
                                    <div className="w-full h-full absolute top-0 -right-52 opacity-15 rotate-2">
                                        <img
                                            src="/images/wolrd-map.png"
                                            alt=""
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="flex flex-col w-[70%] gap-2">
                                        <p className="text-lg font-semibold">
                                            Visi & Misi
                                        </p>
                                        <p className="text-sm font-medium opacity-70">
                                            Menyediakan kurikulum e-course teknologi yang relevan, inovatif, dan mudah diakses untuk berbagai tingkat keahlian, dari pemula hingga profesional.
                                        </p>
                                    </div>
                                </div>
                                <div className="min-w-96 h-44 rounded-lg flex flex-col items-start text-black p-4 overflow-hidden relative bg-gradient-to-r from-white from-70% ">
                                    <div className="w-full h-full absolute top-0 -right-52 opacity-15 rotate-2">
                                        <img
                                            src="/images/wolrd-map.png"
                                            alt=""
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="flex flex-col w-[70%] gap-2">
                                        <p className="text-lg font-semibold">
                                            Kemitraan Strategis
                                        </p>
                                        <p className="text-sm font-medium opacity-70">
                                            Membangun hubungan kolaboratif yang kuat dengan mitra dan klien. Bersama-sama, kami menciptakan nilai dan mencapai tujuan bersama dengan integritas tinggi.
                                        </p>
                                    </div>
                                </div>
                                <div className="min-w-96 h-44 rounded-lg flex flex-col items-start text-black p-4 overflow-hidden relative bg-gradient-to-r from-white from-70% ">
                                    <div className="w-full h-full absolute top-0 -right-52 opacity-15 rotate-2">
                                        <img
                                            src="/images/wolrd-map.png"
                                            alt=""
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="flex flex-col w-[70%] gap-2">
                                        <p className="text-lg font-semibold">
                                            Lorem, ipsum.
                                        </p>
                                        <p className="text-sm font-medium opacity-70">
                                            Lorem ipsum dolor, sit amet
                                            consectetur adipisicing elit. Optio
                                            nobis ad quod esse. Eligendi,
                                            reprehenderit?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-12 w-full px-8">
                            <p className="text-2xl font-bold mb-4 text-white">
                                Jelajahi Kelas Kami
                            </p>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {kelas.length > 0 ? (
                                    kelas.map((item, index) => (
                                        <Link
                                            key={item.id || index}
                                            href={`/kelas/detail/${item.id}`}
                                            className="group relative block w-full h-40 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                                            style={{
                                                backgroundImage: `url(${item.thumbnail || '/images/default-thumbnail.jpg'})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-end text-white">
                                                <p className="text-lg font-bold group-hover:text-cyan-300 transition-colors duration-200">
                                                    {item.name}
                                                </p>
                                                {item.short_description && (
                                                    <p className="text-sm opacity-90 mt-1 line-clamp-2">
                                                        {item.short_description}
                                                    </p>
                                                )}
                                                <div className="flex items-center mt-2 text-sm opacity-80">
                                                    {item.total_modules && (
                                                        <span className="flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
                                                            </svg>
                                                            {item.total_modules} Modul
                                                        </span>
                                                    )}
                                                    {item.difficulty && (
                                                        <span className="ml-4 flex items-center gap-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                            </svg>
                                                            {item.difficulty}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="col-span-full text-center text-gray-400 mt-8">
                                        Belum ada kelas tersedia saat ini.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}