<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kelas;
use App\Models\Question;
use App\Models\Options;
use Inertia\Inertia;

use function Laravel\Prompts\text;

class QuestionController extends Controller
{
    //
    public function create($id)
    {
        $kelas_id = $id;
        return Inertia::render('Admin/Pertanyaan/Add', compact('kelas_id'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'question' => 'required|string|min:3',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string|distinct',
            'correctAnswer' => 'required|string|in:' . implode(',', $request->options ?? []),
        ], [
            'kelas_id.required' => 'Kelas harus dipilih.',
            'kelas_id.exists' => 'Kelas tidak ditemukan.',
            'question.required' => 'Pertanyaan tidak boleh kosong.',
            'question.min' => 'Pertanyaan minimal 3 karakter.',
            'options.required' => 'Minimal harus ada 2 opsi jawaban.',
            'options.min' => 'Minimal harus ada 2 opsi jawaban.',
            'options.*.required' => 'Semua opsi harus diisi.',
            'options.*.distinct' => 'Jawaban tidak boleh duplikat.',
            'correctAnswer.required' => 'Jawaban benar harus dipilih.',
            'correctAnswer.in' => 'Jawaban benar harus salah satu dari opsi.',
        ]);

        try {
            $question = new Question();
            $question->kelas_id = $request->kelas_id;
            $question->question_text = $request->question;
            $question->save();

            foreach ($request->options as $option) {
                $opt = new Options();
                $opt->question_id = $question->id;
                $opt->option_text = $option;
                $opt->is_correct = $option === $request->correctAnswer ? 1 : 0;
                $opt->save();
            }

            return redirect()->route('kelas.detail', ['id' => $request->kelas_id])
                ->with('success', 'Pertanyaan berhasil ditambahkan.');
        } catch (\Exception $e) {
            return back()->withErrors(['server' => 'Terjadi kesalahan saat menyimpan.'])->withInput();
        }
    }

    public function edit($id)
    {
        $question = Question::with('options')->find($id);
        return Inertia::render('Admin/Pertanyaan/Edit', compact('question'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'question' => 'required|string|max:255',
            'options' => 'required|array|min:2',
            'options.*' => 'required|string|max:255|distinct',
            'correctAnswer' => 'required|string|in:' . implode(',', $request->options ?? []),
        ]);

        try {
            $question = Question::findOrFail($id);
            $question->question_text = $request->question;
            $question->save();

            // Hapus opsi lama
            Options::where('question_id', $question->id)->delete();

            // Simpan opsi baru
            foreach ($request->options as $option) {
                $newOption = new Options();
                $newOption->question_id = $question->id;
                $newOption->option_text = $option;
                $newOption->is_correct = ($request->correctAnswer == $option) ? 1 : 0;
                $newOption->save();
            }

            return redirect()->route('kelas.detail', ['id' => $request->kelas_id])
                ->with('success', 'Pertanyaan berhasil diupdate.');
        } catch (\Exception $e) {
            return redirect()->route('kelas.detail', ['id' => $request->kelas_id])
                ->with('error', 'Oops! Pertanyaan tidak berhasil diupdate.');
        }
    }

    public function destroy($id)
    {
        try {
            $question = Question::findOrFail($id);

            $kelasId = $question->kelas_id;

            Options::where('question_id', $question->id)->delete();

            $question->delete();

            return redirect()->route('kelas.detail', ['id' => $kelasId])
                             ->with('success', 'Pertanyaan berhasil dihapus.');

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->with('error', 'Pertanyaan tidak ditemukan.');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menghapus pertanyaan.');
        }
    }
}
