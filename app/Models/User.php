<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Traits\UsesUuid;
use Illuminate\Database\Eloquent\SoftDeletes;
use Cviebrock\EloquentSluggable\Sluggable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Traits\HasPermissionsTrait;

class User extends Authenticatable implements  MustVerifyEmail, JWTSubject
{
    use HasFactory, Notifiable, UsesUuid, SoftDeletes, Sluggable, HasPermissionsTrait;

    protected $fillable = ['name','email','password','phone','facebook','twitter','linkedin','image_path','slug', 'is_subscribed'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function subscribers() {
        return $this->hasOne(Subscriber::class);
    }

    public function logs() {
        return $this->hasMany(Log::class);
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

}
