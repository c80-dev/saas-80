<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api', 'prefix' => 'v0.01'], function ($router) {

       Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'login']);

        Route::post('/forgot-password', [App\Http\Controllers\Api\ResetPasswordController::class, 'send'])->name('password.update');
            Route::post('/reset-password', [App\Http\Controllers\Api\ResetPasswordController::class, 'reset'])->name('password.update');
        Route::post('/verify-account', [App\Http\Controllers\Api\EmailVerificationController::class, 'verify']);

        Route::group(['middleware' => ['jwt.verify']], function() {

            //roles for user
            Route::group(['middleware' => 'role:admin'], function() {
             
            });

            // roles for super admin
            Route::group(['middleware' => 'role:superadmin'], function() {


                 //categories routes
                 Route::get('/categories', [App\Http\Controllers\Api\CategoryController::class, 'index']);
                    Route::get('/categories/{id}', [App\Http\Controllers\Api\CategoryController::class, 'show']);
                    Route::post('/categories', [App\Http\Controllers\Api\CategoryController::class, 'store']);
                    Route::patch('/categories/{id}', [App\Http\Controllers\Api\CategoryController::class, 'update']);
                    Route::delete('/categories/{id}', [App\Http\Controllers\Api\CategoryController::class, 'destroy']);

                Route::post('/create-account', [App\Http\Controllers\Api\UserController::class, 'createUser']);

                Route::post('/logout', [App\Http\Controllers\Api\AuthController::class, 'logout']);
                    Route::post('/refresh', [App\Http\Controllers\Api\AuthController::class, 'refresh']);
                    Route::get('/user-profile', [App\Http\Controllers\Api\AuthController::class, 'userProfile']);
                    Route::patch('/change-password/{id}', [App\Http\Controllers\Api\UserController::class, 'changePassword']);
                    Route::patch('/update-profile/{id}', [App\Http\Controllers\Api\UserController::class, 'updateUserAccount']);
                    Route::post('/profile-image/{id}', [App\Http\Controllers\Api\UserController::class, 'updateImage']);


                Route::get('/plans', [App\Http\Controllers\Api\PlanController::class, 'index']);
                    Route::get('/plans/{id}', [App\Http\Controllers\Api\PlanController::class, 'show']);
                    Route::get('/plan-subscribers/{id}', [App\Http\Controllers\Api\PlanController::class, 'getSinglePlanSubscribers']);

                Route::get('/transactions', [App\Http\Controllers\Api\TransactionController::class, 'index']);
                    Route::get('/transactions/{id}', [App\Http\Controllers\Api\TransactionController::class, 'show']);
                    Route::delete('/transactions/{id}', [App\Http\Controllers\Api\TransactionController::class, 'destroy']);

                Route::get('/subscribers', [App\Http\Controllers\Api\SubscriberController::class, 'index']);
                    Route::post('/subscribers', [App\Http\Controllers\Api\SubscriberController::class, 'store']);
                    Route::get('/subscribers/{id}', [App\Http\Controllers\Api\SubscriberController::class, 'show']);

                Route::get('/faqs', [App\Http\Controllers\Api\FAQController::class, 'index']);
                    Route::get('/faqs/{id}', [App\Http\Controllers\Api\FAQController::class, 'show']);

                Route::get('/verify/{id}',  [App\Helpers\Payment::class, 'verify']);

                Route::post('/faqs', [App\Http\Controllers\Api\FAQController::class, 'store']);
                    Route::patch('/faqs/{id}', [App\Http\Controllers\Api\FAQController::class, 'update']);
                    Route::delete('/faqs/{id}', [App\Http\Controllers\Api\FAQController::class, 'destroy']);

                //roles routes
                Route::get('/roles', [App\Http\Controllers\Api\RoleController::class, 'index']);
                    Route::get('/roles/{id}', [App\Http\Controllers\Api\RoleController::class, 'show']);
                    Route::post('/roles', [App\Http\Controllers\Api\RoleController::class, 'store']);
                    Route::patch('/roles/{id}', [App\Http\Controllers\Api\RoleController::class, 'update']);
                    Route::patch('/roles-permission/{id}', [App\Http\Controllers\Api\RoleController::class, 'attachPermissionToRole']);
                    Route::delete('/roles/{id}', [App\Http\Controllers\Api\RoleController::class, 'destroy']);

                 //permissons routes
                Route::get('/permissions', [App\Http\Controllers\Api\PermissionController::class, 'index']);
                    Route::get('/permissions/{id}', [App\Http\Controllers\Api\PermissionController::class, 'show']);
                    Route::post('/permissions', [App\Http\Controllers\Api\PermissionController::class, 'store']);
                    Route::patch('/permissions/{id}', [App\Http\Controllers\Api\PermissionController::class, 'update']);
                    Route::delete('/permissions/{id}', [App\Http\Controllers\Api\PermissionController::class, 'destroy']);

                Route::get('/tickets', [App\Http\Controllers\Api\TicketController::class, 'allTickets']);
                    Route::get('/tickets/{id}', [App\Http\Controllers\Api\TicketController::class, 'getTickets']);
                    Route::patch('/tickets/{id}', [App\Http\Controllers\Api\TicketController::class, 'replyTicket']);

                Route::get('/users', [App\Http\Controllers\Api\UserController::class, 'index']);
                    Route::get('/users/{id}', [App\Http\Controllers\Api\UserController::class, 'show']);

                Route::delete('/subscribers/{id}', [App\Http\Controllers\Api\SubscriberController::class, 'destroy']);
                Route::get('/deactivate-subscribers/{id}', [App\Http\Controllers\Api\SubscriberController::class, 'deActivateSubscriber']);
                    Route::get('/activate-subscribers/{id}', [App\Http\Controllers\Api\SubscriberController::class, 'ActivateSubscriber']);
                    Route::patch('/change-plans/{id}', [App\Http\Controllers\Api\SubscriberController::class, 'changeSubscriberPlan']);

                //admins
                Route::get('/admins', [App\Http\Controllers\Api\UserController::class, 'adminIndex']);

                Route::post('/plans', [App\Http\Controllers\Api\PlanController::class, 'store']);
                    Route::patch('/plans/{id}', [App\Http\Controllers\Api\PlanController::class, 'update']);
                    Route::delete('/plans/{id}', [App\Http\Controllers\Api\PlanController::class, 'destroy']);

                Route::delete('/delete-user/{id}', [App\Http\Controllers\Api\UserController::class, 'delete']);
             
            });

        });

});
