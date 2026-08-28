import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";

// components untuk card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import Button from "@mui/material/Button";
import { Link, usePage, router, Head } from "@inertiajs/react";
import { useState } from "react";
import Alert from "@mui/material/Alert";

export default function KelasIndex({ kelas }) {
    const { flash } = usePage().props;
    const [categories, setCategories] = useState([]);
    
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
                <div className="w-full flex flex-col">
                    <div className="w-full mb-4 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold opacity-95">
                            Daftar Kelas
                        </h1>
                        <Button
                            variant="contained"
                            componenst={Link}
                            href="/admin/kelas/create"
                        >
                            Tambah kelas
                        </Button>
                    </div>
                    <div className="w-full flex flex-wrap gap-10 mt-4">
                        {kelas.map((item, index) => {
                            return (
                                <ActionAreaCard cardItem={item} key={index} />
                            );
                        })}
                    </div>
                </div>
            </PermanentDrawerLeft>
        </div>
    );
}

export function ActionAreaCard({ cardItem }) {
    return (
        <>
        <Head>
            <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
            <title>Kelola Kelas</title>
        </Head>
        <Card
            sx={{ maxWidth: 345 }}
            component={Link}
            href={`/admin/kelas/detail/${cardItem.id}`}
        >
            <CardActionArea>
                <CardMedia
                    sx={{ height: 300 }}
                    component="img"
                    image={`/storage/${cardItem.image}`}
                    alt={cardItem.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {cardItem.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        {cardItem.desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </>
    );
}
