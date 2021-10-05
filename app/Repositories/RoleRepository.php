<?php

namespace App\Repositories;

use App\Repositories\Contracts\RoleRepositoryInterface;
use App\Actions\RoleAction;
use Illuminate\Support\Facades\Validator;

class RoleRepository implements RoleRepositoryInterface
{
    public $action;

    public function __construct(RoleAction $action)
    {
        $this->action = $action;
    }

    //create Role
    public function createRole($request)
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

    //all
    public function allRoles()
    {
        return $this->action->all();
    }

    //attach permission
    public function attachPermission($request, $id)
    {
        $validator =  Validator::make($request->all(),[
            'permisson_id' => 'required|array',
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages()->first()
            ], 422);
        }else {
             return $this->action->attachPermissionToRole($request, $id);
        }
    }

    //detach permission
    public function detachPermission($request, $id)
    {
        $validator =  Validator::make($request->all(),[
            'permisson_id' => 'required|array',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages()->first()
            ], 422);
        }else {
             return $this->action->detachPermissionFromRole($request, $id);
        }
    }

    //show single Role
    public function showRole($id)
    {
        return $this->action->get($id);
    }

    //update Role
    public function updateRole($request, $id)
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

    //delete Role
    public function deleteRole($id)
    {
        return $this->action->delete($id);
    }
}
