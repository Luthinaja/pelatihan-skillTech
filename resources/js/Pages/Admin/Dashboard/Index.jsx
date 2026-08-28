import React, { useState } from "react";
import {
    Button,
    Typography,
    Alert,
    TextField,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";
import { Head, router, usePage, useForm } from "@inertiajs/react";

const MoneyBillWaveIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" {...props}>
        <path
            fill="currentColor"
            d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM248 248v32c0 13.3-10.7 24-24 24H152c-13.3 0-24-10.7-24-24V248c0-13.3 10.7-24 24-24h72c13.3 0 24 10.7 24 24zM424 248v32c0 13.3-10.7 24-24 24H352c-13.3 0-24-10.7-24-24V248c0-13.3 10.7-24 24-24h48c13.3 0 24 10.7 24 24z"
        />
    </svg>
);

function DashboardPage({ paymentMethod, totalTransaksiHariIni, totalPendaftar, totalKelas }) {
    const { flash } = usePage().props;

    const formatRupiah = (angka) =>
        angka.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        });

    const metrics = [
        {
            id: 1,
            title: "Total Transaksi Hari Ini",
            value: formatRupiah(Number(totalTransaksiHariIni) || 0),
            icon: MoneyBillWaveIcon,
        },
        {
            id: 2,
            title: "Total Pendaftar",
            value: totalPendaftar || 0,
            icon: MoneyBillWaveIcon,
        },
        {
            id: 3,
            title: "Total Kelas",
            value: totalKelas || 0,
            icon: MoneyBillWaveIcon,
        },
    ];


    const { data, setData, put, processing, errors } = useForm({
        name: paymentMethod.name || "",
        account_name: paymentMethod.account_name || "",
        account_number: paymentMethod.account_number || "",
        is_active: paymentMethod.is_active ? "1" : "0",
        duration_minutes: paymentMethod.duration_minutes || "",
    });

    const handleSubmit = (e) => {
    e.preventDefault();
        put(route("admin.payment-method.update"), data, {
            forceFormData: true,
        });
    };

    return (
        <div className="w-full relative">
            <div className="w-full flex justify-center fixed top-6 z-[9999]">
                {flash.success && <Alert severity="success">{flash.success}</Alert>}
                {flash.failed && <Alert severity="error">{flash.failed}</Alert>}
            </div>

            <PermanentDrawerLeft>
                <Head title="Dashboard" />

                <div className="flex w-full flex-col justify-start gap-6 p-6">
                    {/* HEADER & CARD */}
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-2xl font-semibold opacity-90">Statistik Ringkasan</h1>
                    </div>

                    <div className="w-full flex gap-6 flex-wrap justify-start">
                        {metrics.map((item) => (
                            <DashboardCard
                                key={item.id}
                                title={item.title}
                                value={item.value}
                                icon={item.icon}
                            />
                        ))}
                    </div>

                    {/* FORM UPDATE PAYMENT METHOD */}
                    <div className="mt-10 p-6 bg-white rounded-xl shadow-md max-w-2xl">
                        <h2 className="text-xl font-semibold mb-4">Ubah Metode Pembayaran</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <TextField
                                label="Nama Metode"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                variant="outlined"
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

                            <TextField
                                label="Nama Akun"
                                value={data.account_name}
                                onChange={(e) => setData("account_name", e.target.value)}
                                variant="outlined"
                            />
                            {errors.account_name && (
                                <p className="text-red-500 text-xs">{errors.account_name}</p>
                            )}

                            <TextField
                                label="Nomor Akun"
                                value={data.account_number}
                                onChange={(e) => setData("account_number", e.target.value)}
                                variant="outlined"
                            />
                            {errors.account_number && (
                                <p className="text-red-500 text-xs">{errors.account_number}</p>
                            )}

                            <TextField
                                label="Durasi Pembayaran (menit)"
                                type="number"
                                value={data.duration_minutes}
                                onChange={(e) => setData("duration_minutes", e.target.value)}
                                variant="outlined"
                            />
                            {errors.duration_minutes && (
                                <p className="text-red-500 text-xs">{errors.duration_minutes}</p>
                            )}

                            <Button type="submit" variant="contained" color="primary">
                                Simpan Perubahan
                            </Button>
                        </form>
                    </div>
                </div>
            </PermanentDrawerLeft>
        </div>
    );
}

function DashboardCard({ title, value, icon: Icon }) {
    return (
        <div className="w-full max-w-[300px] bg-white rounded-xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col">
                <span className="text-sm text-gray-500">{title}</span>
                <span className="text-2xl font-bold text-gray-800">{value}</span>
            </div>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
}

export default DashboardPage;
