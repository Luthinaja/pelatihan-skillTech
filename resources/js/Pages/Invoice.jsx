import React, { useState, useEffect } from 'react';
import { router, Link, Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import Footer from '@/Layouts/Footer';
import PrintIcon from '@mui/icons-material/Print';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Invoice({ auth, transaction, payment_method }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [remainingTime, setRemainingTime] = useState('');
    const [isExpired, setIsExpired] = useState(false);

    const { data, setData, reset } = useForm({
        no_invoice: transaction.no_invoice,
        payment_proof: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/kirim-bukti/', data, {
            onSuccess: () => {
                reset('payment_proof');
                setImagePreview(null);
            },
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setData('payment_proof', file);
        setImagePreview(URL.createObjectURL(file));
    };

    const formatRupiah = (angka) => {
        return angka.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
    };

    useEffect(() => {
        if (!transaction.expired_at || transaction.status !== 'pending') return;

        const interval = setInterval(() => {
            const now = new Date();
            const expiredTime = new Date(transaction.expired_at);
            const diff = expiredTime - now;

            if (diff <= 0) {
                setIsExpired(true);
                clearInterval(interval);
                window.location.reload();
                return;
            }

            const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

            setRemainingTime(`${hours}:${minutes}:${seconds}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [transaction.expired_at, transaction.status]);

    const statusStyles = {
        success: 'text-green-600',
        processing: 'text-blue-600',
        pending: 'text-yellow-600',
        rejected: 'text-red-600',
        expired: 'text-red-500 font-semibold',
    };

    const statusMessages = {
        success: 'Pembayaran Berhasil',
        processing: 'Sedang Diproses..',
        pending: 'Menunggu Pembayaran',
        rejected: 'Pembayaran Ditolak',
        expired: 'Pembayaran Kadaluarsa',
    };

    return (
        <>
            <Head>
                <title>Invoice Pembayaran</title>
                <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
            </Head>

            <Navbar auth={auth?.user} />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6 my-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Invoice Pembayaran</h1>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm text-white bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded-md flex items-center gap-2 shadow"
                    >
                        <RefreshIcon fontSize="small" />
                        <span>Reload</span>
                    </button>

                    <a
                        href={route("invoice.cetak", transaction.no_invoice)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md flex items-center gap-2 shadow"
                    >
                        <PrintIcon fontSize="small" />
                        <span>Cetak Invoice</span>
                    </a>
                </div>


                {transaction.status === 'expired' && (
                    <div className="bg-red-100 border border-red-300 p-6 rounded-xl text-center">
                        <h2 className="text-xl font-bold text-red-600">Pembayaran Kadaluarsa</h2>
                        <p className="text-red-500 mt-2">Waktu pembayaran telah habis. Silakan lakukan pemesanan ulang.</p>
                    </div>
                )}

                <div className="bg-gray-50 p-5 rounded-lg space-y-3 border">
                    <p><strong>No Invoice:</strong> {transaction.no_invoice}</p>
                    <p><strong>Nama:</strong> {transaction.user_name}</p>
                    <p><strong>Email:</strong> {transaction.email}</p>
                    <p><strong>Status:</strong> <span className={statusStyles[transaction.status]}>{statusMessages[transaction.status]}</span></p>
                    <p><strong>Metode Pembayaran:</strong> {payment_method.name}</p>
                    <p><strong>Tanggal:</strong> {new Date(transaction.created_at).toLocaleDateString('id-ID')}</p>
                    {transaction.expired_at && (
                        <p><strong>Berlaku Sampai:</strong> {new Date(transaction.expired_at).toLocaleString('id-ID')}</p>
                    )}
                    {transaction.status === 'pending' && remainingTime && (
                        <p className="text-red-600 font-medium">Sisa Waktu Pembayaran: <span className="font-bold">{remainingTime}</span></p>
                    )}
                </div>

                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Detail Item</h3>
                    <table className="w-full text-left border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Item</th>
                                <th className="p-2 border">Harga</th>
                                <th className="p-2 border">Qty</th>
                                <th className="p-2 border">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border">{transaction.nama_kelas}</td>
                                <td className="p-2 border">{formatRupiah(transaction.harga || 0)}</td>
                                <td className="p-2 border">1</td>
                                <td className="p-2 border">{formatRupiah(transaction.harga || 0)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {transaction.status === 'pending' && (
                    <div className="transfer bg-yellow-100 py-5 px-6 rounded-md border border-yellow-300">
                        <p className="text-yellow-900 font-semibold">
                            Transfer ke <span className="underline">{payment_method.account_number}</span> A/N <span className="underline">{payment_method.account_name}</span>
                        </p>
                    </div>
                )}

                {transaction.status === 'success' && (
                    <div className="mt-6 text-center">
                        <p className="text-green-600 font-medium mb-4">Terima kasih, pembayaran Anda berhasil!</p>
                        <Link
                            href={route('my-courses.index')}
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Cek Kelas Saya
                        </Link>
                    </div>
                )}

                {["pending", "processing", "rejected", "success"].includes(transaction.status) && (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-semibold">Bukti Pembayaran</h3>

                        {(imagePreview || transaction.payment_proof) ? (
                            <img
                                src={imagePreview || `/storage/payment_proof/${transaction.payment_proof}`}
                                alt="Bukti Pembayaran"
                                className="w-full rounded-lg border"
                            />
                        ) : (
                            <p className="text-gray-500 italic">Belum ada bukti pembayaran yang diunggah.</p>
                        )}

                        {transaction.status === "pending" && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleImageChange}
                                    required
                                    className="block w-full"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Kirim Bukti
                                </button>
                            </form>
                        )}

                        {transaction.status === "rejected" && (
                            <p className="text-red-600 font-medium">
                                ❗ Periksa transaksi kamu, pastikan bukti bayar sesuai.
                            </p>
                        )}
                    </div>
                )}

            </div>

            <Footer />
        </>
    );
}
