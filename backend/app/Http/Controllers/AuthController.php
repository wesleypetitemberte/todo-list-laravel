<?php

namespace App\Http\Controllers;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validação de dados
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        $credentials = $request->only('email', 'password');

        try {
            // Tenta gerar o token
            if ($token = JWTAuth::attempt($credentials)) {
                $user = Auth::user();
                return response()->json([
                    'token' => $token,
                    'user' => $user
                ]);
            }
            return response()->json(['error' => 'Unauthorized'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
    }

    public function register(Request $request)
    {
        // Validação dos dados recebidos
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'password2' => 'required|same:password'
        ]);

        // Criação do usuário
        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Geração do token JWT
        $token = JWTAuth::fromUser($user);

        // Retorno da resposta
        return response()->json([
            'message' => 'Usuário registrado com sucesso!',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json($user);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token invalid'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token not provided'], 401);
        }
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Successfully logged out']);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to logout, token invalid'], 500);
        }
    }
}
