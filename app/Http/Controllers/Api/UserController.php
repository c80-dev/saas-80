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

    //all users
    public function index()
    {
        $users = $this->userRepository->allUsers();
        return $users;
    }

     //all users
     public function adminIndex()
     {
        $admins = $this->userRepository->allAdmin();
        return $admins;
     }

    //show user detils
    public function show($id)
    {
        $user = $this->userRepository->findUser($id);
        return $user;
    }

     //create user account
     public function createUser(Request $request)
     {
         return $this->userRepository->createUser($request);
     }

     //update user account
     public function updateUserAcount(Request  $request, $id)
     {
         return $this->userRepository->updateUserAcount($request, $id);
     }

     //reset user password
     public function changePassword(Request $request, $id)
     {
        return $this->userRepository->changePassword($request, $id);
     }

     //upload image
     public function updateImage(Request $request, $id)
     {
        return $this->userRepository->updateImage($request, $id);
     }

      //delete user account
        public function delete($id)
        {
            return $this->userRepository->delete($id);
        }

}
