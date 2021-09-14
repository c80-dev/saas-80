<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Contracts\SubscriberRepositoryInterface;

class SubscriberController extends Controller
{
    
    private $subscriberRepository;

    public function __construct(SubscriberRepositoryInterface $subscriberRepository)
    {
        $this->subscriberRepository = $subscriberRepository;
        $this->middleware('auth:api');
    }

    //all
    public function index()
    {
        $subscribers = $this->subscriberRepository->allSubscribers();
        return $subscribers;
    }

    //create
    public function store(Request $request)
    {
        $subscriber = $this->subscriberRepository->createSubscriber($request);
        return $subscriber;
    }

    //show
    public function show($id)
    {
        $subscriber = $this->subscriberRepository->showSubscriber($id);
        return $subscriber;
    }

    //active sub
    public function activeSub()
    {
         $subscriber = $this->subscriberRepository->active();
         return $subscriber;
    }

    //inactive sub
    public function inActiveSub()
    {
         $subscriber = $this->subscriberRepository->inactive();
         return $subscriber;
    }

    //change plan
    public function changeSubscriberPlan(Request $request, $id)
    {
        $subscriber = $this->subscriberRepository->changeSubscriptionPlan($request, $id);
        return $subscriber;
    }

    //deactivate subscribersw
    public function deActivateSubscriber($id)
    {
         $subscriber = $this->subscriberRepository->deActivateSubscriber($id);
         return $subscriber;
    }

      //deactivate subscribersw
    public function activateSubscriber($id)
    {
         $subscriber = $this->subscriberRepository->activateSubscriber($id);
         return $subscriber;
    }


    public function destroy($id)
    {
        $subscriber = $this->subscriberRepository->deleteSubscriber($id);
        return $subscriber;
    }
}
