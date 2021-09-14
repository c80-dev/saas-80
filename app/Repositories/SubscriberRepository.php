<?php

namespace App\Repositories;

use App\Actions\SubscriberAction;
use Illuminate\Support\Facades\Validator;
use App\Repositories\Contracts\SubscriberRepositoryInterface;

class SubscriberRepository implements SubscriberRepositoryInterface
{
    private $action;

    public function __construct(SubscriberAction $action)
    {
        $this->action = $action;
    }

    //create
    public function createSubscriber($request)
    {
        $validator =  Validator::make($request->all(),[
            'plan_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages()->first()
            ], 422);
        }else {
             return  $this->action->create($request);
        }
    }
    
    //change plan
    public function changeSubscriptionPlan($request, $id)
    {
        $validator =  Validator::make($request->all(),[
            'plan_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages()->first()
            ], 422);
        }else {
             return  $this->action->changePlan($request, $id);
        }
    }

    //active subscribers
    public function active()
    {
         return $this->action->activeSubscribers();
    }

    //deactivate subscribers
    public function deActivateSubscriber($id)
    {
        return $this->action->deActivateSubscription($id);
    }

    public function activateSubscriber($id) 
    {
        return $this->action->activateSubscription($id);
    }

    //inactive subscribers
    public function inactive()
    {
         return $this->action->inactiveSubscribers();
    }

    //view all
    public function allSubscribers()
    {
        return $this->action->all();
    }

    //show
    public function showSubscriber($id)
    {
      return $this->action->get($id);
    }

    //delete
    public function deleteSubscriber($id)
    {
        return $this->action->delete($id);
    }

}
