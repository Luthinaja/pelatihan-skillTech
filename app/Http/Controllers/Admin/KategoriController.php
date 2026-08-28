<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kategori;
use App\Models\Kelas;
use Illuminate\Support\Facades\Storage;

class KategoriController extends Controller
{
    //
    public function index()
    {
        $kategori = Kategori::all();
        return Inertia::render('Admin/Kategori/Index', compact('kategori'));
    }

    public function create()
    {
        return Inertia::render('Admin/Kategori/Add');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp',
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image'); 

            $imageName = time() . '.' . $image->getClientOriginalExtension(); 

            $image->storeAs('kategori', $imageName, 'public');
        }

        $kategori = new Kategori;
        $kategori->name = $request->name;
        $kategori->desc = $request->desc;
        $kategori->image = $imageName;
        $kategori->save();

        return redirect('/admin/kategori')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function detail($id)
    {
        $kategori = Kategori::find($id);
        return Inertia::render('Admin/Kategori/Detail', compact('kategori'));
    }

    public function edit($id)
    {
        $kategori = Kategori::find($id);
        return Inertia::render('Admin/Kategori/Edit', compact('kategori'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'desc' => 'required',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp',
        ]);

        $Kategori = Kategori::where('id', $request->input('id'))->get()->first();

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $image_name = time() . '.' . $image->getClientOriginalExtension();

            $image->storeAs('kategori/', $image_name, 'public');

            if ($Kategori->image) {
                $oldFilePath = 'kategori/' . $Kategori->image;
                if (Storage::disk('public')->exists($oldFilePath)) {
                    Storage::disk('public')->delete($oldFilePath);
                }
            }
            $Kategori->image = $image_name;
        }

        $Kategori->name = $request->input('name');
        $Kategori->desc = $request->input('desc');
        $Kategori->save();  

        return redirect('/admin/kategori')->with('success', 'Kategori berhasil diupdate.');

    }

    public function destroy($id)
    {
        try{
            $kategori = Kategori::find($id);
            if ($kategori->image) {
                $oldImage = 'kategori/' . $kategori->image;
                if (Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
            $kategori->delete();
            return back()->with('success', 'Kategori Berhasil Dihapus.');
        }catch(\Exception $e){
            return back()->with('error', 'Transaksi sudah di-approve sebelumnya.');
        }
    }
}
