<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Pendaftaran</title>
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
    <h2>Laporan Pendaftaran Kelas</h2>

    <p><strong>Periode:</strong> {{ request('tgl_mulai') }} s.d {{ request('tgl_selesai') }}</p>
    <p><strong>Tanggal Cetak:</strong> {{ \Carbon\Carbon::now()->format('d-m-Y H:i') }}</p>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Tanggal Daftar</th>
                <th>Nama</th>
                <th>Telepon</th>
                <th>Kelas</th>
            </tr>
        </thead>
        <tbody>
            @forelse($enrollments as $i => $item)
                <tr>
                    <td>{{ $i + 1 }}</td>
                    <td>{{ \Carbon\Carbon::parse($item->enrolled_at)->format('d-m-Y H:i') }}</td>
                    <td>{{ $item->user->name ?? '-' }}</td>
                    <td>{{ $item->user->phone_number ?? '-' }}</td>
                    <td>{{ $item->kelas->name ?? '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" style="text-align: center;">Tidak ada data pendaftar.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dicetak oleh sistem pada {{ \Carbon\Carbon::now()->format('d-m-Y H:i') }}
    </div>
</body>
</html>
