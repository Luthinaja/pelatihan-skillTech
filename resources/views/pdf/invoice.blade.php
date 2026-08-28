<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Invoice - {{ $appName ?? 'Brand Anda' }}</title>
    <style>
        @page {
            size: A4;
            margin: 0;
        }
        body {
            font-family: system-ui, sans-serif;
            font-size: 10pt;
            color: #444;
            margin: 0;
            padding: 2cm;
            background: #fff;
        }
        .container {
            max-width: 700px;
            margin: auto;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }
        .logo {
            max-height: 50px;
        }
        .brand-name {
            font-size: 12pt;
            font-weight: bold;
        }
        h1 {
            font-size: 18pt;
            margin: 0;
        }
        .meta {
            text-align: right;
            font-size: 9pt;
            color: #666;
        }
        .section-title {
            font-size: 11pt;
            font-weight: 600;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            padding-bottom: 4px;
            color: #222;
        }
        .details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .details p {
            margin: 3px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #eee;
            padding: 8px;
            text-align: left;
        }
        th {
            background: #f8f8f8;
            font-size: 9pt;
            font-weight: 600;
        }
        td {
            font-size: 9pt;
        }
        .text-right { text-align: right; }
        .text-center { text-align: center; }

        .summary {
            text-align: right;
        }
        .summary p {
            margin: 4px 0;
        }
        .summary .total {
            font-size: 12pt;
            font-weight: bold;
            color: #0d6efd;
        }

        .note {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 15px;
            margin-top: 30px;
            font-size: 9pt;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 8pt;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            @if(file_exists(public_path('storage/logo/logo.png')))
                <img src="{{ public_path('storage/logo/logo.png') }}" class="logo" alt="Logo">
            @endif
            <div class="meta">
                <div class="brand-name"> {{ config('app.name') }}</div>
                <h1>INVOICE</h1>
                <p>No: {{ $transaction->no_invoice }}</p>
                <p>Tanggal: {{ \Carbon\Carbon::parse($transaction->created_at)->format('d M Y') }}</p>
            </div>
        </div>

        <div>
            <div class="section-title">Pelanggan</div>
            <div class="details">
                <div>
                    <p><strong>Nama:</strong> {{ $transaction->user->name }}</p>
                    <p><strong>Email:</strong> {{ $transaction->user->email }}</p>
                </div>
                <div>
                    <p><strong>Status:</strong> {{ ucfirst($transaction->status) }}</p>
                    @if($transaction->paymentMethod)
                        <p><strong>Metode:</strong> {{ $transaction->paymentMethod->name }}</p>
                    @endif
                    @if($transaction->expired_at && $transaction->status == 'pending')
                        <p><strong>Batas Bayar:</strong> {{ \Carbon\Carbon::parse($transaction->expired_at)->format('d M Y H:i') }} WIB</p>
                    @endif
                </div>
            </div>
        </div>

        <div>
            <div class="section-title">Detail Pembelian</div>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th class="text-right">Harga</th>
                        <th class="text-center">Qty</th>
                        <th class="text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $transaction->kelas->name ?? 'N/A' }}</td>
                        <td class="text-right">Rp {{ number_format($transaction->total_price, 0, ',', '.') }}</td>
                        <td class="text-center">1</td>
                        <td class="text-right">Rp {{ number_format($transaction->total_price, 0, ',', '.') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="summary">
            <p class="total">Total: Rp {{ number_format($transaction->total_price, 0, ',', '.') }}</p>
        </div>

        @if($transaction->status == 'pending' && $transaction->paymentMethod)
        <div class="note">
            <p>Silakan transfer ke rekening berikut:</p>
            <p><strong>{{ $transaction->paymentMethod->name }}</strong></p>
            <p>Nomor: <strong>{{ $transaction->paymentMethod->account_number }}</strong></p>
            <p>A/N: {{ $transaction->paymentMethod->account_name }}</p>
            <p style="margin-top: 10px;"><em>Setelah transfer, silakan konfirmasi pembayaran Anda.</em></p>
        </div>
        @elseif($transaction->status == 'success')
        <div class="note" style="border-color:#c7efd9; background:#e8fff2;">
            <p><strong>Pembayaran Berhasil.</strong> Terima kasih atas transaksi Anda.</p>
        </div>
        @elseif($transaction->status == 'rejected')
        <div class="note" style="border-color:#f5c6cb; background:#f8d7da;">
            <p><strong>Pembayaran Ditolak.</strong> Silakan coba lagi atau hubungi admin.</p>
        </div>
        @elseif($transaction->status == 'expired')
        <div class="note" style="border-color:#ffeeba; background:#fff3cd;">
            <p><strong>Pembayaran Kadaluarsa.</strong> Silakan buat ulang transaksi jika masih ingin melanjutkan.</p>
        </div>
        @endif

        <div class="footer">
            &copy; {{ date('Y') }} {{ config('app.name') }} - Semua Hak Cipta Dilindungi.</a>
        </div>
    </div>
</body>
</html>
