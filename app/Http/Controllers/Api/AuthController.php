<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Contracts\AuthRepositoryInterface;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class AuthController extends Controller
{
    private $authRepository;

    public function __construct(AuthRepositoryInterface $authRepository)
    {
        $this->middleware('auth:api', ['except' => ['login','createUser']]);
        $this->authRepository = $authRepository;
    }

    public function login(Request $request)
    {
        return $this->authRepository->login($request);
    }

    public function logout(Request $request)
    {
        return $this->authRepository->logout($request);
    }

    public function userProfile()
    {
        return $this->authRepository->userProfile();
    }

}
