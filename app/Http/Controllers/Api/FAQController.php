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
        $faqs = $this->faqRepository->allFAQs();
        return $faqs;
    }

    //store
    public function store(Request $request)
    {
        $faq = $this->faqRepository->createFAQ($request);
        return $faq;
    }

    //show
    public function show($id)
    {
        $faq = $this->faqRepository->showFAQ($id);
        return $faq;
    }

    //updated
    public function update(Request $request, $id)
    {
        $faq = $this->faqRepository->updateFAQ($request, $id);
        return $faq;
    }

    //delete
    public function destroy($id)
    {
        $faq = $this->faqRepository->deleteFAQ($id);
        return $faq;
    }
}
