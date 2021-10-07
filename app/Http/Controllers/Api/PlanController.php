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
        $this->middleware('role:superadmin', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        return $this->planRepository->allPlans();        ;
    }

    public function store(Request $request)
    {
        return $this->planRepository->createPlan($request);
    }

    public function show($id)
    {
        return $this->planRepository->showPlan($id);
    }

    public function getSinglePlanSubscribers($id)
    {
        return $this->planRepository->getSinglePlanSubscribers($id);
    }

    public function update(Request $request, $id)
    {
        return $this->planRepository->updatePlan($request, $id);
    }

    public function destroy($id)
    {
        return $this->planRepository->deletePlan($id);
    }

}
