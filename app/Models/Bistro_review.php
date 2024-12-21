<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bistro_review extends Model
{


    protected $fillable = [
        'author_id',
        'bistro_id',
        'situation',
        'food_rate',
        'service_rate',
        'ambience_rate',
        'value_rate',
        'convenience_rate',
        'uniqueness_rate',
        'overall_rate',
        'visited_date',
        'cost',
        'howmany',
        'comment',
    ];

}
