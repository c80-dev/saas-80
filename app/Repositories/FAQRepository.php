<?php

namespace App\Repositories;

use App\Actions\FAQAction;
use Illuminate\Support\Facades\Validator;
use App\Repositories\Contracts\FAQRepositoryInterface;

class FAQRepository implements FAQRepositoryInterface
{
    private $action;

    public function __construct(FAQAction $action)
    {
        $this->action = $action;
    }

    //create
    public function createFAQ($request)
    {
        $validator =  Validator::make($request->all(),[
            'title' => 'required',
            'description' => 'required',
            'category_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages()->first()
            ], 422);
        }else {
             return  $this->action->create($request);
        }
    }

    //view all
    public function allFAQs()
    {
        return $this->action->all();
    }

    //show single
    public function showFAQ($id)
    {
      return $this->action->get($id);
    }

    //update
    public function updateFAQ($request, $id)
    {
        $validator =  Validator::make($request->all(),[
            'description' => 'required',
            'category_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages()->first()
            ], 422);
        }else {
             return  $this->action->update($request, $id);
        }
    }

    //delete
    public function deleteFAQ($id)
    {
        return $this->action->delete($id);
    }

}
