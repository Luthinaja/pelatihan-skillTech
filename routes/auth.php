<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Admin\UserListController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckRole;
use Inertia\Inertia;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\TransactionController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\KelasController;
use App\Http\Controllers\Admin\KategoriController;
use App\Http\Controllers\Admin\QuestionController;
use App\Http\Controllers\Admin\AdminTransactionController;
use App\Http\Controllers\Admin\AdminPendaftaranController;
use App\Models\Kategori;
use App\Models\User;

use App\Http\Controllers\User\UserKelasController;
use App\Http\Controllers\User\SertifikatController;
use App\Models\Sertifikat;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store'])->name('register');

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');

    Route::get('google/redirect', [GoogleAuthController::class, 'google_redirect'])->name('google.redirect');    
    Route::get('auth/google/callback', [GoogleAuthController::class, 'google_callback'])->name('google.callback');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('/account/data-pribadi', [UserController::class, 'dataPribadi']);

    Route::get('/my-courses', [UserKelasController::class, 'my_courses'])->name('my-courses.index');

    Route::get('/kelas/pembelajaran/{id}', [UserKelasController::class, 'pembelajaran']);

    Route::get('/kelas/quiz/{id}', [UserKelasController::class, 'quiz'])->name('kelas.quiz');
    
    Route::post('/kelas/quiz-end/', [SertifikatController::class, 'store'])->name('sertifikat.store');
    
    Route::get('/kelas/quiz-end/{id}', [SertifikatController::class, 'detail'])->name('sertifikat.detail');

    Route::get('/sertifikat/{id}', [SertifikatController::class, 'berhasil'])->name('sertifikat.berhasil');
    
    Route::get('/my-sertifikat', [SertifikatController::class, 'mySertifikat'])->name('sertifikat.mySertifikat');

    Route::post('/process-transaction', [TransactionController::class, 'store'])->name('store');

    Route::get('invoice/{no_invoice}', [TransactionController::class, 'invoice'])->name('invoice')->middleware('check.expired');
    Route::get('history-transaksi', [TransactionController::class, 'history'])->name('history.transaksi')->middleware('auth');
    Route::get('/invoice/cetak/{no_invoice}', [TransactionController::class, 'cetak'])->name('invoice.cetak');

    Route::post('/kirim-bukti', [TransactionController::class, 'send_payment_proof'])->name('send_payment_proof');


    Route::middleware(CheckRole::class)->group(function () {
        Route::get('/profile', [UserController::class, 'profile']);
        Route::patch('/profile', [UserController::class, 'update'])->name('profile.update');
    });

    Route::middleware(CheckRole::class)->group(function () {
        Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);
        Route::put('/admin/update-payment-method', [AdminDashboardController::class, 'updatePaymentMethod'])->name('admin.payment-method.update');

        Route::prefix('/admin/user')->middleware(['auth'])->group(function () {
            Route::get('/', [UserListController::class, 'index'])->name('user.index');
            Route::get('/page', [UserListController::class, 'index'])->name('user.page');
            Route::get('/create', [UserListController::class, 'create'])->name('user.create');
            Route::post('/', [UserListController::class, 'store'])->name('user.store');
            Route::get('/edit/{id}', [UserListController::class, 'edit'])->name('user.edit');
            Route::put('/update/{id}', [UserListController::class, 'update'])->name('user.update');
            Route::delete('/{id}', [UserListController::class, 'destroy'])->name('user.destroy');
        });

        // KELAS
        Route::get('/admin/kelas', [KelasController::class, 'index']);
        Route::get('/admin/kelas/create', [KelasController::class, 'create']);
        Route::post('/admin/kelas/create', [KelasController::class, 'store'])->name('kelas.store');
        Route::get('/admin/kelas/detail/{id}', [KelasController::class, 'detail'])->name('kelas.detail');
        Route::get('/admin/kelas/edit/{id}', [KelasController::class, 'edit'])->name('kelas.edit');
        Route::put('/admin/kelas/edit/{id}', [KelasController::class, 'update'])->name('kelas.update');
        Route::delete('/admin/kelas/{id}', [KelasController::class, 'destroy'])->name('kelas.destroy');

        // PERTANYAAN
        Route::get('admin/kelas/pertanyaan/create/{id}', [QuestionController::class, 'create']);
        Route::post('admin/kelas/pertanyaan/create', [QuestionController::class, 'store'])->name('pertanyaan.store');
        Route::get('admin/kelas/pertanyaan/edit/{id}', [QuestionController::class, 'edit'])->name('pertanyaan.edit');
        route::patch('/admin/kelas/pertanyaan/{id}', [QuestionController::class, 'update'])->name('pertanyaan.update');
        Route::delete('/admin/kelas/pertanyaan/{id}', [QuestionController::class, 'destroy'])->name('pertanyaan.destroy');

        // KATEGORI
        Route::get('/admin/kategori', [KategoriController::class, 'index']);
        Route::get('/admin/kategori/create', [KategoriController::class, 'create']);
        Route::post('/admin/kategori/create', [KategoriController::class, 'store'])->name('kategori.store');
        Route::get('/admin/kategori/detail/{id}', [KategoriController::class, 'detail'])->name('kategori.detail');
        Route::get('/admin/kategori/edit/{id}', [KategoriController::class, 'edit'])->name('kategori.edit');
        Route::put('/admin/kategori/{id}', [KategoriController::class, 'update'])->name('kategori.update');
        Route::delete('/admin/kategori/{id}', [KategoriController::class, 'destroy'])->name('kategori.destroy');
        // Route::resource('posts', KategoriController::class);

        // TRANSAKSI
        Route::get('/admin/transaksi', [AdminTransactionController::class, 'index'])->middleware('check.expired');;
        Route::get('/admin/transaksi/page', [AdminTransactionController::class, 'index'])->name('transaksi.page');
        Route::post('/admin/transaksi/{id}/approved', [AdminTransactionController::class, 'approve'])->name('transaksi.approved');
        Route::post('/admin/transaksi/{id}/rejected', [AdminTransactionController::class, 'rejected'])->name('transaksi.rejected');
        Route::get('/admin/transaksi/cetak', [AdminTransactionController::class, 'cetak'])->name('transaksi.cetak');

        // ENROLLMENTS / PENDAFTARAN
        Route::get('/admin/pendaftaran', [AdminPendaftaranController::class, 'index']);
        Route::get('/admin/pendaftaran/page', [AdminPendaftaranController::class, 'index'])->name('pendaftaran.page');
        Route::get('/admin/pendaftaran/cetak', [AdminPendaftaranController::class, 'cetak'])->name('pendaftaran.cetak');

    });
});
