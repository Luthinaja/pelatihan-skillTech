import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";
import Button from "@mui/material/Button";
import { Link, router, Head, usePage } from "@inertiajs/react"; 
import { IoDocumentText } from "react-icons/io5";
import { useForm } from "@inertiajs/react";

// card component
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";

import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Alert from "@mui/material/Alert";


export default function KelasDetail({ kelas, questions, learningPath }) {
    // console.log( learningPath);
    function handleDelete(id, name) {
        if (confirm(`Yakin mau hapus kategori "${name}"?`)) {
            router.delete("/admin/kelas/" + id);
        }
    }
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
                <div className="w-full flex flex-col">
                    <div className="w-full flex justify-center items-center flex-col py-8 gap-6">
                        <div className="w-[80%] h-96">
                            <img
                                src={`/storage/${kelas.image}`}
                                alt="rgvedfv"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div className="w-[80%] flex justify-between items-start">
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-3xl font-semibold opacity-95">
                                    {kelas.name}
                                </h1>
                                <p className="font-medium text-sm opacity-90">
                                    {kelas.desc}
                                </p>
                            </div>
                           <div className="flex justify-end gap-4">
                                {/* EDIT */}
                                <Link href={"/admin/kelas/edit/" + kelas.id} className="text-green-700 font-semibold">
                                    <FaEdit className="text-green-500" />
                                </Link>
                                {/* DELETE */}
                                <button
                                    type="button"
                                    onClick={() => handleDelete(kelas.id, kelas.name)}
                                >
                                        <FaTrash className="text-red-500" />
                                </button>
                            </div>
                        </div>
                        <div className="w-[80%] flex flex-wrap justify-start items-start gap-6 mt-6 b">
                            {learningPath.map((item, index) => {
                                return (
                                    <div
                                        className="w-56 flex gap-1 justify-center items-start "
                                        key={index}
                                    >
                                        <IoDocumentText className="opacity-80 text-2xl" />
                                        <p className="text-base font-medium opacity-80">
                                            {item.text}
                                        </p>
                                    </div>
                                );
                        })}
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-6 mt-8">
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-2xl font-medium">
                                Pertanyaan terkait
                            </h1>
                            <Button
                                variant="contained"
                                componenst={Link}
                                href={`/admin/kelas/pertanyaan/create/${kelas.id}`}
                            >
                                Tambah pertanyaan
                            </Button>
                        </div>
                        <div className="w-full flex flex-wrap gap-10 justify-center">
                            {/* <RecipeReviewCard /> */}
                            {questions &&
                                questions.map((item, index) => {
                                    const num = index + 1;
                                    return (
                                        <RecipeReviewCard
                                            key={index}
                                            number={num}
                                            question={item}
                                            options={item.options}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </PermanentDrawerLeft>
        </div>
    );
}

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: "rotate(0deg)",
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: "rotate(180deg)",
            },
        },
    ],
}));

export function RecipeReviewCard({ question, options, number }) {
    // console.log( options);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // PERBAIKAN DI SINI
    const handleDeleteQuestion = (id) => {
        setAnchorEl(null); // Tutup menu setelah klik
        if (confirm(`Yakin mau hapus pertanyaan ini?`)) {
            router.delete(`/admin/kelas/pertanyaan/${id}`);
        }
    };

    return (
        <>
        <Head>
            <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
            <title>Kelola Kelas</title>
        </Head>
        <Card sx={{ maxWidth: 345, width: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${number}`}
                // subheader="Coding"
            />
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    // onClick={handleClose}
                    disableRipple
                >
                    <Link href={`/admin/kelas/pertanyaan/edit/${question.id}`}>
                        <EditIcon />
                        Edit
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => handleDeleteQuestion(question.id)} disableRipple>
                    <DeleteIcon />
                    Hapus
                </MenuItem>
            </StyledMenu>
            <CardContent>
                <p className="text-base font-medium opacity-90">
                    {question.question_text}
                </p>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* <Typography paragraph>Jawaban:</Typography> */}
                    <p className="font-semibold text-base">Jawaban:</p>
                    <p className="font-normal opacity-65 text-sm">
                        Notes: jawaban yang benar berwarna biru
                    </p>
                    <ul className="flex flex-col gap-6 list-disc px-4 mt-8">
                        {options.map((item, index) => {
                            return (
                                <li key={index}>
                                    <p
                                        className={`${
                                            item.is_correct == 1
                                                ? "text-blue-400"
                                                : null
                                        } font-meidum text-base`}
                                    >
                                        {item.option_text}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Collapse>
        </Card>
        </>
    );
}

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: "rgb(55, 65, 81)",
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
        ...theme.applyStyles("dark", {
            color: theme.palette.grey[300],
        }),
    },
}));