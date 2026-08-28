<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// Buat aplikasi Laravel baru
$app = new Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

// Konfigurasi aplikasi dengan file routing dan pengaturan lainnya
return $app->configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Middleware untuk web
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'check.expired' => \App\Http\Middleware\CheckExpiredTransactions::class,
        ]);

        // Middleware untuk API
        $middleware->api(append: [
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Menangani pengecualian (opsional)
    })
    ->create();
