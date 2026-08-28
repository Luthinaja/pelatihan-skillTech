import React from "react";
import { Alert } from "@mui/material";
import { Link, usePage, router, Head } from "@inertiajs/react";
import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from '@mui/icons-material/Refresh';

const TransaksiIndex = ({ transactions, currentPage, lastPage }) => {
    const { flash } = usePage().props;
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [selectedTransactionId, setSelectedTransactionId] = React.useState(null);
    const [selectedStatus, setSelectedStatus] = React.useState(null);

   const handleOpen = (id, imageUrl) => {
        const trx = transactions.find((t) => t.id === id);
        setSelectedTransactionId(id);
        setSelectedImage(imageUrl);
        setSelectedStatus(trx?.status); 
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
        setSelectedTransactionId(null);
    };

    const handleApprove = () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menyetujui bukti transaksi ini?");
        if (confirmed) {
            router.post(`/admin/transaksi/${selectedTransactionId}/approved`);
            handleClose();
        } else {
            handleClose();
        }
    };

    const handleReject = () => {
        const confirmed = window.confirm(`Apakah Anda yakin ingin menolak bukti transaksi ini?`);
        if (confirmed) {
            router.post(`/admin/transaksi/${selectedTransactionId}/rejected`);
            handleClose();
        } else {
            handleClose();
        }
        handleClose();
    };

    const formatRupiah = (angka) =>
        angka?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });

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

        window.open(`/admin/transaksi/cetak?tgl_mulai=${startDate}&tgl_selesai=${endDate}`, "_blank");
    };


    return (
        <>
        <Head>
            <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
            <title>Kelola Transaksi</title>
        </Head>
        <div className="w-full bg-gray-100 min-h-screen">
            <div className="fixed top-6 z-[9999] w-full flex justify-center">
                {flash.success && <Alert severity="success">{flash.success}</Alert>}
                {flash.failed && <Alert severity="error">{flash.failed}</Alert>}
            </div>

            <PermanentDrawerLeft>
                <div className="w-full mb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold opacity-95">Data Transaksi</h1>
                  <button
                        onClick={() => router.reload({ only: ['transactions'] })}
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm flex items-center gap-2"
                    >
                        <RefreshIcon fontSize="small" />
                        <span>Reload</span>
                    </button>

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
                        Cetak Transaksi
                    </button>
                </div>

                <div className="p-6 w-full">
                    <div className="bg-white rounded-lg shadow-md overflow-auto">
                        <table className="min-w-full table-auto text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                                    <th className="text-left py-3 px-4">#</th>
                                    <th className="text-left py-3 px-4">Tanggal Transaksi</th>
                                    <th className="text-left py-3 px-4">Customer</th>
                                    <th className="text-left py-3 px-4">Invoice</th>
                                    <th className="text-left py-3 px-4">Kelas</th>
                                    <th className="text-left py-3 px-4">Total Harga</th>
                                    <th className="text-left py-3 px-4">Status</th>
                                    <th className="text-left py-3 px-4">Bukti</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                                    >
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">{formatTanggal(item.created_at)}</td>
                                        <td className="py-3 px-4">
                                            {item.user?.name || "-"} <br /> {item.user?.phone_number || "-"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {item.no_invoice || "-"}
                                        </td>
                                        <td className="py-3 px-4">{item.kelas?.name || "-"}</td>
                                        <td className="py-3 px-4">{formatRupiah(item.total_price)}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg
                                                ${
                                                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    item.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                    item.status === 'success' ? 'bg-green-100 text-green-800' :
                                                    item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }
                                                `}
                                            >
                                                {item.status || "-"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {item.payment_proof ? (
                                                <button
                                                    onClick={() => handleOpen(item.id, `/storage/payment_proof/${item.payment_proof}`)}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Lihat Bukti
                                                </button>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Modal Bukti Pembayaran */}
                        <Modal open={open} onClose={handleClose}>
                        <Box
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-4 max-w-md w-full flex flex-col items-center"
                            style={{ maxHeight: '85vh', overflowY: 'auto' }}
                        >
                            {/* Tombol Close */}
                            <div className="w-full flex justify-end mb-2">
                            <IconButton onClick={handleClose} size="small">
                                <CloseIcon />
                            </IconButton>
                            </div>

                            {/* Gambar Bukti */}
                            {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Bukti Pembayaran"
                                className="max-w-full max-h-[70vh] object-contain rounded mb-6"
                                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                            />
                            ) : (
                            <p className="mb-6">Tidak ada bukti pembayaran.</p>
                            )}

                            {selectedStatus === 'success' && (
                            <p className="text-green-700 font-semibold">Transaksi sudah diapprove.</p>
                            )}

                            {selectedStatus === 'rejected' && (
                            <p className="text-red-700 font-semibold">Transaksi sudah ditolak.</p>
                            )}

                            {/* Jika status bukan success dan bukan rejected, tampilkan tombol */}
                            {selectedStatus !== 'success' && selectedStatus !== 'rejected' && (
                            <div className="flex justify-center space-x-4 w-full">
                                <button
                                onClick={handleApprove}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                                >
                                Approve
                                </button>
                                <button
                                onClick={handleReject}
                                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                                >
                                Tolak
                                </button>
                            </div>
                            )}
                        </Box>
                        </Modal>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex justify-end space-x-2">
                        {currentPage > 1 && (
                            <Link
                                href={`/admin/transaksi/list?page=${currentPage - 1}`}
                                className="bg-gray-200 text-sm px-4 py-2 rounded hover:bg-gray-300"
                            >
                                Previous
                            </Link>
                        )}
                        {Array.from({ length: lastPage }, (_, i) => (
                            <Link
                                key={i}
                                href={`/admin/transaksi/page?page=${i + 1}`}
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
                                href={`/admin/transaksi/page?page=${currentPage + 1}`}
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

export default TransaksiIndex;
