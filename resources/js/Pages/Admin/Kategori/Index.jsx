import React, { useState, useEffect } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Button,
    Typography,
} from "@mui/material";
import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";
import { PiMicrosoftWordLogo } from "react-icons/pi";
// import Button from "@mui/material/Button";
import { Link, usePage, useForm, router, Head  } from "@inertiajs/react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const KategoriIndex = ({ kategori }) => {
    const { flash } = usePage().props;

    return (
        <div className="w-full relative">
            <div className="w-full flex justify-center fixed top-6 z-[9999] ">
                {flash.success && (
                    <Alert severity="success">{flash.success}</Alert>
                )}
                {flash.failled && (
                    <Alert severity="error">{flash.failled}</Alert>
                )}
            </div>
            <PermanentDrawerLeft>
                <div className="flex w-full flex-col justify-start gap-4">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-2xl font-medium opacity-90">
                            Daftar Kategori
                        </h1>
                        <Button
                            variant="contained"
                            componenst={Link}
                            href="/admin/kategori/create"
                        >
                            Tambah kategori
                        </Button>
                    </div>
                    <div className="w-full flex gap-6 flex-wrap justify-start">
                        {kategori.map((item, index) => (
                            <ActionAreaCard content={item} key={index} />
                        ))}
                    </div>
                </div>
            </PermanentDrawerLeft>
        </div>
    );
};

export function ActionAreaCard({ content }) {
    function handleDelete(id, name) {
        if (confirm(`Yakin mau hapus kategori "${name}"?`)) {
            router.delete("/admin/kategori/" + id);
        }
    }
    
    return (
        <>
            <Head>
                <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
                <title>Kelola Kategori</title>
            </Head>
            <Card sx={{ maxWidth: 345, width: 345 }}>
            <CardActionArea
                onClick={() => router.visit(`/admin/kategori/detail/${content.id}`)}
            >
                <CardMedia
                    sx={{ maxHeight: 140 }}
                    component="img"
                    height="140"
                    image={`/storage/kategori/${content.image}/`}
                    alt="gambar kategori"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {content.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {content.desc}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <div className="flex justify-end gap-4 px-4 pb-4">
                <Link
                    href={"/admin/kategori/edit/" + content.id}
                    className="text-green-700 font-semibold"
                >
                    <FaEdit className="text-green-500" />
                </Link>
                <button
                    type="button"
                    onClick={() => handleDelete(content.id, content.name)}
                    className="text-red-700 font-semibold"
                >
                    <FaTrash className="text-red-500" />
                </button>
            </div>
        </Card>
        </>
    );
}

export default KategoriIndex;
