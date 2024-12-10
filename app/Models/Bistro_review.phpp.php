<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bistro_review.phpp extends Model
{
    protected $fillable = [
            'bistro_id',
            'situation',
            'rate',
            'visited',
            'comment',
            'picuture01',
            'picuture02',
            'picuture03',
            'picuture04',
           
    ];
}
