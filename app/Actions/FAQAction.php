<?php

namespace App\Actions;

use App\Models\FAQ;
use App\Http\Resources\FAQResource;
use \Cviebrock\EloquentSluggable\Services\SlugService;

class FAQAction
{

    public $model;

    public function __construct(FAQ $model)
    {
       $this->model = $model;
    }

    //create user account
    public function create($request)
    {
        $user = $this->model->create([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'slug' => SlugService::createSlug($this->model, 'slug', $request->title)
        ]);
        if ($user) {
            return response()->json([
                'message' => 'FAQ created successfully',
            ], 200);
        }else {
           return response()->json([
               'message' => 'Sorry unable to faq'
           ], 400);
        }
    }

    //get
    public function all()
    {
      $faqs = $this->model->with(['category'])->latest()->paginate(20);
      if (count($faqs) < 1) {
        return response()->json([
            'message' => 'Sorry no faq found'
        ], 400);
      }else {
          return FAQResource::collection($faqs);
      }
    }

    //get
    public function get($id)
    {
      $data = $this->model->where('id', '=', $id)->exists();
      if ($data) {
          $faq = $this->model->with(['category'])->find($id);
          return new FAQResource($faq);
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
           $faq = $this->model->find($id);
           $faq->slug = null;
           $update = $faq->update([
                'title' =>  empty($request->title) ? $faq->title :  $request->title,
                'description' =>  empty($request->description) ? $faq->description : $request->description,
                'category_id' =>  empty($request->category_id) ? $faq->category_id : $request->category_id
           ]);
           if ($update) {
             return response()->json([
                 'message' => 'FAQ updated successfully'
             ], 200);
           }else {
              return response()->json([
                  'message' => 'Sorry unable to update faq'
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
                   'message' => 'FAQ deleted successfully'
               ], 200);
            }else {
               return response()->json([
                   'message' => 'Sorry unable to delete faq'
               ], 400);
            }
        }else {
          return response()->json([
              'message' => 'Sorry this data do not exist'
          ], 404);
        }
    }
}
