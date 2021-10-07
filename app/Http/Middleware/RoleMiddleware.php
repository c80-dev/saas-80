<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role, $permission = null)
    {
        if ($request->user()->hasRole('superadmin')) {
            return $next($request);
        }else {
            if(!$request->user()->hasRole($role)) {
                return response()->json([
                    'message' => 'Sorry you are not allowed to access this page'
                ], 400);
            }
        }
       
        if($permission !== null && !$request->user()->can($permission)) {
              abort(404);
        }

        return $next($request);
    }
}
