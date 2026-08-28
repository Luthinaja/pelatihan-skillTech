import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { FcReadingEbook } from "react-icons/fc";
import CardMedia from "@mui/material/CardMedia";
import { Link, router, useForm  } from "@inertiajs/react";

export default function QuisEnd({
    sertifikat,
    kelas,
    kategori,
    auth,
    pathLearning,
}) {
console.log(sertifikat);
console.log(sertifikat);
    if (!sertifikat || !kelas || !kategori) {
        return (
            <div className="w-full h-screen flex justify-center items-center text-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Data hasil kuis tidak lengkap.
                    </h2>
                    <p className="text-gray-600">
                        Silakan kembali ke halaman sebelumnya atau hubungi administrator.
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

    const isPassed = Math.round(sertifikat.persentase) >= 70;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar auth={auth} />

            <main className="flex-grow w-full max-w-6xl mx-auto px-4 md:px-8 py-12">
                <section className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-10 mb-12 bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-col gap-2 max-w-2xl">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                            Hasil Kuis: Pelatihan {kelas.name}
                        </h1>
                        <p className="text-lg text-gray-700 mt-2">
                            Ringkasan hasil kuis untuk pelatihan{" "}
                            <span className="font-semibold text-blue-700">
                                {kelas.name}
                            </span>
                            .
                        </p>
                    </div>

                    <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md flex-shrink-0 bg-white">
                        <div className="w-48 h-32 md:w-56 md:h-40 overflow-hidden rounded-md border border-gray-300 bg-gray-50 flex justify-center items-center">
                            <CardMedia
                                sx={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: '6px' }}
                                component="img"
                                image={`/storage/${kelas.image}`}
                                alt={kelas.name}
                                onError={(e) => { e.target.onerror = null; e.target.src="/images/default-kelas-thumbnail.png" }}
                            />
                        </div>
                        <h2 className="mt-4 font-bold text-lg text-gray-800 text-center">
                            {kelas.name}
                        </h2>
                    </div>
                </section>

                <hr className="my-12 border-t-2 border-blue-100" />

                <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                        Hasil Akhir Kuis
                    </h2>

                    <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 p-6 rounded-lg bg-blue-50 border border-blue-200 shadow-sm">
                        <div className="flex flex-col items-center md:items-start">
                            <p className="text-xl font-medium text-gray-700 mb-2">Skor Anda:</p>
                            <span
                                className={`text-5xl font-bold ${
                                    isPassed ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {Math.round(sertifikat.persentase)}%
                            </span>
                        </div>

                        <div className="flex flex-col items-center md:items-center">
                             <p className="text-xl font-medium text-gray-700 mb-2">Skor Kelulusan:</p>
                            <span className="text-5xl font-bold text-blue-700">
                                70%
                            </span>
                        </div>

                        <div className="flex-shrink-0">
                            {isPassed ? (
                                <a
                                    href={`/sertifikat/${sertifikat.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors duration-200 flex items-center gap-2"
                                >
                                    <MdOutlinePictureAsPdf className="text-xl" />
                                    Lihat Sertifikat
                                </a>
                            ) : (
                                <button
                                    className="px-8 py-3 bg-gray-300 text-gray-600 font-bold rounded-lg cursor-not-allowed"
                                    disabled
                                >
                                    Sertifikat (Tidak Lulus)
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 p-4 rounded-lg text-center">
                        {isPassed ? (
                            <h1 className="text-4xl font-extrabold text-green-700">
                                Selamat! Anda lulus penilaian ini.
                            </h1>
                        ) : (
                            <h1 className="text-4xl font-extrabold text-red-700">
                                Maaf, Anda belum lulus. Silakan coba lagi.
                            </h1>
                        )}
                        {!isPassed && (
                             <p className="text-lg text-gray-600 mt-4">
                                Anda dapat mengulang kuis ini untuk meningkatkan skor Anda.
                            </p>
                        )}
                       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => window.history.back()}
                                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition"
                            >
                                Coba Lagi
                            </button>
                            <Link
                                href="/"
                                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition text-center"
                            >
                                Kembali
                            </Link>
                        </div>
                    </div>
                </section>

                <hr className="my-12 border-t-2 border-blue-100" />

                <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Materi yang Telah Dipelajari
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {pathLearning && pathLearning.length > 0 ? (
                            pathLearning.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-5 bg-blue-50 rounded-lg shadow-sm border border-blue-200"
                                >
                                    <IoDocumentText className="text-blue-700 text-4xl flex-shrink-0" />
                                    <p className="text-lg font-semibold text-gray-800 leading-snug">
                                        {item.text}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-lg col-span-full py-4 text-center">
                                Belum ada materi pembelajaran yang tercatat.
                            </p>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}