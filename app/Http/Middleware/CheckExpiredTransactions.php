<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Transaction;
use Carbon\Carbon;

class CheckExpiredTransactions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Transaction::where('status', 'pending')
            ->whereNotNull('expired_at')
            ->where('expired_at', '<', now())
            ->update(['status' => 'expired']);
        return $next($request);
    }
}
