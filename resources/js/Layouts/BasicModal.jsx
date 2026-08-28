import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "@inertiajs/react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #64b5f6",
    boxShadow: 24,
    p: 4,
    borderRadius: "6px",
};

export default function BasicModal({ id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <button onClick={handleOpen} className="text-base font-semibold px-8 py-2 rounded-lg bg-[#311b92] text-white">
                Mulai quiz
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="w-full flex flex-col justify-center items-center gap-1">
                        <h1 className="text-xl font-semibold opacity-90">
                            Apakah yakin ingin memulai quiz?
                        </h1>
                        <p className="text-base font-medium opacity-75 text-center">
                            pastikan anda telah membaca slide pembelajaran
                            terlebih dahulu.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <Button
                                variant="contained"
                                color="error"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClose();
                                }}
                            >
                                Batal
                            </Button>
                            <Button
                                components={Link}
                                href={`/kelas/quiz/${id}`}
                                variant="contained"
                                color="success"
                                onClick={handleClose}
                            >
                                Mulai
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
