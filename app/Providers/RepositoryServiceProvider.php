<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
    */
    public function register()
    {
        //auth repository binding
        $this->app->bind(
            \App\Repositories\Contracts\AuthRepositoryInterface::class,
            \App\Repositories\AuthRepository::class
        );

        //email verification repository binding
        $this->app->bind(
            \App\Repositories\Contracts\EmailVerificationRepositoryInterface::class,
            \App\Repositories\EmailVerificationRepository::class
        );

        //password rest repository binding
        $this->app->bind(
            \App\Repositories\Contracts\ResetPasswordRepositoryInterface::class,
            \App\Repositories\ResetPasswordRepository::class
        );

        //plan repository binding
        $this->app->bind(
            \App\Repositories\Contracts\PlanRepositoryInterface::class,
            \App\Repositories\PlanRepository::class
        );

        //subscriber repository binding
        $this->app->bind(
            \App\Repositories\Contracts\SubscriberRepositoryInterface::class,
            \App\Repositories\SubscriberRepository::class
        );

        //user repository binding
        $this->app->bind(
            \App\Repositories\Contracts\UserRepositoryInterface::class,
            \App\Repositories\UserRepository::class
        );

        //faq repository binding
        $this->app->bind(
            \App\Repositories\Contracts\FAQRepositoryInterface::class,
            \App\Repositories\FAQRepository::class
        );

        //category repository binding
        $this->app->bind(
            \App\Repositories\Contracts\CategoryRepositoryInterface::class,
            \App\Repositories\CategoryRepository::class
        );

        //permission repository binding
        $this->app->bind(
            \App\Repositories\Contracts\PermissionRepositoryInterface::class,
            \App\Repositories\PermissionRepository::class
        );

        //role repository binding
        $this->app->bind(
            \App\Repositories\Contracts\RoleRepositoryInterface::class,
            \App\Repositories\RoleRepository::class
        );

    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
