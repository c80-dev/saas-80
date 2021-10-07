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
        $this->middleware('role:superadmin', ['except' => ['index', 'show']]);
    }

    public function index()
    {
        return $this->faqRepository->allFAQs();
    }

    public function store(Request $request)
    {
        return $this->faqRepository->createFAQ($request);
    }

    public function show($id)
    {
        return $this->faqRepository->showFAQ($id);
    }

    public function update(Request $request, $id)
    {
        return $this->faqRepository->updateFAQ($request, $id);
    }

    public function destroy($id)
    {
        return $this->faqRepository->deleteFAQ($id);
    }
}
