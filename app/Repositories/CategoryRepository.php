<?php

namespace App\Repositories;

use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Actions\CategoryAction;
use Illuminate\Support\Facades\Validator;

class CategoryRepository implements CategoryRepositoryInterface
{
    public $action;

    public function __construct(CategoryAction $action)
    {
        $this->action = $action;
    }

    //create category
    public function createCategory($request)
    {
        $validator =  Validator::make($request->all(),[
           'name' => 'required',
        ]);

        if ($validator->fails()) {
              return response()->json([
                  'message' => $validator->messages()->first()
              ], 422);
         }else {
            return $this->action->create($request);
         }
    }

    //show all categories
    public function allCategories()
    {
        return $this->action->all();
    }

    //show single category
    public function showCategory($id)
    {
        return $this->action->get($id);
    }

    //update category
    public function updateCategory($request, $id)
    {
        $validator =  Validator::make($request->all(),[
           'name' => 'required'
        ]);
        if ($validator->fails()) {
              return response()->json([
                  'message' => $validator->messages()->first()
              ], 422);
         }else {
              return $this->action->update($request, $id);
        }
    }

    //delete category
    public function deleteCategory($id)
    {
        return $this->action->delete($id);
    }
}
