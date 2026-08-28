import React from "react";
import {
    TextField,
    Button,
} from "@mui/material";
import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";
import { useForm, usePage, Head } from "@inertiajs/react";

const AddUser = () => {
    const { errors } = usePage().props;

    const { post, processing, data, setData } = useForm({
        nama: "",
        no_telp: "",
        email: "",
        nik: "",
        nama_ibu: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("user.store")); 
    };

    return (
        <>
            <Head title="Tambah User" />
            <div className="w-full relative">
                <PermanentDrawerLeft>
                    <div className="p-8">
                        <h1 className="text-2xl font-semibold mb-4">Tambah User Admin</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            <TextField
                                label="Nama"
                                variant="outlined"
                                value={data.nama}
                                onChange={(e) => setData("nama", e.target.value)}
                            />
                            {errors.nama && <p className="text-red-500 text-xs">{errors.nama}</p>}

                            <TextField
                                label="Nomor Telepon"
                                variant="outlined"
                                value={data.no_telp}
                                onChange={(e) => setData("no_telp", e.target.value)}
                            />
                            {errors.no_telp && <p className="text-red-500 text-xs">{errors.no_telp}</p>}

                            <TextField
                                label="Email"
                                variant="outlined"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                            <TextField
                                label="NIK"
                                variant="outlined"
                                value={data.nik}
                                onChange={(e) => setData("nik", e.target.value)}
                            />
                            {errors.nik && <p className="text-red-500 text-xs">{errors.nik}</p>}

                            <TextField
                                label="Nama Ibu"
                                variant="outlined"
                                value={data.nama_ibu}
                                onChange={(e) => setData("nama_ibu", e.target.value)}
                            />
                            {errors.nama_ibu && <p className="text-red-500 text-xs">{errors.nama_ibu}</p>}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                disabled={processing}
                            >
                                Simpan
                            </Button>
                        </form>
                    </div>
                </PermanentDrawerLeft>
            </div>
        </>
    );
};

export default AddUser;
