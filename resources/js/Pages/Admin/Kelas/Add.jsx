import React, { useState } from "react";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardMedia,
    CardContent,
    Typography,
} from "@mui/material";
import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";
import { useForm, usePage, Head } from "@inertiajs/react";

const KelasAdd = ({ kategori }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [isGratis, setIsGratis] = useState(false);

    // def form
    const { post, processing, data, setData } = useForm({
        name: "",
        image: null,
        description: "",
        kategori: "",
        drive: "",
        harga: null,
        curriculum: [""],
    });

    const handleCurriculumChange = (index, event) => {
        const newCurriculum = [...data.curriculum];
        newCurriculum[index] = event.target.value;
        setData("curriculum", newCurriculum);
    };

    const addCurriculumField = () => {
        setData("curriculum", [...data.curriculum, ""]);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setData("image", file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('kelas.store'));
    };

    const { errors } = usePage().props;

    const formatRupiah = (angka) => {
        return angka.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
    };
    
    return (
        <>
        <Head>
            <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
            <title>Kelola Kelas</title>
        </Head>
        <div className="w-full relative">
            <PermanentDrawerLeft>
                <div className="p-8">
                    <h1 className="text-2xl font-semibold mb-4">
                        Tambah Kelas
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <TextField
                            label="Nama Kelas"
                            variant="outlined"
                            fullWidth
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name &&
                          <div className="alert text-red-500 text-xs">
                            {errors.name}
                          </div>
                        }
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Kategori Kelas</InputLabel>
                            <Select
                                value={data.kategori}
                                onChange={(e) =>
                                    setData("kategori", e.target.value)
                                }
                                label="Kategori Kelas"
                            >
                                {kategori.map((e) => {
                                   return( <MenuItem value={e.id} key={e.id}>
                                        {e.name}
                                    </MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                         {errors.kategori &&
                          <div className="alert text-red-500 text-xs">
                            {errors.kategori}
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
                                    alt="Gambar Kelas"
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
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="gratis"
                                className="form-checkbox cursor-pointer"
                                checked={isGratis}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setIsGratis(checked);
                                    setData("harga", checked ? 0 : "");
                                }}
                            />
                            <label htmlFor="gratis" className="select-none"> Klik Untuk Harga Kelas Gratis</label>
                        </div>
                       {!isGratis && (
                        <>
                           <TextField
                                label="Harga"
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={data.harga}
                                onChange={(e) => setData("harga", parseInt(e.target.value) || null)}
                            />
                            {data.harga > 0 && (
                                <div className="text-sm text-gray-600 mt-1">
                                    {formatRupiah(data.harga)}
                                </div>
                            )}

                             {errors.harga &&
                                <div className="alert text-red-500 text-xs">
                                    {errors.harga}
                                </div>
                            }
                        </>
                        )}
                        <TextField
                            label="Deskripsi"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        {errors.description &&
                          <div className="alert text-red-500 text-xs">
                            {errors.description}
                          </div>
                        }
                        {data.curriculum.map((item, index) => (
                            <TextField
                                key={index}
                                label={`Kurikulum ${index + 1}`}
                                variant="outlined"
                                fullWidth
                                value={item}
                                onChange={(e) =>
                                    handleCurriculumChange(index, e)
                                }
                            />
                        ))}
                        {errors.curriculum && (
                        <div className="alert text-red-500 text-xs">
                            {errors.curriculum}
                        </div>
                        )}

                        {errors["curriculum.0"] && (
                        <div className="alert text-red-500 text-xs">
                            {errors["curriculum.0"]}
                        </div>
                        )}

                        {errors["curriculum.1"] && (
                        <div className="alert text-red-500 text-xs">
                            {errors["curriculum.1"]}
                        </div>
                        )}

                        <Button variant="outlined" onClick={addCurriculumField}>
                            Tambah Kurikulum
                        </Button>
                        <TextField
                            label="Link Google Drive"
                            variant="outlined"
                            fullWidth
                            value={data.drive}
                            onChange={(e) => setData("drive", e.target.value)}
                        />
                        {errors.drive &&
                          <div className="alert text-red-500 text-xs">
                            {errors.drive}
                          </div>
                        }
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
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

export default KelasAdd;
