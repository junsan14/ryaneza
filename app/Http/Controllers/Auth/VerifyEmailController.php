<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        //dd($request->user()->markEmailAsVerified());
        if ($request->user()->hasVerifiedEmail()) {
            return redirect('/')->with(['message'=>'Your email already verified']);
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        //return Inertia::render('Mypage/MypageIndex', ['message'=>'Your email is verified']);
        return redirect('/')->with(['message'=>'Your email verified']);
        //redirect('/')->with(['message'=>'Your email is verified']);;
    }
}
