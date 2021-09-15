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
        return $this->userRepository->allUsers();
    }

     //all users
     public function adminIndex()
     {
         return $this->userRepository->allAdmin();
     }

    //show user details
    public function show($id)
    {
        return $this->userRepository->findUser($id);
    }

     //create user account
     public function createUser(Request $request)
     {
         return $this->userRepository->createUser($request);
     }

     //update user account
     public function updateUserAccount(Request  $request, $id)
     {
         return $this->userRepository->updateUserAccount($request, $id);
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
