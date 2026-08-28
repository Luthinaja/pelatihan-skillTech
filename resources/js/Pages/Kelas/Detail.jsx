import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import {
    PiMicrosoftWordLogo,
    PiMicrosoftPowerpointLogo,
    PiMicrosoftExcelLogo,
} from "react-icons/pi";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { CardMedia } from "@mui/material";
import { Link, router, useForm, Head  } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from 'react';


const Detail = ({ kelas, auth, kategori, my_courses }) => {
    const isEnrolled = my_courses.includes(kelas.id); 
    const theme = useTheme();

    // SETUP FORM
    const { data } = useForm({
        user_id: auth?.id ?? null,
        kelas_id: kelas.id,
        payment_method_id: null,
        total_price: kelas.harga,
        payment_proof: null,
        status: 'success',
    });

    function submit(e) {
        e.preventDefault();
        router.post("/process-transaction/", data);
    }

    return (
         <div>
            <Head title={`Kelas: ${kelas.name}`} />

            <Navbar auth={auth} />
            <div className="w-full min-h-screen flex justify-start items-start flex-col px-10 pt-10 pb-16">
                <div className="flex flex-col justify-start gap-4">
                    <h1 className="text-2xl font-semibold opacity-90">
                        Kategori {kategori.name}
                    </h1>
                    <span className="flex gap-1 items-center flex-col hover:scale-110 transition-all ease-linear duration-100 cursor-pointer w-32">
                        <div className="w-16 h-16 overflow-hidden rounded-md">
                            <CardMedia
                                sx={{ height: "100%", width: "100%" }}
                                component="img"
                                image={`/storage/kategori/${kategori.image}`}
                                alt="kategori"
                            />
                        </div>
                        <h1 className="font-semibold text-sm opacity-70">
                            {kategori.name}
                        </h1>
                    </span>
                </div>

                <div className="w-full flex justify-center mt-10 px-4">
                    <div className="w-full max-w-2xl">
                        <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden flex flex-col bg-white">
                            <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                                <CardMedia
                                    component="img"
                                    image={`/storage/${kelas.image}`}
                                    alt={kelas.name}
                                    sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                                />
                            </div>

                            <div className="p-6 flex flex-col gap-3">
                                <h1 className="text-2xl font-semibold text-gray-900">{kelas.name}</h1>

                                <span className="w-fit px-3 py-1 text-sm font-medium text-red-600 border border-red-500 rounded-full">
                                    {kelas.harga === 0 ? "Gratis" : `Rp ${kelas.harga.toLocaleString("id-ID")}`}
                                </span>

                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 w-fit">
                                    {kelas.kategori?.name ?? kelas.kategori_name}
                                </span>

                                <p className="text-sm text-gray-700 opacity-80 mt-2">
                                    {kelas.desc}
                                </p>

                                <div className="mt-4">
                                    {isEnrolled ? (
                                        <Link
                                            href={`/kelas/pembelajaran/${kelas.id}`}
                                            className="block w-full"
                                        >
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#6B21A8',
                                                    borderRadius: "8px",
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                    width: "100%",
                                                    textTransform: "none",
                                                }}
                                            >
                                                Lanjut Belajar
                                            </Button>
                                        </Link>
                                    ) : (
                                        <form onSubmit={submit}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: theme.palette.secondary.main,
                                                    borderRadius: "8px",
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                    width: "100%",
                                                    textTransform: "none",
                                                }}
                                            >
                                                {kelas.harga === 0 ? "Ikuti Kelas" : "Beli Sekarang"}
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Detail;
