import Navbar from "@/Layouts/Navbar";
import Footer from "@/Layouts/Footer";
import {
    PiMicrosoftWordLogo,
    PiMicrosoftPowerpointLogo,
    PiMicrosoftExcelLogo,
} from "react-icons/pi";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { CardMedia } from "@mui/material";
import { Link } from "@inertiajs/react";

const Pelatihan = ({ kelas, auth, kategori }) => {
    const theme = useTheme();
    // console.log(kelas);
    return (
        <div>
            <Navbar auth={auth.user} />
            <div className="w-full min-h-screen flex justify-start items-start flex-col px-10 pt-10 pb-16">
                {kelas.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            href={`kelas/detail/${item.id}`}
                            className="w-72 h-[380px] flex flex-col justify-between border border-gray-200 rounded-lg shadow overflow-hidden"
                        >
                            <div className="w-full h-full">
                                <div className="w-full h-48">
                                    <img
                                        src={`storage/${item.image}`}
                                        alt=""
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                                <div className="flex flex-col mt-2 px-3 gap-1">
                                    <h1 className="font-semibold text-base">
                                        {item.name}
                                    </h1>
                                    <span className="border border-red-500 rounded-xl text-red-500 w-16 text-center py-[2px] text-sm font-semibold">
                                        gratis
                                    </span>
                                    <div className="flex mt-2 justify-start items-center gap-1">
                                        <p>⭐</p>
                                        <p className="text-sm font-semibold">
                                            4.8
                                        </p>
                                        <p className="text-sm font-medium opacity-50">
                                            (3rb ulasan)
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 mb-3">
                                <Button
                                    variant="contained"
                                    // color="primary"
                                    sx={{
                                        backgroundColor:
                                            theme.palette.secondary.main,
                                        borderRadius: "7px",
                                        fontFamily: theme.typography.fontFamily,
                                        fontSize: "13px",
                                        fontWeight: "semibold",
                                        width: "100%",
                                    }}
                                >
                                    Ikuti pelatihan
                                </Button>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <Footer />
        </div>
    );
};

export default Pelatihan;
