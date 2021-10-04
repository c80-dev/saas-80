<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Permission extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'name', 'slug'
    ];

    public function roles() {
        return $this->belongsToMany(Role::class,'roles_permissions');  
    }
     
    public function users() {
        return $this->belongsToMany(User::class,'users_permissions');  
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
