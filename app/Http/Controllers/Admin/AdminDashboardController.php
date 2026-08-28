<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PaymentMethod;
use App\Models\Kelas;
use App\Models\Transaction;
use App\Models\Enrollment;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $paymentMethod = PaymentMethod::first();

        $totalTransaksiHariIni = Transaction::whereDate('created_at', Carbon::today())->sum('total_price');

        $totalPendaftar = Enrollment::count();

        $totalKelas = Kelas::count();

        $data = [
            'paymentMethod' => $paymentMethod,
            'totalTransaksiHariIni' => $totalTransaksiHariIni,
            'totalPendaftar' => $totalPendaftar,
            'totalKelas' => $totalKelas,
            
        ];

        return Inertia::render('Admin/Dashboard/Index', $data);
    }

    public function updatePaymentMethod(Request $request)
    {
        $paymentMethod = PaymentMethod::first();

        $request->validate([
            'name' => 'required|string|max:100',
            'account_name' => 'required|string|max:100',
            'account_number' => 'required|string|max:100',
            'is_active' => 'required|boolean',
            'duration_minutes' => 'nullable|integer',
        ]);

        $paymentMethod->update([
            'name' => $request->name,
            'account_name' => $request->account_name,
            'account_number' => $request->account_number,
            'is_active' => $request->is_active,
            'duration_minutes' => $request->duration_minutes,
        ]);

        return redirect()->back()->with('success', 'Metode pembayaran berhasil diperbarui.');
    }

}
