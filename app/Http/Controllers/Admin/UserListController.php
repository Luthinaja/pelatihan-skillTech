<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserListController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $userCurrentPage = $request->input('userPage', 5);
        $userList = User::where('role', 'user')
            ->orderBy('created_at', 'DESC')
            ->paginate(5, ['*'], 'userPage', $userCurrentPage)
            ->withQueryString(); 

        $adminCurrentPage = $request->input('adminPage', 1);
        $adminList = User::where('role', 'admin')
            ->orderBy('created_at', 'DESC')
            ->paginate(10, ['*'], 'adminPage', $adminCurrentPage)
            ->withQueryString(); 

        return Inertia::render('Admin/UserList/Index', [
            'userList' => $userList,
            'user' => $user,
            'adminList' => $adminList,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/UserList/Add');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'no_telp' => 'required|string|max:20',
            'email' => 'required|email|unique:users,email',
            'nik' => 'required|string|max:20|unique:users,nik',
            'nama_ibu' => 'required|string|max:255',
        ]);

        User::create([
            'name' => $validated['nama'],
            'phone_number' => $validated['no_telp'],
            'email' => $validated['email'],
            'nik' => $validated['nik'],
            'nama_ibu' => $validated['nama_ibu'],
            'role' => 'admin',
            'password' => Hash::make('password'), // default password
        ]);

        return redirect()->route('user.index')->with('success', 'User berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Admin/UserList/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'no_telp' => 'required|string|max:20',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'nik' => 'required|string|max:20|unique:users,nik,' . $user->id,
            'nama_ibu' => 'required|string|max:255',
        ]);

        $user->update([
            'name' => $validated['nama'],
            'phone_number' => $validated['no_telp'],
            'email' => $validated['email'],
            'nik' => $validated['nik'],
            'nama_ibu' => $validated['nama_ibu'],
        ]);

        return redirect()->route('user.index')->with('success', 'User berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if (auth()->id() === $user->id) {
            return back()->with('failled', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }

        $user->delete();

        return redirect()->route('user.index')->with('success', 'User berhasil dihapus.');
    }

}
