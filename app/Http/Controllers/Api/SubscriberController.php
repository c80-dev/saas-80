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
        return $this->subscriberRepository->allSubscribers();
    }

    //create
    public function store(Request $request)
    {
        return $this->subscriberRepository->createSubscriber($request);
    }

    //show
    public function show($id)
    {
        return $this->subscriberRepository->showSubscriber($id);
    }

    //active sub
    public function activeSub()
    {
        return $this->subscriberRepository->active();
    }

    //inactive sub
    public function inActiveSub()
    {
        return $this->subscriberRepository->inactive();
    }

    //change plan
    public function changeSubscriberPlan(Request $request, $id)
    {
        return $this->subscriberRepository->changeSubscriptionPlan($request, $id);
    }

    //deactivate subscribers
    public function deActivateSubscriber($id)
    {
        return $this->subscriberRepository->deActivateSubscriber($id);
    }

    //deactivate subscribers
    public function activateSubscriber($id)
    {
        return $this->subscriberRepository->activateSubscriber($id);
    }

    public function destroy($id)
    {
        return $this->subscriberRepository->deleteSubscriber($id);
    }
}
