<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Mypage/Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        
        $request->validate([
            'username' => 'required|string|max:255',
            'birth_year' => 'max:4',
        ]);
        //dd(intval($request->birth_year));
        User::where('id', $request->user()->id)->update([
                'username' => $request->username,
                'sex' => $request->sex,
                'birth_year' => intval($request->birth_year),
                'country' => $request->country,
                'type' => $request->type,
            ]);

        return back()->with(['message'=>'Your profile is updated']);
        
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

       // return Redirect::to('/');
       return redirect('/')->with(['message'=>'Your account has been deleted']);
    }
}
