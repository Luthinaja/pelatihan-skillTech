import React, { useState } from "react";
import {
    TextField,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import PermanentDrawerLeft from "@/Layouts/Admin/PermanentDrawerLeft";
import { useForm, Head } from "@inertiajs/react";

const Edit = ({ question }) => {
    const { patch, data, setData, errors, processing } = useForm({
        id: question.id,
        kelas_id: question.kelas_id,
        question: question.question_text,
        options: question.options.map((option) => option.option_text),
        correctAnswer: question.options.find((option) => option.is_correct === 1)?.option_text || "",
    });

    const handleOptionChange = (index, event) => {
        const newOptions = [...data.options];
        newOptions[index] = event.target.value;
        setData("options", newOptions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        patch(route("pertanyaan.update", data.id));
    };

    return (
        <>
            <Head>
                <link rel="icon" href={`/storage/logo/logo.png`} type="image/x-icon" />
                <title>Kelola Pertanyaan</title>
            </Head>
            <div className="w-full relative">
                <PermanentDrawerLeft>
                    <div className="p-8">
                        <h1 className="text-2xl font-semibold mb-4">Edit Pertanyaan</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <TextField
                                label="Pertanyaan"
                                variant="outlined"
                                fullWidth
                                value={data.question}
                                onChange={(e) => setData("question", e.target.value)}
                                required
                            />
                            {errors.question && (
                                <div className="text-red-500 text-xs">{errors.question}</div>
                            )}

                            {data.options.map((option, index) => (
                                <div key={index}>
                                    <TextField
                                        label={`Jawaban ${index + 1}`}
                                        variant="outlined"
                                        fullWidth
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e)}
                                        required
                                    />
                                    {errors[`options.${index}`] && (
                                        <div className="text-red-500 text-xs">
                                            {errors[`options.${index}`]}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {errors.options && (
                                <div className="text-red-500 text-xs">{errors.options}</div>
                            )}

                            <FormControl component="fieldset" required>
                                <FormLabel component="legend">Jawaban Benar</FormLabel>
                                <RadioGroup
                                    aria-label="correct-answer"
                                    name="correct-answer"
                                    value={data.correctAnswer}
                                    onChange={(e) =>
                                        setData("correctAnswer", e.target.value)
                                    }
                                >
                                    {data.options.map((option, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={option}
                                            control={<Radio />}
                                            label={`Jawaban ${index + 1}`}
                                        />
                                    ))}
                                </RadioGroup>
                                {errors.correctAnswer && (
                                    <div className="text-red-500 text-xs">{errors.correctAnswer}</div>
                                )}
                            </FormControl>

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

export default Edit;
