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
            'abmience',
            'time_occasion',
            'dietary_restriction',
            'thumbnail',
            'kvs_images',
            'points',
            'menu_images',
            'seats_number',
            'min_price',
            'max_price',
            'payment_options',
            'reservation',
            'keywords'
    ];
    protected function casts(): array
    {
        return [
            'menu_images' => 'array',
            'time_occasion' => 'array',
            'kvs_images' => 'array',
            'points' => 'array',
            'payment_options' => 'array',
        ];
    }

}
