<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Contracts\FAQRepositoryInterface;

class FAQController extends Controller
{
    private $faqRepository;

    public function __construct(FAQRepositoryInterface $faqRepository)
    {
        $this->faqRepository = $faqRepository;
        $this->middleware('auth:api',['except' => ['index','show']]);
        $this->middleware('superadmin', ['except' => ['index', 'show']]);
    }

    //index
    public function index()
    {
        return $this->faqRepository->allFAQs();
    }

    //store
    public function store(Request $request)
    {
        return $this->faqRepository->createFAQ($request);
    }

    //show
    public function show($id)
    {
        return $this->faqRepository->showFAQ($id);
    }

    //updated
    public function update(Request $request, $id)
    {
        return $this->faqRepository->updateFAQ($request, $id);
    }

    //delete
    public function destroy($id)
    {
        return $this->faqRepository->deleteFAQ($id);
    }
}
