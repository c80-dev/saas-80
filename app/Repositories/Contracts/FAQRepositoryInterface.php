<?php

namespace App\Repositories\Contracts;

interface FAQRepositoryInterface 
{
    public function createFAQ($request);

    public function allFAQs();

    public function showFAQ($id);

    public function updateFAQ($request, $id);

    public function deleteFAQ($id);
}