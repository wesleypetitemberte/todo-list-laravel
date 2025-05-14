<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;

class Jwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            // Tenta autenticar com o token JWT
            JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            // Se não conseguir autenticar, retorna erro 401
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
