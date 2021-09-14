<?php

namespace App\Repositories\Contracts;

interface CategoryRepositoryInterface 
{
    public function createCategory($request);

    public function allCategories();

    public function showCategory($id);

    public function updateCategory($request, $id);

    public function deleteCategory($id);
}