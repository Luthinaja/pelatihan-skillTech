<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kategori;
use App\Models\Kelas;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;


class WelcomeController extends Controller
{

    public function index()
    {
        $kategori = Kategori::all();
        $kelas = Kelas::with('kategori')->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'kategori' => $kategori,
            'kelas' => $kelas
        ]);
    }

    public function detail($id)
    {
        $auth = auth()->user(); 
        $kelas = Kelas::with('kategori')->findOrFail($id);
        $kategori = Kategori::find($kelas->kategori);

        $my_courses = [];

        if ($auth) {
            $my_courses = Enrollment::where('user_id', $auth->id)
                ->pluck('kelas_id')
                ->toArray();
        }

        return Inertia::render('Kelas/Detail', [
            'auth' => $auth,
            'kelas' => $kelas,
            'kategori' => $kategori,
            'my_courses' => $my_courses,
        ]);
    }

    public function showKelasByKategori($id)
    {
        $auth = auth()->user();
        $kategori = Kategori::findOrFail($id);
        $kelas = Kelas::with('kategori')->where('kategori', $id)->get();

        return Inertia::render('KelasByKategori', [
            'auth' => $auth,
            'kategori' => $kategori,
            'kelas' => $kelas,
        ]);
    }




}
