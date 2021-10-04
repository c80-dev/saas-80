<?php

namespace App\Repositories;

use App\Repositories\Contracts\PermissionRepositoryInterface;
use App\Actions\PermissionAction;
use Illuminate\Support\Facades\Validator;

class PermissionRepository implements PermissionRepositoryInterface
{
    public $action;

    public function __construct(PermissionAction $action)
    {
        $this->action = $action;
    }

    //create Permission
    public function createPermission($request)
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
    public function allPermissions()
    {
        return $this->action->all();
    }

    //show single Permission
    public function showPermission($id)
    {
        return $this->action->get($id);
    }

    //update Permission
    public function updatePermission($request, $id)
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

    //delete Permission
    public function deletePermission($id)
    {
        return $this->action->delete($id);
    }
}
