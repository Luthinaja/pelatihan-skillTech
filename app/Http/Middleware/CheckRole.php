<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next,)
    {
        $user = Auth::user();

        if (!$user) {
            return redirect('/login'); 
        }

        if ($user->role === 'admin' && $request->is('admin/*')) {
            return $next($request); 
        }

        if ($user->role === 'user' && $request->is('profile')) {
            return $next($request); 
        }

        if ($user->role === 'admin') {
            return redirect('/admin/dashboard');
        } else {
            return redirect('/profile');
        }

        return $next($request);
    }
}