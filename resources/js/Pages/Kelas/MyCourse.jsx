import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import { useState } from "react";
import { Link, router, useForm  } from "@inertiajs/react";
import Button from "@mui/material/Button";

export default function MyCourse({ auth, my_course }) {
    // console.log(auth)
    return (
        <div className="w-full">
            <Navbar auth={auth.user} />
            <div className="w-full min-h-screen px-10 pt-10 pb-16 bg-gray-50">
                <h1 className="text-3xl font-bold mb-6">Kursus Saya</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {my_course.length === 0 ? (
                        <p className="text-gray-600">Belum ada kursus yang diambil.</p>
                    ) : (
                        my_course.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                            >
                                <img
                                    src={`/storage/${item.kelas.image}`}
                                    alt={item.kelas.name}
                                    className="w-full h-36 object-cover"
                                />
                                <div className="p-4 flex flex-col gap-2">
                                    <span className="text-sm text-purple-600 font-medium">
                                        {item.kelas.kategori.name}
                                    </span>
                                    <h2 className="text-lg font-semibold">
                                        {item.kelas.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {item.kelas.desc}
                                    </p>
                                    <Link
                                        href={`/kelas/pembelajaran/${item.kelas.id}`}
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
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
