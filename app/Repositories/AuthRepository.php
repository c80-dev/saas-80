<?php

namespace App\Repositories;

use Auth;
use JWTAuth;
use App\Actions\UserAction;
use Illuminate\Support\Facades\Validator;
use App\Repositories\Contracts\AuthRepositoryInterface;
use App\Helpers\Token;
use App\Helpers\Helper;

class AuthRepository implements AuthRepositoryInterface
{
      private $action;
      public $token_helper;
      public $helper;

      public function __construct(UserAction $action, Token $token_helper, Helper $helper)
      {
         $this->action = $action;
         $this->token_helper = $token_helper;
         $this->helper = $helper;
      }

      //login user
      public function login($request)
      {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->messages()->first()
                ], 422);
            }else {
                  if (! $token = auth()->attempt($validator->validated())) {
                      return response()->json([
                        'error' => 'Incorect email or password'
                      ], 401);
                  }
                  if (auth()->user()->email_verified_at == NULL) {
                    return response()->json([
                      'error' => 'Email must be verified'
                    ], 401);

                  }else {
                    $token =  $this->token_helper->createNewToken($token);
                    if ($token) {
                        $logRequest = [
                            'log_type' => 'SignIn',
                            'description' => "Login Attempt",
                        ];
                        $this->helper->createLog($logRequest);
                        return response()->json([
                            'token' => $token
                        ], 200);
                    }
                  }
            }
      }

      //logout user
      public function logout($request)
      {
           $validator = Validator::make($request->all(), [
               'token' => 'required',
           ]);
           if ($validator->fails()) {
               return response()->json([
                   'message' => $validator->messages()->first()
               ], 422);
           }else {
               try {
                    JWTAuth::invalidate($request->token);
                    return response()->json([
                       'message' => 'User logged out successfully.'
                    ], 200);
                } catch (JWTException $e) {
                    return response()->json([
                       'message' => 'Failed to logout, please try again.'
                   ], 500);
                }
           }
      }

      //refresh users token
      public function refresh()
      {
          return $this->token_helper->createNewToken(auth()->refresh());
      }

      //users profile
      public function userProfile()
      {
          return $this->action->authUser();
      }

}
