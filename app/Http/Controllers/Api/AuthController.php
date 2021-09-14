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

    //login user
    public function login(Request $request)
    {
        return $this->authRepository->login($request);
    }

    //logout user
    public function logout(Request $request)
    {
        return $this->authRepository->logout($request);
    }

    //user profile
    public function userProfile()
    {
        return $this->authRepository->userProfile();
    }

}
