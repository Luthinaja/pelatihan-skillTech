import { FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material";
import { useForm } from "@inertiajs/react";

export default function Quiz({ auth, questions }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [errors, setErrors] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);
    const [showModal, setShowModal] = useState(false);
    const [results, setResults] = useState(null);
    const [percentage, setPercentage] = useState(0);

    const { post, data, setData } = useForm({
        kelas_id: questions.length > 0 ? questions[0].kelas_id : null,
        results: results,
        percentage: percentage,
    });

    const handleChange = (questionId, event) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: event.target.value,
        });
        setErrors(false);
    };

    useEffect(() => {
        if (questions.length === 0) return;

        const unansweredQuestions = questions.some(
            (question) => !selectedAnswers[question.id]
        );

        if (unansweredQuestions) {
            setErrors(true);
            return;
        }

        const results = questions.map((question) => {
            const selectedAnswer = selectedAnswers[question.id];
            const correctOption = question.options.find(
                (option) => option.is_correct
            );

            return {
                question: question.question_text,
                selectedAnswer,
                isCorrect: selectedAnswer === correctOption?.option_text,
            };
        });

        setResults(results);

        const totalQuestions = results.length;
        const correctAnswers = results.filter((r) => r.isCorrect).length;
        const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
        setPercentage(percentage);

        setData({
            kelas_id: questions[0].kelas_id,
            results: results,
            percentage: percentage,
        });
    }, [selectedAnswers]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("sertifikat.store"));
    };

    // Timer
    useEffect(() => {
        if (questions.length === 0) return;

        if (timeLeft <= 0) {
            setShowModal(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (showModal && questions.length > 0) {
            setTimeout(() => {
                window.location.href = `/kelas/pembelajaran/${questions[0].kelas_id}`;
            }, 3000);
        }
    }, [showModal]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="w-full">
            <div className="w-full flex justify-between items-center flex-col">
                <div className="w-full bg-blue-700 flex justify-between items-center pl-8">
                    <h1 className="text-2xl font-semibold text-white">PESERTA</h1>
                    <div className="flex gap-3 items-center h-full text-white bg-black bg-opacity-70 p-3">
                        <FaUserCircle className="text-3xl" />
                        <div className="flex flex-col">
                            <p className="font-semibold text-base">{auth.name}</p>
                            <p className="text-sm font-medium opacity-75">{auth.nik}</p>
                        </div>
                    </div>
                </div>

                {questions.length === 0 ? (
                    <>
                    <div className="mt-20 text-center">
                        <h2 className="text-2xl font-bold text-gray-700">
                            Quiz tidak tersedia
                        </h2>
                    </div>
                        <a
                        href="/"
                        className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-800 transition"
                    >
                        Kembali ke Dashboard
                    </a>
                    </>
                    
                ) : (
                    <>
                        <div className="w-full px-16 mt-6 flex justify-end">
                            <p className="text-xl font-semibold text-red-600">
                                Waktu Tersisa: {formatTime(timeLeft)}
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col w-full px-16 justify-start items-start"
                        >
                            <ul className="w-[60%] flex flex-col gap-12 mt-12 list-decimal">
                                {questions.map((question) => (
                                    <li key={question.id}>
                                        <p className="text-base font-semibold opacity-90">
                                            {question.question_text}
                                        </p>
                                        <div className="flex flex-col gap-4 mt-3">
                                            <FormControl component="fieldset" required>
                                                <FormLabel component="legend">
                                                    Pilih salah satu:
                                                </FormLabel>
                                                <RadioGroup
                                                    aria-label={`question-${question.id}`}
                                                    name={`question-${question.id}`}
                                                    value={
                                                        selectedAnswers[question.id] || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(question.id, e)
                                                    }
                                                >
                                                    {question.options.map((option) => (
                                                        <FormControlLabel
                                                            key={option.id}
                                                            value={option.option_text}
                                                            control={<Radio required />}
                                                            label={option.option_text}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {errors && (
                                <p className="text-red-500 mt-4">
                                    Harap jawab semua pertanyaan sebelum mengirim!
                                </p>
                            )}
                            <div className="w-full flex justify-end mb-14 mt-12">
                                <button
                                    className="text-base font-semibold px-8 py-2 rounded-lg bg-blue-700 text-white"
                                    type="submit"
                                >
                                    Submit quiz
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold text-red-600 mb-4">
                            Waktu Habis!
                        </h2>
                        <p className="text-base font-medium mb-4">
                            Anda tidak dapat melanjutkan ujian.
                        </p>
                        <p className="text-sm text-gray-500">
                            Anda akan diarahkan ke halaman berikutnya.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
