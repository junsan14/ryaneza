<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('mypage', absolute: false));
        }

        $request->user()->sendEmailVerificationNotification();

        //return back()->with('status', 'verification-link-sent');
       // return back()->with('message', 'The Verification link is sent');
        return back()->with(['message'=>'A verification link is sent.']);
    }


}
