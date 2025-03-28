<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureApiAuthentication
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth('sanctum')->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        Auth::setUser($user);

        return $next($request);
    }
}
