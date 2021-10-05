<?php

namespace App\Actions;

use App\Models\Role;
use App\Http\Resources\RoleResource;

class RoleAction
{

    public $model;

    public function __construct(Role $model)
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
                'message' => 'Role created successfully',
            ], 200);
        }else {
           return response()->json([
               'message' => 'Sorry unable to role'
           ], 400);
        }
    }

    //get
    public function all()
    {
      $roles = $this->model->latest()->paginate(20);
      if (count($roles) < 1) {
        return response()->json([
            'message' => 'Sorry no role found'
        ], 400);
      }else {
          return RoleResource::collection($roles);
      }
    }

    //get
    public function get($id)
    {
      $data = $this->model->where('id', '=', $id)->exists();
      if ($data) {
          $role = $this->model->find($id);
          return new RoleResource($role);
      }else {
           return response()->json([
               'message' => 'Sorry this data do not exist'
           ], 400);
      }
    }

    //attach 
    public function attachPermissionToRole($request, $id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
            $role = $this->model->find($id);
            foreach ($request->permisson_id as $permission) {
                $role->permissions()->attach($permission);
            }
            return response()->json([
                'message' => 'Permission attached to role successfully',
            ], 200);
        }else {
             return response()->json([
                 'message' => 'Sorry this data do not exist'
             ], 400);
        }
    }

    //detach permission to user
    public function detachPermissionFromRole($request, $id)
    {
        $data = $this->model->where('id', '=', $id)->exists();
        if ($data) {
            $role = $this->model->find($id);
            foreach ($request->permisson_id as $permission) {
                $role->permissions()->detach($permission);
            }
            return response()->json([
                'message' => 'Permission detached from role successfully',
            ], 200);
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
           $role = $this->model->find($id);
           $update = $role->update([
                'name' =>  empty($request->name) ? $role->name :  $request->name,
           ]);
           if ($update) {
             return response()->json([
                 'message' => 'Role updated successfully'
             ], 200);
           }else {
              return response()->json([
                  'message' => 'Sorry unable to update role'
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
                   'message' => 'Role deleted successfully'
               ], 200);
            }else {
               return response()->json([
                   'message' => 'Sorry unable to delete role'
               ], 400);
            }
        }else {
          return response()->json([
              'message' => 'Sorry this data do not exist'
          ], 404);
        }
    }
    
}
