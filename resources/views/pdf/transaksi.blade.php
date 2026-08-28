<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Transaksi</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
            margin: 20px;
        }

        h2 {
            text-align: center;
            margin-bottom: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        th, td {
            border: 1px solid #999;
            padding: 6px;
            text-align: left;
        }

        th {
            background-color: #eee;
        }

        .footer {
            margin-top: 30px;
            text-align: right;
            font-size: 10px;
            color: #777;
        }
    </style>
</head>
<body>
    <h2>Laporan Transaksi</h2>

    <p><strong>Periode:</strong> {{ request('tgl_mulai') }} s.d {{ request('tgl_selesai') }}</p>
    <p><strong>Tanggal Cetak:</strong> {{ \Carbon\Carbon::now()->format('d-m-Y H:i') }}</p>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Tanggal</th>
                <th>Nama</th>
                <th>No. Invoice</th>
                <th>Kelas</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($transactions as $i => $trx)
                <tr>
                    <td>{{ $i + 1 }}</td>
                    <td>{{ \Carbon\Carbon::parse($trx->created_at)->format('d-m-Y H:i') }}</td>
                    <td>{{ $trx->user->name ?? '-' }}</td>
                    <td>{{ $trx->no_invoice }}</td>
                    <td>{{ $trx->kelas->name ?? '-' }}</td>
                    <td>Rp {{ number_format($trx->total_price, 0, ',', '.') }}</td>
                    <td>{{ ucfirst($trx->status) }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" style="text-align: center;">Tidak ada data transaksi.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dicetak oleh sistem pada {{ \Carbon\Carbon::now()->format('d-m-Y H:i') }}
    </div>
</body>
</html>
