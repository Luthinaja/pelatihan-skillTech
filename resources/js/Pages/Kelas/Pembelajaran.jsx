import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { FcReadingEbook } from "react-icons/fc";
import BasicModal from "@/Layouts/BasicModal";
import { useState } from "react";
import { CardMedia } from "@mui/material";

export default function Pembelajaran({ auth, kelas, kategori, learningPath }) {
    console.log(kelas)
    if (!kelas || !kategori) {
        return (
            <div className="w-full h-screen flex justify-center items-center text-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Data kelas atau kategori tidak ditemukan.
                    </h2>
                    <p className="text-gray-600">
                        Silakan kembali ke halaman sebelumnya.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-6 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpen(true);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar auth={auth} />

            <main className="flex-grow w-full max-w-6xl mx-auto px-4 md:px-8 py-12">
                <section className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-10 mb-12 bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-col gap-2 max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                            Kategori {kategori.name}
                        </h1>
                        <p className="text-lg text-gray-700 mt-2">
                            Mempelajari tentang topik yang berkaitan dengan{" "}
                            <span className="font-semibold text-blue-700">
                                {kategori.name}
                            </span>
                            .
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md flex-shrink-0 bg-white">
                        <div className="w-28 h-28 md:w-32 md:h-32 overflow-hidden rounded-full border-4 border-blue-600 bg-gray-50 flex justify-center items-center">
                            <CardMedia
                                sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                                component="img"
                                image={`/storage/kategori/${kategori.image}`}
                                alt={kategori.name}
                            />
                        </div>
                        <h2 className="mt-4 font-bold text-lg text-gray-800 text-center">
                            {kategori.name}
                        </h2>
                    </div>
                </section>

                <hr className="my-12 border-t-2 border-blue-100" />

                <section className="mb-12 bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row gap-8 items-start">
                    {kelas.image && (
                        <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
                            <CardMedia
                                sx={{ height: 200, borderRadius: '8px', objectFit: 'cover' }} 
                                component="img"
                                image={`/storage/${kelas.image}`} 
                                alt={kelas.title || 'Thumbnail Kelas'} 
                            />
                        </div>
                    )}

                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Tentang Pelatihan Ini
                        </h2>
                        {kelas.desc ? (
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {kelas.desc}
                            </p>
                        ) : (
                            <p className="text-gray-500 italic">
                                Belum ada deskripsi lengkap untuk pelatihan ini.
                            </p>
                        )}
                    </div>
                </section>

                <hr className="my-12 border-t-2 border-blue-100" />

                <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Materi Pelatihan
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {learningPath && learningPath.length > 0 ? (
                            learningPath.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-5 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm border border-blue-200 transition-all duration-200 ease-in-out transform hover:translate-y-[-2px] hover:shadow-md cursor-pointer"
                                >
                                    <IoDocumentText className="text-blue-700 text-4xl flex-shrink-0" />
                                    <p className="text-lg font-semibold text-gray-800 leading-snug">
                                        {item.text}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-lg col-span-full py-4 text-center">
                                Belum ada materi pembelajaran yang tersedia untuk pelatihan ini.
                            </p>
                        )}
                    </div>
                </section>

                <hr className="my-12 border-t-2 border-blue-100" />

                <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Tahapan Belajar
                    </h2>
                    <ol className="list-decimal list-inside space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                        <li className="text-lg font-medium text-gray-700">
                            Pahami materi dasar melalui dokumen dan video yang disediakan.
                        </li>
                        <li className="text-lg font-medium text-gray-700">
                            Kerjakan latihan soal untuk menguji pemahaman.
                        </li>
                        <li className="text-lg font-medium text-gray-700">
                            Ikuti kuis akhir untuk mendapatkan sertifikat kelulusan.
                        </li>
                        <li className="text-lg font-medium text-gray-700">
                            Tinjau kembali materi yang sulit dan ulangi jika perlu untuk hasil optimal.
                        </li>
                    </ol>
                </section>

                <hr className="my-12 border-t-2 border-blue-100" />

                <section className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Aksi Lanjutan
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        {kelas.drive && (
                            <a
                                href={kelas.drive}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors duration-200"
                            >
                                <MdOutlinePictureAsPdf className="text-2xl" />
                                <span>Download Slide Pembelajaran</span>
                            </a>
                        )}

                        <div>
                            <BasicModal
                                id={kelas.id}
                                open={open}
                                setOpen={setOpen}
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}