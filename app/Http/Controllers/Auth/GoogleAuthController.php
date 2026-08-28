<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

class GoogleAuthController extends Controller
{
    public function google_redirect()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function google_callback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::where('google_id', $googleUser->getId())->first();

            if (!$user) {
                $user = User::where('email', $googleUser->getEmail())->first();

                if ($user) {
                    $user->update([
                        'google_id' => $googleUser->getId(),
                        'avatar' =>  $googleUser->getAvatar()
                    ]);
                } else {
                    $user = User::create([
                        'name' => $googleUser->getName(),
                        'email' => $googleUser->getEmail(),
                        'google_id' => $googleUser->getId(),
                        'avatar' => $googleUser->getAvatar(),
                        'password' => null,
                        'nama_ibu' => '-',
                        'nik' => '-',
                        'phone_number' => '-',
                        'role' => 'user',
                    ]);
                }
            }

            Auth::login($user);

            return Redirect::route('home.index');

        } catch (\Exception $e) {
            dd($e);
            return redirect('/login')->with('error', 'Gagal login dengan Google.');
        }
    }
}