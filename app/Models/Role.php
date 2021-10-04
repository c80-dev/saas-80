<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Role extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'name', 'slug'
    ];

    public function permissions() {
        return $this->belongsToMany(Permission::class,'roles_permissions');   
    }
     
    public function users() {
       return $this->belongsToMany(User::class,'users_roles');   
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
