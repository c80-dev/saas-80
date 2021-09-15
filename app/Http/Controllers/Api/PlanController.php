<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Contracts\PlanRepositoryInterface;

class PlanController extends Controller
{
    private $planRepository;

    public function __construct(PlanRepositoryInterface $planRepository)
    {
        $this->planRepository = $planRepository;
        $this->middleware('auth:api',['except' => ['index','show']]);
        $this->middleware('superadmin', ['except' => ['index', 'show']]);
    }

    //all plans
    public function index()
    {
        return $this->planRepository->allPlans();        ;
    }

    //create plan
    public function store(Request $request)
    {
        return $this->planRepository->createPlan($request);
    }

    //show single plan
    public function show($id)
    {
        return $this->planRepository->showPlan($id);
    }

    //show single plans details
    public function getSinglePlanSubscribers($id)
    {
        return $this->planRepository->getSinglePlanSubscribers($id);
    }

    //update plan
    public function update(Request $request, $id)
    {
        return $this->planRepository->updatePlan($request, $id);
    }

    //delete plan
    public function destroy($id)
    {
        return $this->planRepository->deletePlan($id);
    }

}
