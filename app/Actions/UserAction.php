<?php

namespace App\Actions;

use App\Models\User;
use App\Http\Resources\UserResource;
use App\Helpers\Cloudinary;
use App\Helpers\Token;
use App\Models\Role;
use App\Mail\VerificationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\VerificationToken;
use Illuminate\Support\Facades\Hash;

class UserAction
{
    public $model;
    public $cloudinary;
    public $token;
    public $role;
    public $verification_token;

    public function __construct(User $model, Cloudinary $cloudinary, Token $token, Role $role, VerificationToken $verification_token)
    {
       $this->model = $model;
       $this->cloudinary = $cloudinary;
       $this->token = $token;
       $this->role = $role;
       $this->verification_token = $verification_token;
    }

    //create user account
    public function create($request)
    {
        $user = $this->model->create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => bcrypt($request->password)
        ]);
        $userRoles = auth()->user()->roles->pluck('name');
        if ($userRoles->contains('SuperAdmin')) {
            $roleAttach =  $this->role->where('name', 'Admin')->first();
        }elseif($userRoles->contains('Admin')) {
            $roleAttach =  $this->role->where('name', 'Editor')->first();
        }else {
            $roleAttach =  $this->role->where('name', 'Admin')->first();
        }
        $user->roles()->attach($roleAttach->id);
        if ($user) {
            $token = Str::random(32);
            $create_token =  $this->verification_token->create([
                'email' => $user->email,
                'token' => $token
            ]);
            $data = array(
                'title' => 'Reset Password Notification',
                'body' => 'You are receiving this email because we received a password reset request for your account.',
                'token' => $token,
                'name' =>  $user->name
            );
            Mail::to($user->email)->send(new VerificationMail($data));
            return response()->json([
                'message' => 'Account created successfully',
            ], 200);
        }else {
           return response()->json([
               'message' => 'Sorry unable to create account'
           ], 400);
        }
    }

    //get all users
    public function all()
    {
      $users = $this->model->latest()->paginate(20);
      if (count($users) < 1) {
        return response()->json([
            'message' => 'Sorry no user found'
        ], 400);
      }else {
          return UserResource::collection($users);
      }
    }

    //get all admin
    public function allAdmin()
    {
        $users = $this->model->with(['roles' => function($query) {
            $query->select(['name'])->where('name', '=', 'Admin');
        }])->latest()->paginate(20);
        if (count($users) < 1) {
            return response()->json([
                'message' => 'Sorry no admin found'
            ], 400);
        }else {
          return UserResource::collection($users);
        }
    }

    //get single user
    public function get($id)
    {
      $data = $this->model->where('id', '=', $id)->exists();
      if ($data) {
          $user = $this->model->find($id);
          return new UserResource($user);
      }else {
           return response()->json([
               'message' => 'Sorry this user do not exist'
           ], 400);
      }
    }

    //get authenticated user
    public function authUser()
    {
        $user = $this->model->with(['roles' => function($query) {
            $query->select(['name']);
        } ])->find(auth()->user()->id);
        return new UserResource($user);
    }

    //update user account
    public function update($request, $id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
           $user = $this->model->find($id);
           $user->slug = null;
           $update = $user->update([
             'name' => empty($request->name) ? $user->name : $request->name,
             'phone' =>   empty($request->phone) ? $user->phone : $request->phone,
             'facebook' =>  empty($request->facebook) ? $user->facebook : $request->facebook,
             'twitter' =>  empty($request->twitter) ? $user->twitter : $request->twitter,
             'linkedin' =>  empty($request->linkedin) ? $user->linkedin : $request->linkedin
           ]);
           if ($update) {
                return response()->json([
                    'message' => 'Profile updated successfully',
                    'user' => $user
                ], 200);
           }else {
              return response()->json([
                  'message' => 'Sorry unable to update profile'
              ], 400);
           }
        }else {
          return response()->json([
              'message' => 'Sorry this data do not exist'
          ], 404);
        }
    }

    //change user password
    public function password($request, $id)
    {
         $data = $this->model->where('id', '=', $id)->exists();
         if ($data) {

                 $user = $this->model->find($id);
                 $hashedPassword = $user->password;

                 if (Hash::check($request->old_password , $hashedPassword)) {

                     if (!Hash::check($request->password , $hashedPassword)) {

                         try {
                             $user->update([
                                 'password' => empty($request->password) ? $user->password : bcrypt($request->password),
                             ]);
                             return response()->json([
                                 'message' => 'User password reset successful'
                             ], 200);

                         }catch (\Exception $e) {
                             return response()->json([
                                 'message' => 'Sorry the password reset process failed'
                             ], 400);
                         }

                     }else {
                         return response()->json([
                             'message' => 'Sorry new password can not be the old password!'
                         ], 401);
                     }
                 }else {
                     return response()->json([
                         'message' => 'Sorry old password doesnt matched'
                     ], 402);
                 }
         }else {
             return response()->json([
                 'message' => 'Sorry this user do not exist'
             ], 404);
         }
    }

    //update user profile image
    public function image($request, $id)
    {
         $data = $this->model->where('id', '=', $id)->exists();
         if ($data) {
              $user = $this->model->find($id);
              $image_add = $user->update([
                   'image_path' =>  $this->cloudinary->image_helper($request, 'image_path')
              ]);
              if ($image_add) {
                  return response()->json([
                      'message' => 'User profile image updated successfully',
                      'path' => $image_add->image_path
                  ], 200);
              }else {
                  return response()->json([
                      'message' => 'Sorry unable to update user profile image'
                  ], 400);
              }
         } else {
             return response()->json([
                 'message' => 'Sorry this user do not exist'
             ], 404);
         }
    }

    //delete user
    public function delete($id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
            $delete =  $this->model->find($id)->delete();
            if ($delete) {
              return response()->json([
                   'message' => 'Account deleted successfully'
               ], 200);
            }else {
               return response()->json([
                   'message' => 'Sorry unable to delete user'
               ], 400);
            }
        }else {
          return response()->json([
              'message' => 'Sorry this user do not exist'
          ], 404);
        }
    }
}
