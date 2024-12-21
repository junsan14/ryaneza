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
            'ambience',
            'time_occasion',
            'dietary_restriction',
            'thumbnail_image',
            'kv_images',
            'interior_slides',
            'food_slides',
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
            'ambience' =>'array',
            'speciality' =>'array',
            'occasion' =>'array',
            'google_map' => 'array',
            'thumbnail_image' => 'array',
            'menu_images' => 'array',
            'time_occasion' => 'array',
            'kv_images' => 'array',
            'interior_slides' => 'array',
            'food_slides' => 'array',
            'payment_options' => 'array',
        ];
    }

}
