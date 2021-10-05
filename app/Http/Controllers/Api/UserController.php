<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Models\Subscriber;

class UserController extends Controller
{
    private $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->middleware('auth:api', ['except' => ['login','createUser']]);
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        return $this->userRepository->allUsers();
    }

    public function adminIndex()
    {
         return $this->userRepository->allAdmin();
    }

    public function show($id)
    {
        return $this->userRepository->findUser($id);
    }

    public function createUser(Request $request)
    {
        return $this->userRepository->createUser($request);
    }

    public function updateUserAccount(Request  $request, $id)
    {
        return $this->userRepository->updateUserAccount($request, $id);
    }

    public function changePassword(Request $request, $id)
    {
        return $this->userRepository->changePassword($request, $id);
    }

    public function updateImage(Request $request, $id)
    {
        return $this->userRepository->updateImage($request, $id);
    }

    public function attachPermissionToUser(Request $request, $id)
    {
        return $this->userRepository->attachPermission($request, $id);
    }

    public function detachPermissionFromUser(Request $request, $id)
    {
        return $this->userRepository->detachPermission($request, $id);
    }

    public function delete($id)
    {
        return $this->userRepository->deleteUser($id);
    }

}
