<?php

namespace App\Actions;

use App\Models\Permission;
use App\Http\Resources\PermissionResource;

class PermissionAction
{

    public $model;

    public function __construct(Permission $model)
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
                'message' => 'Permission created successfully',
            ], 200);
        }else {
           return response()->json([
               'message' => 'Sorry unable to permission'
           ], 400);
        }
    }

    //get
    public function all()
    {
      $permissions = $this->model->latest()->paginate(20);
      if (count($permissions) < 1) {
        return response()->json([
            'message' => 'Sorry no permission found'
        ], 400);
      }else {
          return PermissionResource::collection($permissions);
      }
    }

    //get
    public function get($id)
    {
      $data = $this->model->where('id', '=', $id)->exists();
      if ($data) {
          $permission = $this->model->with(['faqs'])->find($id);
          return new PermissionResource($permission);
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
           $permission = $this->model->find($id);
           $update = $permission->update([
                'name' =>  empty($request->name) ? $permission->name :  $request->name,
           ]);
           if ($update) {
             return response()->json([
                 'message' => 'Permission updated successfully'
             ], 200);
           }else {
              return response()->json([
                  'message' => 'Sorry unable to update permission'
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
                   'message' => 'Permission deleted successfully'
               ], 200);
            }else {
               return response()->json([
                   'message' => 'Sorry unable to delete permission'
               ], 400);
            }
        }else {
          return response()->json([
              'message' => 'Sorry this data do not exist'
          ], 404);
        }
    }
    
}
