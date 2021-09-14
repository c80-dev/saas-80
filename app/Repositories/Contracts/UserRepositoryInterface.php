<?php

namespace App\Repositories\Contracts;

interface UserRepositoryInterface
{
    public function allUsers();

    public function findUser($id);

    public function allAdmin();

    public function createUser($request);

    public function updateUserAcount($request, $id);

    public function changePassword($request, $id);

    public function updateImage($request, $id);

    public function deleteUser($id);
}
