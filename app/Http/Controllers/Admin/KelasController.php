<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;
use App\Models\Kelas;
use App\Models\Ketegori;
use App\Models\Options;
use App\Models\Question;
use App\Models\LearningPath;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class KelasController extends Controller
{
    //
    public function index()
    {
        $kelas = Kelas::all();
        return Inertia::render('Admin/Kelas/Index', compact('kelas'));
    }

    public function create()
    {
        $kategori = Kategori::all();
        return Inertia::render('Admin/Kelas/Add', compact('kategori'));
    }

    public function store(Request $request)
    {
       
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'kategori' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'drive' => 'required|string|max:255',
            'harga' => 'required|integer',
            'curriculum' => 'required|array|min:1',
            'curriculum.*' => 'required|string',  
        ]);

        // simpen gambar
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('kelas', $imageName, 'public');
        }
        $kelas = new Kelas();
        $kelas->name = $request->name;
        $kelas->desc = $request->description;
        $kelas->kategori = $request->kategori;
        $kelas->image = $imagePath;
        $kelas->drive = $request->drive;
        $kelas->harga = $request->harga;
        $kelas->save();

        foreach ($request->curriculum as $curriculum) {
            $learningPath = new LearningPath();
            $learningPath->kelas_id = $kelas->id;
            $learningPath->text = $curriculum;
            $learningPath->save();
        }

        return redirect('/admin/kelas')->with('success', 'Kelas berhasil ditambahkan.');
    }

    public function detail($id)
    {
        $kelas = Kelas::with('learning_path')->find($id);
        $learningPath = LearningPath::with('kelas')->where('kelas_id', $id)->get();
        $questions = Question::with('options')->where('kelas_id', $id)->get();
        return Inertia::render('Admin/Kelas/Detail', compact('kelas', 'questions', 'learningPath'));
    }

    public function edit($id)
    {
        $kelas = Kelas::with('learning_path')->find($id);
        $learningPath = LearningPath::with('kelas')->where('kelas_id', $id)->get();
        $questions = Question::with('options')->where('kelas_id', $id)->get();
        $kategori = Kategori::all();
        return Inertia::render('Admin/Kelas/Edit', compact('kelas', 'kategori', 'questions', 'learningPath'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'kategori' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
            'drive' => 'required|string|max:255',
            'harga' => 'required|integer',
            'curriculum' => 'required|array|min:1',
            'curriculum.*' => 'required|string',  
        ]);

        $kelas = Kelas::findOrFail($id);

        if ($request->hasFile('image')) {
            if ($kelas->image && \Storage::disk('public')->exists($kelas->image)) {
                \Storage::disk('public')->delete($kelas->image);
            }

            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('kelas', $imageName, 'public');

            $kelas->image = $imagePath;
        }

        $kelas->name = $request->name;
        $kelas->desc = $request->description;
        $kelas->kategori = $request->kategori;
        $kelas->drive = $request->drive;
        $kelas->harga = $request->harga;
        $kelas->save();

        $kelas->learningPaths()->delete();

        foreach ($request->curriculum as $curriculum) {
            $learningPath = new LearningPath();
            $learningPath->kelas_id = $kelas->id;
            $learningPath->text = $curriculum;
            $learningPath->save();
        }

        return redirect('/admin/kelas')->with('success', 'Kelas berhasil diperbarui.');
    }
    
    public function destroy($id)
    {
        try{
            $kelas = Kelas::find($id);
           if ($kelas->image) {
                if (Storage::disk('public')->exists($kelas->image)) {
                    Storage::disk('public')->delete($kelas->image);
                }
            }
            $kelas->delete();
            return redirect('/admin/kelas')->with('success', 'Kelas berhasil dihapus.');
        }catch(\Exception $e){
            return redirect('/admin/kelas')->with('failled', 'Kelas tidak berhasil dihapus.');
        }
    }
}
