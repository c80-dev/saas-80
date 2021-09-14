<?php

namespace App\Repositories\Contracts;

interface SubscriberRepositoryInterface
{
    public function createSubscriber($request);

    public function allSubscribers();

    public function showSubscriber($id);

    public function active();

    public function inactive();

    public function changeSubscriptionPlan($request, $id);

    public function deActivateSubscriber($id);

    public function activateSubscriber($id);

    public function deleteSubscriber($id);
}
