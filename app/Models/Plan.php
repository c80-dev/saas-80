<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Plan extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'name', 'description', 'duration', 'cost', 'slug', 'properties'
    ];

    public function subscribers() {
      return $this->hasMany(Subscriber::class);
    }

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }

    protected $casts = [
        'properties' => 'array'
    ];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

}
