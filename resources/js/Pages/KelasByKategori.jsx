import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import { Head, Link } from "@inertiajs/react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function KategoriPage({ auth, kategori, kelas }) {
    const theme = useTheme();
    const formatRupiah = (angka) => angka.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return (
        <>
            <Head title={`Kategori: ${kategori.name}`} />
            <Navbar auth={auth} />

            <div className="container mx-auto px-4 md:px-6 lg:px-10 py-16">
                <div className="mb-10">
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: '"Poppins", sans-serif',
                            fontWeight: "bold",
                        }}
                        className="text-gray-900"
                    >
                        Kelas dalam Kategori: <span className="text-[#673ab7]">{kategori.name}</span>
                    </Typography>
                    <p className="mt-2 text-gray-600">
                        Berikut adalah pelatihan yang tersedia dalam kategori ini.
                    </p>
                </div>

                {kelas.length === 0 ? (
                    <div className="text-center text-gray-500">
                        <p>Belum ada kelas dalam kategori ini.</p>
                        <Link href="/">
                            <Button
                                sx={{
                                    mt: 4,
                                    backgroundColor: theme.palette.secondary.main,
                                    borderRadius: "8px",
                                    fontWeight: "bold",
                                    '&:hover': {
                                        backgroundColor: theme.palette.secondary.dark,
                                    }
                                }}
                                variant="contained"
                            >
                                Kembali ke Beranda
                            </Button>
                        </Link>
                    </div>
                ) : (
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
                                        {item.kategori?.name}
                                    </span>

                                    <h1 className="font-bold text-lg text-gray-800 line-clamp-2">{item.name}</h1>

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
                )}
            </div>

            <Footer />
        </>
    );
}
