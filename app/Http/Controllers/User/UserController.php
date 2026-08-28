<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Kelas;

class UserController extends Controller
{
    //
    public function profile() 
    {
        $user = User::find(auth()->user()->id);
        $kelas = Kelas::all();
        return Inertia::render('Profile/Main', compact('user', 'kelas'));
    }
    
    public function dataPribadi()
    {
        $user = User::find(auth()->user()->id);
        return Inertia::render('Profile/Edit', compact('user'));
    }

    public function update(Request $request)
    {
        try{
            $user = User::find(auth()->user()->id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->phone_number = $request->phone_number;
            $user->update();
            return redirect('/profile');
        } catch (\Throwable $th) {
            dd($th);
        }
    }
}
