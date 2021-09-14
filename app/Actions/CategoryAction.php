<?php

namespace App\Actions;

use App\Models\Category;
use App\Http\Resources\CategoryResource;

class CategoryAction
{

    public $model;

    public function __construct(Category $model)
    {
       $this->model = $model;
    }

    //create user account
    public function create($request)
    {
        $user = $this->model->create([
            'name' => $request->name
        ]);
        if ($user) {
            return response()->json([
                'message' => 'Category created successfully',
            ], 200);
        }else {
           return response()->json([
               'message' => 'Sorry unable to category'
           ], 400);
        }
    }

    //get
    public function all()
    {
      $categories = $this->model->latest()->paginate(20);
      if (count($categories) < 1) {
        return response()->json([
            'message' => 'Sorry no category found'
        ], 400);
      }else {
          return CategoryResource::collection($categories);
      }
    }

    //get
    public function get($id)
    {
      $data = $this->model->where('id', '=', $id)->exists();
      if ($data) {
          $category = $this->model->with(['faqs'])->find($id);
          return new CategoryResource($category);
      }else {
           return response()->json([
               'message' => 'Sorry this data do not exist'
           ], 400);
      }
    }

    //update
    public function update($request, $id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
           $category = $this->model->find($id);
           $update = $category->update([
                'name' =>  empty($request->name) ? $category->name :  $request->name,
           ]);
           if ($update) {
             return response()->json([
                 'message' => 'Category updated successfully'
             ], 200);
           }else {
              return response()->json([
                  'message' => 'Sorry unable to update category'
              ], 400);
           }
        }else {
          return response()->json([
              'message' => 'Sorry this data do not exist'
          ], 404);
        }
    }

    //delete
    public function delete($id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
            $delete =  $this->model->find($id)->delete();
            if ($delete) {
              return response()->json([
                   'message' => 'Category deleted successfully'
               ], 200);
            }else {
               return response()->json([
                   'message' => 'Sorry unable to delete category'
               ], 400);
            }
        }else {
          return response()->json([
              'message' => 'Sorry this data do not exist'
          ], 404);
        }
    }
    
}
