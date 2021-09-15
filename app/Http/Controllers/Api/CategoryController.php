<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Contracts\CategoryRepositoryInterface;

class CategoryController extends Controller
{
    private $categoryRepository;

    public function __construct(CategoryRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
        $this->middleware('auth:api',['except' => ['index','show']]);
    }

    // all categories
    public function index()
    {
        return $this->categoryRepository->allCategories();
    }

    //create category
    public function store(Request $request)
    {
        return  $this->categoryRepository->createCategory($request);
    }

    //show single category
    public function show($id)
    {
        return $this->categoryRepository->showCategory($id);
    }

    //update category
    public function update(Request $request, $id)
    {
        return $this->categoryRepository->updateCategory($request, $id);
    }

    //delete category
    public function destroy($id)
    {
        return $this->categoryRepository->deleteCategory($id);
    }
}
