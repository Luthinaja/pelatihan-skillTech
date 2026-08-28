import React, { useState } from "react";
import {
    TextField,
    Button,
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";
import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";
import { useForm, Link, usePage, Head } from "@inertiajs/react";

const KategoriAdd = () => {
    const { errors } = usePage().props
    const [imagePreview, setImagePreview] = useState(null);

    const { post, processing, data, setData, error } = useForm({
        name: "",
        image: null,
        desc: "",
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setData("image", file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route("kategori.store"));
    };

    return (
        <>
            <Head>
                <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
                <title>Kelola Kategori</title>
            </Head>
        <div className="w-full relative">
            <PermanentDrawerLeft>
                <div className="p-8">
                    <h1 className="text-2xl font-semibold mb-4">
                        Tambah Kategori
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <TextField
                            label="Nama Kategori"
                            variant="outlined"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                        />
                        {errors.name &&
                          <div className="alert text-red-500 text-xs">
                            {errors.name}
                          </div>
                        }
                        <TextField
                            label="Deskripsi"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={data.desc}
                            onChange={(e) =>
                                setData("desc", e.target.value)
                            }
                        />
                        {errors.desc &&
                            <div className="alert text-red-500 text-xs">
                            {errors.desc}
                            </div>
                        }
                        <Button variant="contained" component="label">
                            Upload Gambar
                            <input
                                type="file"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                        {errors.image &&
                          <div className="alert text-red-500 text-xs">
                            {errors.image}
                          </div>
                        }
                        {imagePreview && (
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={imagePreview}
                                    alt="Gambar Kategori"
                                />
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        Pratinjau Gambar
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
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

export default KategoriAdd;
