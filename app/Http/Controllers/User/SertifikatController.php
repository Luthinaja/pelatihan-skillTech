<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sertifikat;
use App\Models\User;
use App\Models\Kelas;
use App\Models\Kategori;
use App\Models\LearningPath;
use Inertia\Inertia;

class SertifikatController extends Controller
{
    //
    public function store(Request $request)
    {
        try {
            $auth = auth()->user();
            if ($request->percentage >= 70.00) {
                // dd($request->all());
                $sertifikat = Sertifikat::create([
                    'user_id' => $auth->id,
                    'kelas_id' => $request->kelas_id,
                    'status' => 'berhasil',
                    'persentase' => $request->percentage
                ]);

                return redirect()->route('sertifikat.detail', $id = $sertifikat->id)->with('success', 'Selamat anda lulus dalam ujian, sertifikat berhasil ditambahkan.');
            } else {
                $sertifikat = Sertifikat::create([
                    'user_id' => $auth->id,
                    'kelas_id' => $request->kelas_id,
                    'status' => 'gagal',
                    'persentase' => $request->percentage
                ]);
                return redirect()->route('sertifikat.detail', $id = $sertifikat->id)->with('failled', 'Maap anda gagal dalam ujian, sertifikat gagal ditambahkan.');
            }
        } catch (\Exception $e) {
            dd($e);
        }
    }

    public function detail($id)
    {
        $auth = auth()->user();
        $sertifikat = Sertifikat::with('kelas')->find($id);
        $kelas = Kelas::find($sertifikat->kelas_id);
        $pathLearning = LearningPath::with('kelas')->where('kelas_id', $kelas->id)->get();
        $kategori = Kategori::find($kelas->kategori);
        return Inertia::render('Kelas/QuisEnd', compact('auth', 'sertifikat', 'kelas', 'kategori', 'pathLearning'));
    }

    public function berhasil($id)
    {
        $auth = auth()->user();
        $sertifikat = Sertifikat::with('kelas')->where('id', $id)->first();
        $kelas = Kelas::where('id', $sertifikat->kelas_id)->first();
        $kategori = Kategori::where('id', $kelas->kategori)->first();
        return Inertia::render('Kelas/Sertifikat', compact('auth', 'sertifikat', 'kelas', 'kategori'));
    }

    public function mySertifikat()
    {
        $user = auth()->user();

        $sertifikats = Sertifikat::with(['kelas' => function ($query) {
            $query->with('kategori'); 
        }])
            ->where('user_id', $user->id)
            ->where('status', 'berhasil')
            ->get();


        return Inertia::render('Sertifikats', [
            'sertifikats' => $sertifikats,
            'user' => $user, 
        ]);
    }
}
