<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Contracts\PermissionRepositoryInterface;

class PermissionController extends Controller
{
    private $permissionRepository;

    public function __construct(PermissionRepositoryInterface $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
        $this->middleware('auth:api');
    }

    public function index()
    {
        return $this->permissionRepository->allPermissions();
    }

    public function store(Request $request)
    {
        return $this->permissionRepository->createPermission($request);
    }

    public function show($id)
    {
        return $this->permissionRepository->showPermission($id);
    }

    public function update(Request $request, $id)
    {
        return $this->permissionRepository->updatePermission($request, $id);
    }

    public function destroy($id)
    {
        return $this->permissionRepository->deletePermission($id);
    }
}
