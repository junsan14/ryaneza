<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class EmailController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        
        $validated = $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'current_password'],
        ]);
   
        /*
        $user->update([
            'email' => ($validated['email']),
            //'email_verified_at' => null,
        ]);
        */
       //dd($request->user());
        User::where('id', $request->user()->id)->update([
                'email' => ($validated['email']),
                'email_verified_at' => null,
            ]);
        $user =  User::where('id', $request->user()->id)->first();

        $user->sendEmailVerificationNotification();
        return back()->with(['message'=>'A verification link is sent']);

        

        
      
    }
}
