<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bistro extends Model
{
    protected $fillable = [
            'author',
            'name',
            'description',
            'province',
            'district',
            'address',
            'google_map',
            'opening_hour',
            'mobile',
            'email',
            'genre',
            'style',
            'speciality',
            'occasion',
            'time_occasion',
            'dietary_restriction',
            'thumbnail',
            'kvs',
            'points',
            'min_price',
            'max_price',
            'payment_options',
            'reservation',
            'keywords'
    ];
    protected function casts(): array
    {
        return [
            'time_occasion' => 'array',
            'kvs' => 'array',
            'points' => 'array',
            'payment_options' => 'array',
        ];
    }

}
