<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kategori;
use App\Models\kelas;
use App\Models\LearningPath;
use App\Models\Question;
use App\Models\Enrollment;
class UserKelasController extends Controller
{
    public function my_courses()
    {
        $auth = auth()->user();

        $my_courses = Enrollment::with([
                'kelas.kategori' 
        ])
        ->where('user_id', $auth->id)
        ->get()
        ->toArray();

        $data = [
            'my_course' => $my_courses,
        ];

        // dd($data);

        return Inertia::render('Kelas/MyCourse', $data);
    }

    public function pembelajaran($id)
    {
        $auth = auth()->user();

        // Cek apakah user telah mendaftar (enroll) ke kelas ini
        $isEnrolled = \DB::table('enrollments')
            ->where('user_id', $auth->id)
            ->where('kelas_id', $id)
            ->exists();

        // Kalau belum terdaftar, tolak akses
        if (!$isEnrolled) {
            abort(403);
        }

        // Jika sudah terdaftar, lanjut ambil data
        $kelas = Kelas::findOrFail($id);
        $learningPath = LearningPath::with('kelas')->where('kelas_id', $id)->get();
        $kategori = Kategori::find($kelas->kategori);

        return Inertia::render('Kelas/Pembelajaran', [
            'auth' => $auth,
            'kelas' => $kelas,
            'kategori' => $kategori,
            'learningPath' => $learningPath
        ]);
    }


    public function quiz($id)
    {
        try {
            $auth = auth()->user();

            $kelas = Kelas::find($id);

            if (!$kelas) {
                return redirect()->back()->with('error', 'Kelas tidak ditemukan.');
            }

            // if (!$auth || !$auth->kelas->contains($kelas->id)) {
            //     abort(404);
            // }

            $kategori = Kategori::find($kelas->kategori);

            $questions = Question::with('options')->where('kelas_id', $id)->get();

            return Inertia::render('Kelas/Quiz', [
                'auth' => $auth,
                'kelas' => $kelas,
                'kategori' => $kategori,
                'questions' => $questions
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan saat memuat kuis. Silakan coba lagi nanti.');
        }
    }
}
