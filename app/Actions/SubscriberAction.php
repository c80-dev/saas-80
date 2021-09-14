<?php

namespace App\Actions;

use App\Models\Subscriber;
use App\Http\Resources\SubscriberResource;
use App\Helpers\Payment;
use Carbon\Carbon;
use App\Helpers\Helper;
use App\Models\Plan;
use App\Models\User;

class SubscriberAction
{

    public $model;
    public $payment;
    public $helper;
    public $plan;

    public function __construct(Subscriber $model, Helper $helper, Payment $payment, Plan $plan)
    {
       $this->model = $model;
       $this->payment = $payment;
       $this->helper   =  $helper;
       $this->plan = $plan;
    }

    // //create
    public function create($request)
    {
        $subscriber = $this->model->create([
            'user_id' => auth()->user()->id,
            'plan_id' => $request->plan_id,
            'from' => Carbon::now(),
            'to' => $this->helper->to($request->plan_id)
        ]);
        if ($subscriber) {
            $pay = $this->payment->initialize($request, $this->helper->getCost($request->plan_id));
            if ($pay) {
                return response()->json([
                    'url' => $pay
                ], 200);
            }
        }else {
           return response()->json([
               'message' => 'Sorry unable to subscribe'
           ], 400);
        }
    }

    //change plan
    public function changePlan($request, $id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
            $find_plan = $this->plan->where('id', '=', $request->plan_id)->exists();
            if ($find_plan) {
                $update =  $this->model->find($id)->update([
                    'plan_id' => $request->plan_id
                ]);
                if ($update) {
                  return response()->json([
                       'message' => 'Subscriber plan changed successfully'
                   ], 200);
                }else {
                   return response()->json([
                       'message' => 'Sorry unable to change subscribers plan'
                   ], 400);
                }
            }else {
                return response()->json([
                       'message' => 'Sorry this plan do not exist'
                ], 404);
            }
        }else {
          return response()->json([
              'message' => 'Sorry this subscriber do not exist'
          ], 404);
        }
    }

    //get
    public function all()
    {
        $subscriber = $this->model->with(['plan','user'])->latest()->paginate(20);
        if (count($subscriber) < 1) {
          return response()->json([
              'message' => 'Sorry no subscriber found'
          ], 400);
        }else {
            return SubscriberResource::collection($subscriber);
        }
    }

    // // //activate subscription
    // public function activateSubscription($id)
    // {
    //     $activeSub = $this->model->where('user_id', '=', $id)->whereDate('created_at' , '=', Carbon::today())->first();
    //     $update =  $activeSub->update([
    //         'status' => true
    //     ]);
    //     if ($update) {
    //         return true;
    //     }else {
    //         return false;
    //     }
    // }

    //deactivate subscription
    public function deActivateSubscription($id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
            $sub =  $this->model->find($id);
            $update = $sub->update([
                'status' => false
            ]);
            if ($update) {
              $this->isSubscribed($sub->user_id, false);
              return response()->json([
                   'message' => 'Subscriber deactivated successfully'
               ], 200);
            }else {
               return response()->json([
                   'message' => 'Sorry unable to deactivated subscriber'
               ], 400);
            }
        }else {
          return response()->json([
              'message' => 'Sorry this  subscriber do not exist'
          ], 404);
        }

    }

    //activate
    public function  activateSubscription($id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
            $sub =  $this->model->find($id);
            $update = $sub->update([
                'status' => true
            ]);
            if ($update) {
              $this->isSubscribed($sub->user_id, true);
              return response()->json([
                   'message' => 'Subscriber activated successfully'
               ], 200);
            }else {
               return response()->json([
                   'message' => 'Sorry unable to activated subscriber'
               ], 400);
            }
        }else {
          return response()->json([
              'message' => 'Sorry this  subscriber do not exist'
          ], 404);
        }
    }

    // //active subscribers
    public function activeSubscribers()
    {
        if (auth()->user()->role_id == 1) {
            $active_subscribers = $this->model->with(['plan','user'])->where('status', '=', true)->latest()->paginate(20);
            return SubscriberResource::collection($active_subscribers);
        }else {
          return response()->json([
              'message' => 'Sorry you are not allowed to access this page'
          ], 400);
        }
    }

    //inactive subscribers
    public function inactiveSubscribers()
    {
        if (auth()->user()->role_id == 1) {
            $active_subscribers = $this->model->with(['plan','user'])->where('status', '=', false)->latest()->paginate(20);
            return SubscriberResource::collection($active_subscribers);
        }else {
          return response()->json([
              'message' => 'Sorry you are not allowed to access this page'
          ], 400);
        }
    }

    //get
    public function get($id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
            $subscriber = $this->model->with(['plan','user'])->find($id);
            return new SubscriberResource($subscriber);
        }else {
             return response()->json([
                 'message' => 'Sorry this subscriber do not exist'
             ], 400);
        }
    }

    //delete
    public function delete($id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
            $delete =  $this->model->find($id)->delete();
            if ($delete) {
              return response()->json([
                   'message' => 'Subscriber deleted successfully'
               ], 200);
            }else {
               return response()->json([
                   'message' => 'Sorry unable to delete  subscriber'
               ], 400);
            }
        }else {
          return response()->json([
              'message' => 'Sorry this  subscriber do not exist'
          ], 404);
        }
    }


     //update user can_inspect
    public function isSubscribed($id, $value)
    {
        $user = User::find($id)->update([
             'is_subscribed' => $value
        ]);
    }
    
}
