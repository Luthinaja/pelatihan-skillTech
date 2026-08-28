import React from "react";
import { Alert } from "@mui/material";
import { Link, usePage, Head } from "@inertiajs/react";
import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";

const PendaftaranIndex = ({ enrollments, currentPage, lastPage }) => {
    const { flash } = usePage().props;

    const formatTanggal = (tanggal) => {
        if (!tanggal) return "-";
        const date = new Date(tanggal);
        return date.toLocaleString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    const handlePrint = () => {
        if (!startDate || !endDate) {
            alert("Harap pilih tanggal awal dan akhir.");
            return;
        }

        window.open(`/admin/pendaftaran/cetak?tgl_mulai=${startDate}&tgl_selesai=${endDate}`, "_blank");
    };

    return (
        <>
        <Head>
            <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
            <title>Kelola Pendaftaran</title>
        </Head>
        <div className="w-full bg-gray-100 min-h-screen">
            <div className="fixed top-6 z-[9999] w-full flex justify-center">
                {flash.success && <Alert severity="success">{flash.success}</Alert>}
                {flash.failed && <Alert severity="error">{flash.failed}</Alert>}
            </div>

            <PermanentDrawerLeft>
                <div className="w-full mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold opacity-95">Data Pendaftaran Kelas</h1>
                </div>
                <div className="mb-4 flex items-center gap-2">
                    <input
                        type="date"
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className="mx-1">s.d</span>
                    <input
                        type="date"
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button
                        onClick={handlePrint}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                    >
                        Cetak Pendaftaran
                    </button>
                </div>

                <div className="p-6 w-full">
                    <div className="bg-white rounded-lg shadow-md overflow-auto">
                        <table className="min-w-full table-auto text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                                    <th className="text-left py-3 px-4">#</th>
                                    <th className="text-left py-3 px-4">Tanggal Daftar</th>
                                    <th className="text-left py-3 px-4">User</th>
                                    <th className="text-left py-3 px-4">Kelas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-gray-500">
                                            Tidak ada data pendaftar.
                                        </td>
                                    </tr>
                                )}
                                {enrollments.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                                    >
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">{formatTanggal(item.enrolled_at)}</td>
                                        <td className="py-3 px-4">
                                            {item.user?.name || "-"} <br /> {item.user?.phone_number || "-"}
                                        </td>
                                        <td className="py-3 px-4">{item.kelas?.name || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-end space-x-2">
                        {currentPage > 1 && (
                            <Link
                                href={`/admin/pendaftaran?page=${currentPage - 1}`}
                                className="bg-gray-200 text-sm px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Previous
                            </Link>
                        )}
                        {Array.from({ length: lastPage }, (_, i) => (
                            <Link
                                key={i}
                                href={`/admin/pendaftaran?page=${i + 1}`}
                                className={`px-4 py-2 text-sm rounded ${
                                    currentPage === i + 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                {i + 1}
                            </Link>
                        ))}
                        {currentPage < lastPage && (
                            <Link
                                href={`/admin/pendaftaran?page=${currentPage + 1}`}
                                className="bg-gray-200 text-sm px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Next
                            </Link>
                        )}
                    </div>
                </div>
            </PermanentDrawerLeft>
        </div>
        </>
    );
};

export default PendaftaranIndex;
