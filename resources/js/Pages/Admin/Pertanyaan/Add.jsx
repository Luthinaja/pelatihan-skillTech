import React, { useState, useEffect } from "react";
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

const Add = ({ kelas_id }) => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswer, setCorrectAnswer] = useState("");

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    };

    const { post, data, setData, errors, processing } = useForm({
        kelas_id: kelas_id,
        question: question,
        options: options,
        correctAnswer: correctAnswer,
    });

    useEffect(() => {
        setData({
            kelas_id: kelas_id,
            question: question,
            options: options,
            correctAnswer: correctAnswer,
        });
    }, [question, options, correctAnswer]);

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route("pertanyaan.store"));
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
                        <h1 className="text-2xl font-semibold mb-4">Buat pertanyaan</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <TextField
                                label="Pertanyaan"
                                variant="outlined"
                                fullWidth
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                required
                            />
                            {errors.question && (
                                <div className="text-red-500 text-xs">{errors.question}</div>
                            )}

                            {options.map((option, index) => (
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
                                    value={correctAnswer}
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                >
                                    {options.map((option, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={option}
                                            control={<Radio />}
                                            label={`Jawaban ${index + 1}`}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            {errors.correctAnswer && (
                                <div className="text-red-500 text-xs">{errors.correctAnswer}</div>
                            )}

                            <Button type="submit" variant="contained" color="primary" disabled={processing}>
                                Simpan
                            </Button>
                        </form>
                    </div>
                </PermanentDrawerLeft>
            </div>
        </>
    );
};

export default Add;
