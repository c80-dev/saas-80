<?php

namespace App\Repositories\Contracts;

interface PermissionRepositoryInterface 
{
    public function createPermission($request);

    public function allPermissions();

    public function showPermission($id);

    public function updatePermission($request, $id);

    public function deletePermission($id);
}