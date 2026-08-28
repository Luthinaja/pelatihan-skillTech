import Button from "@mui/material/Button";
import Navbar from "@/Layouts/Navbar";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FaRegCheckCircle } from "react-icons/fa";
import Footer from "@/Layouts/Footer";
import { Link, Head } from "@inertiajs/react";
import { useState, useRef } from "react"; 

export default function Welcome({ auth, kategori, kelas }) {
    const theme = useTheme();
    console.log(auth);
    const formatRupiah = (angka) => {
        return angka.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
    };

    const [openFaq, setOpenFaq] = useState(null);

    const kelasSectionRef = useRef(null);

    const scrollToKelas = () => {
        if (kelasSectionRef.current) {
            kelasSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const faqs = [
        {
            question: "Bagaimana cara mendaftar kelas di SkillTech Pro?",
            answer: "Untuk mendaftar kelas, Anda bisa mengunjungi halaman detail kelas yang Anda minati dan klik tombol 'Dapatkan Kelas'. Ikuti instruksi selanjutnya untuk menyelesaikan pendaftaran.",
        },
        {
            question: "Apakah ada kelas gratis yang tersedia?",
            answer: "Ya, kami menyediakan beberapa kelas gratis yang bisa Anda ikuti untuk memulai. Cari kelas dengan label 'GRATIS' di daftar pelatihan.",
        },
        {
            question: "Apakah saya akan mendapatkan sertifikat setelah menyelesaikan kelas?",
            answer: "Tentu! Setelah Anda menyelesaikan semua materi dan tugas dalam suatu kelas, Anda akan mendapatkan sertifikat penyelesaian yang bisa diunduh.",
        },
        {
            question: "Bagaimana jika saya mengalami kesulitan saat belajar?",
            answer: "Kami memiliki tim dukungan yang siap membantu Anda. Anda bisa menghubungi kami melalui halaman kontak atau forum komunitas untuk mendapatkan bantuan dari pengajar dan sesama peserta.",
        },
        {
            question: "Apa saja skill coding yang bisa saya pelajari di sini?",
            answer: "Kami menawarkan berbagai skill coding mulai dari dasar-dasar pemrograman, pengembangan web (frontend & backend), pengembangan aplikasi mobile, ilmu data, hingga AI. Anda bisa melihat kategori kelas untuk detail lebih lanjut.",
        },
    ];

    return (
        <>
        <Head>
            <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
            <title>Beranda</title>
        </Head>
        <div className="">
            <Navbar auth={auth.user} />
            <div className="container mx-auto py-12 px-4 md:px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-10 min-h-[calc(100vh-64px)]">
                <div className="flex flex-col justify-center items-start w-full md:w-1/2 space-y-8 animate-fade-in-left">
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: "extrabold",
                            lineHeight: 1.2,
                        }}
                        className="text-gray-900"
                    >
                        Kuasai <span className="text-[#673ab7]">Skill Coding</span> Bersama <br />SkillTech Pro.
                    </Typography>
                    <p className="w-full md:w-[90%] text-lg font-light text-gray-700 leading-relaxed">
                        Mulai petualangan belajarmu hari ini. Temukan pilihan yang tepat untukmu dengan materi terstruktur dan pengajar bersertifikat.
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-4 justify-start w-full">
                        {[
                            "Sepenuhnya gratis",
                            "Materi terakurasi",
                            "Pengajar bersertifikat",
                        ].map((text, i) => (
                            <span
                                key={i}
                                className="flex gap-2 items-center text-base text-gray-800"
                            >
                                <FaRegCheckCircle className="text-[#673ab7] text-xl" />
                                <h1 className="font-medium">{text}</h1>
                            </span>
                        ))}
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme.palette.secondary.main,
                                borderRadius: "10px",
                                fontFamily: theme.typography.fontFamily,
                                fontSize: "1rem",
                                fontWeight: "bold",
                                paddingX: 4,
                                paddingY: 1.8,
                                boxShadow: '0 4px 15px rgba(103, 58, 183, 0.3)',
                                '&:hover': {
                                    backgroundColor: theme.palette.secondary.dark,
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 20px rgba(103, 58, 183, 0.4)',
                                },
                                transition: 'all 0.2s ease-in-out',
                            }}
                            onClick={scrollToKelas} 
                        >
                            Mulai Berlatih Sekarang
                        </Button>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center items-center relative animate-fade-in-right">
                    <img
                        src="/undraw/programming.svg"
                        alt="Ilustrasi Programming"
                        className="w-full max-w-lg h-auto object-contain z-10 drop-shadow-lg"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#ede7f6] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 lg:px-10 mt-16">
                <h1 className="font-bold text-2xl mb-6 text-gray-900">Jelajahi Kategori Kelas</h1>
                {kategori.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {kategori.map((item, index) => (
                            <Link
                            key={index}
                            href={`/kelas/kategori/${item.id }`}
                            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 group"
                            >
                                <div className="w-20 h-20 overflow-hidden rounded-full border-2 border-transparent group-hover:border-[#673ab7] transition-all duration-200">
                                    <img
                                        src={`storage/kategori/${item.image}`}
                                        alt={item.name}
                                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-200"
                                    />
                                </div>
                                <h1 className="font-semibold text-sm mt-3 text-gray-700 group-hover:text-[#673ab7] transition-colors duration-200 text-center">{item.name}</h1>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center text-sm italic">
                        Belum ada kategori yang tersedia.
                    </p>
                )}

            </div>
            <div ref={kelasSectionRef} className="container mx-auto px-4 md:px-6 lg:px-10 mt-16">
                <h1 className="font-bold text-2xl mb-8 text-gray-900">Pilihan Pelatihan Terbaik Kami</h1>
                {kelas.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {kelas.map((item, index) => (
                            <Link
                                key={index}
                                href={`/kelas/detail/${item.id}`}
                                className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group"
                            >
                                <div className="w-full h-52 overflow-hidden">
                                    <img
                                        src={`/storage/${item.image}`}
                                        alt={item.name}
                                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-5 flex flex-col justify-between flex-grow">
                                    <div className="flex flex-col gap-3 mb-4">

                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 w-fit">
                                            {item.kategori?.name ?? item.kategori_name}
                                        </span>

                                        <h1 className="font-bold text-lg text-gray-800 line-clamp-2">
                                            {item.name}
                                        </h1>

                                        <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${
                                            item.harga === 0
                                                ? "bg-red-50 text-red-700 border border-red-200"
                                                : "bg-green-50 text-green-700 border border-green-200"
                                        }`}>
                                            {item.harga === 0 ? "GRATIS" : (formatRupiah(item.harga))}
                                        </span>
                                    </div>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: theme.palette.secondary.main,
                                            borderRadius: "8px",
                                            fontFamily: theme.typography.fontFamily,
                                            fontSize: "0.9rem",
                                            fontWeight: "bold",
                                            paddingY: 1.5,
                                            boxShadow: 'none',
                                            '&:hover': {
                                                backgroundColor: theme.palette.secondary.dark,
                                                transform: 'translateY(-1px)',
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                        }}
                                    >
                                        Dapatkan Kelas
                                    </Button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center text-sm italic">
                        Belum ada kelas yang tersedia.
                    </p>
                )}

            </div>
            <div className="relative w-full h-[450px] mt-20 overflow-hidden rounded-xl shadow-2xl">
                <img
                    src="/images/customer.jpg"
                    alt="Pelajar Sukses"
                    className="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[30%] brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                <div className="relative z-10 flex flex-col justify-center items-end h-full pr-10 md:pr-20 lg:pr-32 py-10 text-right">
                    <h1 className="font-extrabold text-5xl md:text-6xl lg:text-7xl text-white font-sans leading-tight">
                        <span className="text-yellow-400">Temukan</span><br />
                        Pelatihan <span className="text-yellow-400">Impianmu</span><br />
                        Di Sini!
                    </h1>
                    <p className="mt-8 text-white text-base md:text-lg w-full md:w-3/4 lg:w-2/3 max-w-2xl font-light opacity-90">
                        Jelajahi berbagai kelas coding terbaik dan raih sertifikat kompetensi untuk karir impianmu. Daftar sekarang dan mulai belajar!
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-10 mt-20 mb-10">
                <h2 className="font-bold text-3xl text-center mb-10 text-gray-900">Pertanyaan Umum (FAQ)</h2>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                            <button
                                className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg text-gray-800 focus:outline-none"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                {faq.question}
                                <span className="transform transition-transform duration-300">
                                    {openFaq === index ? '−' : '+'}
                                </span>
                            </button>
                            <div
                                className={`px-5 pt-0 overflow-hidden transition-all duration-300 ease-in-out ${
                                    openFaq === index ? 'max-h-96 pb-5' : 'max-h-0'
                                }`}
                            >
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
}