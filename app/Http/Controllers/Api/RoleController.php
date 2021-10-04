<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\Contracts\RoleRepositoryInterface;

class RoleController extends Controller
{
    private $roleRepository;

    public function __construct(RoleRepositoryInterface $roleRepository)
    {
        $this->roleRepository = $roleRepository;
        $this->middleware('auth:api');
    }

    public function index()
    {
        return $this->roleRepository->allRoles();
    }

    public function store(Request $request)
    {
        return $this->roleRepository->createRole($request);
    }

    public function show($id)
    {
        return $this->roleRepository->showRole($id);
    }

    public function update(Request $request, $id)
    {
        return $this->roleRepository->updateRole($request, $id);
    }

    public function attachPermissionToRole(Request $request, $id)
    {
        return $this->roleRepository->attachPermission($request, $id);
    }

    public function destroy($id)
    {
        return $this->roleRepository->deleteRole($id);
    }
}
