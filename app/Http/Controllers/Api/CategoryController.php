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
        $categories = $this->categoryRepository->allCategories();
        return $categories;
    }

    //create category
    public function store(Request $request)
    {
        return  $this->categoryRepository->createCategory($request);
    }

    //show single category
    public function show($id)
    {
      $category = $this->categoryRepository->showCategory($id);
      return $category;
    }

    //update category
    public function update(Request $request, $id)
    {
        $category = $this->categoryRepository->updateCategory($request, $id);
        return $category;
    }

    //delete category
    public function destroy($id)
    {
        $category = $this->categoryRepository->deleteCategory($id);
        return $category;
    }
}
