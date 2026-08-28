<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kategori;
use App\Models\Transaction;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

class AdminTransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with(['user', 'kelas', 'paymentMethod', 'verifiedBy', 'enrollment'])
            ->orderBy('created_at', 'DESC')
            ->paginate(10); 

        return Inertia::render('Admin/Transaksi/Index', [
            'transactions' => $transactions->items(),
            'currentPage' => $transactions->currentPage(),
            'lastPage' => $transactions->lastPage(),
        ]);
    }


   public function approve(Request $request, $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return back()->with('failed', 'Transaksi tidak ditemukan.');
        }

        if ($transaction->status === 'success') {
            return back()->with('error', 'Transaksi sudah di-approve sebelumnya.');
        }

        $transaction->status = 'success';
        $transaction->save();

        $enrollmentExists = Enrollment::where('user_id', $transaction->user_id)
            ->where('kelas_id', $transaction->kelas_id)
            ->exists();

        if (!$enrollmentExists) {
            Enrollment::create([
                'user_id' => $transaction->user_id,
                'kelas_id' => $transaction->kelas_id,
                'transaction_id' => $transaction->id,
                'enrolled_at' => now(),
            ]);
        }

        return back()->with('success', 'Transaksi berhasil di-approve dan user telah didaftarkan ke kelas.');
    }

    public function rejected(Request $request, $id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return back()->with('failed', 'Transaksi tidak ditemukan.');
        }

        if ($transaction->status === 'success') {
            return back()->with('error', 'Transaksi sudah di-approve sebelumnya.');
        }

        if ($transaction->status === 'rejected') {
            return back()->with('error', 'Transaksi sudah ditolak sebelumnya.');
        }

        $transaction->status = 'rejected';
        $transaction->save();

        return back()->with('success', 'Transaksi berhasil ditolak.');
    }

    public function cetak(Request $request)
    {
        $request->validate([
            'tgl_mulai' => 'required|date',
            'tgl_selesai' => 'required|date|after_or_equal:tgl_mulai',
        ]);

        $transactions = Transaction::with(['user', 'kelas'])
            ->whereBetween('created_at', [
                $request->tgl_mulai . ' 00:00:00',
                $request->tgl_selesai . ' 23:59:59',
            ])
            ->get();

        $pdf = Pdf::loadView('pdf.transaksi', compact('transactions'));

        return $pdf->stream('laporan-transaksi.pdf');
    }
}
