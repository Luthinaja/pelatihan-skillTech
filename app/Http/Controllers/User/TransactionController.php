<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Enrollment;
use App\Models\PaymentMethod;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'kelas_id' => 'required|exists:kelas,id',
            'payment_method_id' => 'nullable|exists:payment_methods,id',
            'total_price' => 'required|numeric|min:0',
            'payment_proof' => 'nullable|file|mimes:jpg,png,jpeg,webp|max:2048',
            'status' => 'in:pending,success,failed',
        ]);

        // Cek jika harga > 0 (berbayar)
        if ($request->total_price > 0) {
            $no_invoice = 'STP' . strtoupper(uniqid());

            // Ambil metode pembayaran dan durasi timer
            $paymentMethod = PaymentMethod::first();

            // Hitung waktu expired
            $expiredAt = Carbon::now()->addMinutes($paymentMethod->duration_minutes);
            // dd($expiredAt);

            $Transaction = new Transaction();
            $Transaction->user_id = $request->user_id;
            $Transaction->kelas_id = $request->kelas_id;
            $Transaction->payment_method_id = $request->payment_method_id;
            $Transaction->total_price = $request->total_price;
            $Transaction->payment_proof = $request->payment_proof;
            $Transaction->status = 'pending'; 
            $Transaction->no_invoice = $no_invoice;
            $Transaction->expired_at = $expiredAt;
            $Transaction->save();

            return redirect()->route('invoice', ['no_invoice' => $no_invoice]);
        } else {
            // Gratis (Free Class)

            $alreadyEnrolled = Enrollment::where('user_id', $request->user_id)
                ->where('kelas_id', $request->kelas_id)
                ->exists();

            if ($alreadyEnrolled) {
                return redirect('/my-courses')->with('info', 'Kamu sudah mengambil kelas ini.');
            }

            $Transaction = new Transaction();
            $Transaction->user_id = $request->user_id;
            $Transaction->kelas_id = $request->kelas_id;
            $Transaction->payment_method_id = null;
            $Transaction->total_price = 0;
            $Transaction->payment_proof = null;
            $Transaction->status = 'success';
            $Transaction->no_invoice = 'STP' . strtoupper(uniqid());
            $Transaction->expired_at = null;
            $Transaction->save();

            $Enrollment = new Enrollment();
            $Enrollment->user_id = $request->user_id;
            $Enrollment->kelas_id = $request->kelas_id;
            $Enrollment->transaction_id = $Transaction->id;
            $Enrollment->enrolled_at = now();
            $Enrollment->save();

            return redirect('/my-courses')->with('success', 'Kelas berhasil ditambahkan.');
        }
    }

    public function invoice($no_invoice)
    {
        $Transaction = Transaction::select(
            'transactions.*',
            'users.name as user_name',
            'users.email',
            'kelas.name as nama_kelas',
            'kelas.harga'
        )
        ->join('users', 'transactions.user_id', '=', 'users.id')
        ->join('kelas', 'transactions.kelas_id', '=', 'kelas.id')
        ->where('transactions.no_invoice', $no_invoice)
        ->firstOrFail();

        $PaymentMethod = PaymentMethod::first(); 

        $expiredAt = Carbon::parse($Transaction->created_at)->addMinutes($PaymentMethod->duration_minutes);

        return Inertia::render('Invoice', [
            'transaction' => $Transaction,
            'payment_method' => $PaymentMethod,
            'expired_at' => $expiredAt->toDateTimeString(),
        ]);
    }

    public function send_payment_proof(Request $request){
        $request->validate([
            'no_invoice' => 'required',
            'payment_proof' => 'required|file|mimes:jpg,png,jpeg,webp',
        ]);

        $Transaction = Transaction::where('no_invoice', $request->no_invoice)->firstOrFail();

        if ($request->hasFile('payment_proof')) {
            $file = $request->file('payment_proof');
            $filename = 'payment-proof-' . Str::uuid() . '.' . $file->getClientOriginalExtension();

            $file->storeAs('payment_proof', $filename, 'public');

            if ($Transaction->payment_proof) {
                Storage::disk('public')->delete('payment_proof/' . $Transaction->payment_proof);
            }

            $Transaction->payment_proof = $filename;
            $Transaction->status = 'processing';
            $Transaction->save();
        }

        return redirect()->back()->with('success', 'Bukti pembayaran berhasil dikirim.');

    }

    public function history()
    {
        $user = auth()->user();
        $transaksis = Transaction::with(['kelas.kategori', 'paymentMethod'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('HistoryTransaksi', [
            'user' => $user,
            'transaksis' => $transaksis,
        ]);
    }

    public function cetak($no_invoice)
    {
    $transaction = Transaction::with(['user', 'kelas.kategori', 'paymentMethod'])
        ->where('no_invoice', $no_invoice)
        ->firstOrFail();

    $pdf = Pdf::loadView('pdf.invoice', compact('transaction'));

    return $pdf->stream('invoice_' . $no_invoice . '.pdf');
    }

}
