<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;

class MypageController extends Controller
{
    public function index(Request $request)
    {
       
        if ($request->user()->hasVerifiedEmail()) {
            return Inertia::render('Mypage/MypageIndex');
        }
         return Inertia::render('Home', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
