<?php

namespace App\Repositories;

use App\Actions\UserAction;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\Validator;

class UserRepository implements UserRepositoryInterface
{
      private $action;

      public function __construct(UserAction $action)
      {
         $this->action = $action;
      }

      //create user account
      public function createUser($request)
      {
          $validator =  Validator::make($request->all(),[
              'name' => 'required|regex:/^([^0-9]*)$/',
              'email' => 'required|email|unique:users',
              'phone' => 'required|unique:users|max:11|min:11',
              'password' => 'required|confirmed'
          ]);

          if ($validator->fails()) {
              return response()->json([
                  'message' => $validator->messages()->first()
              ], 422);
          }else {
               return  $this->action->create($request);
          }
      }

       //all user
      public function allUsers()
      {
        return $this->action->all();
      }

      public function allAdmin()
      {
            return $this->action->allAdmin();
      }

      //find user
      public function findUser($id)
      {
        return $this->action->get($id);
      }

      //update user account
      public function updateUserAccount($request, $id)
      {
          $validator =  Validator::make($request->all(),[
              'name' => 'sometimes',
              'phone' => 'sometimes|max:11|min:11',
              'facebook' => 'sometimes',
              'twitter' => 'sometimes',
              'linkedin' => 'sometimes'
          ]);

          if ($validator->fails()) {
              return response()->json([
                  'message' => $validator->messages()->first()
              ], 422);
          }else {
                return $this->action->update($request, $id);
          }
      }

      //update user image
      public function updateImage($request, $id)
      {
            $validator =  Validator::make($request->all(),[
               'image_path' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->messages()->first()
                ], 422);
            }else {
                return $this->action->image($request, $id);
            }
      }

      //change  user password
      public function changePassword($request, $id)
      {
          $validator =  Validator::make($request->all(),[
              'old_password' => 'required',
              'password' => 'required|confirmed'
          ]);
          if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages()->first()
            ], 422);
          }else {
              return $this->action->password($request);
          }
      }

       //delete user
        public function deleteUser($id)
        {
            return $this->action->delete($id);
        }


}
