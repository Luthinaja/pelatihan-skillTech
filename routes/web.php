<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\User\UserKelasController;
use App\Http\Controllers\User\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\http\Middleware\CheckRole;

// WELCOME CONTROLLER
Route::get('/', [WelcomeController::class, 'index'])->name('home.index');
Route::get('/kelas/kategori/{id}', [WelcomeController::class, 'showKelasByKategori'])->name('kelas.kategori.index');
Route::get('/kelas/detail/{id}', [WelcomeController::class, 'detail'])->name('kelas.detail');
 
require __DIR__ . '/auth.php';
