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
import { useForm, router, usePage, Head  } from "@inertiajs/react";

const KategoriDetail = ({kategori}) => {
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData } = useForm({
        id: kategori.id,
        name: kategori.name,
        image: null,
    });

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
                        Detail Kategori
                    </h1>
                    <form
                        className="flex flex-col gap-4"
                    >
                        <TextField
                            label="Nama Kategori"
                            variant="outlined"
                            value={data.name}
                            disabled
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                        />
                        {imagePreview ? (
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={imagePreview}
                                alt="Gambar Kategori"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Pratinjau Gambar
                                </Typography>
                            </CardContent>
                        </Card>
                    ) : (
                        kategori.image && (
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`/storage/kategori/${kategori.image}`}
                                    alt={kategori.image}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Pratinjau Gambar
                                    </Typography>
                                </CardContent>
                            </Card>
                        )
                    )}
                    </form>
                </div>
            </PermanentDrawerLeft>
        </div>
        </>
    );
};

export default KategoriDetail;
