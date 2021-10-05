<?php

namespace App\Repositories\Contracts;

interface RoleRepositoryInterface 
{
    public function createRole($request);

    public function allRoles();

    public function showRole($id);

    public function updateRole($request, $id);

    public function attachPermission($request, $id);

    public function detachPermission($request, $id);

    public function deleteRole($id);
}