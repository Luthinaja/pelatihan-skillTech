import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import { Link, Head } from "@inertiajs/react";
import PrintIcon from '@mui/icons-material/Print';

export default function HistoryTransaksi({ user, transaksis }) {
    return (
        <div className="w-full">
            <Head title="Riwayat Transaksi" />
            <Navbar auth={user} />

            <div className="w-full min-h-screen flex flex-col items-center gap-10 mt-12 px-4">
                {transaksis.length > 0 ? (
                    <>
                        <h1 className="text-3xl font-medium opacity-95 text-center">
                            Riwayat Transaksi {user.name}
                        </h1>
                        <div className="w-full max-w-4xl space-y-4">
                            {transaksis.map((trx) => (
                                <TransaksiCard key={trx.id} transaksi={trx} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center mt-24">
                        <h1 className="text-2xl font-semibold text-gray-700 text-center">
                            Belum ada transaksi.
                        </h1>
                        <p className="text-gray-500 mt-2 text-center">
                            Yuk ikuti kelas dan lakukan transaksi untuk memulai!
                        </p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

function TransaksiCard({ transaksi }) {
    const formatRupiah = (angka) =>
        angka.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });

    return (
        <div className="border shadow p-6 rounded-lg bg-white">
            <h2 className="text-xl font-semibold mb-2">{transaksi.kelas?.name || "Kelas Tidak Diketahui"}</h2>
            <p className="text-sm text-gray-500 mb-1">
                Kategori: {transaksi.kelas?.kategori?.name || "-"}
            </p>
            <p className="text-sm text-gray-500 mb-1">
                Total Harga: {formatRupiah(transaksi.total_price)}
            </p>
           <p className="text-sm text-gray-500 mb-1">
                Status:{" "}
                <span
                    className={`font-semibold ${
                        transaksi.status === "pending"
                            ? "text-orange-500"
                            : transaksi.status === "processing"
                            ? "text-blue-500"
                            : transaksi.status === "rejected" || transaksi.status === "expired"
                            ? "text-red-600"
                            : "text-green-600"
                    }`}
                >
                    {transaksi.status}
                </span>
            </p>
           
            <div className="mt-2 flex items-center gap-4">
                <Link
                    href={route("invoice", transaksi.no_invoice)}
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                    📄 <span>Lihat Invoice</span>
                </Link>

                <a
                    href={route("invoice.cetak", transaksi.no_invoice)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md flex items-center gap-2 shadow"
                >
                    <PrintIcon fontSize="small" />
                    <span>Cetak Invoice</span>
                </a>
            </div>

        </div>
    );
}
