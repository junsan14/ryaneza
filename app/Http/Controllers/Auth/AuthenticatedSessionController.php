<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Facades\Gate;//追加

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Home', ['status' => 'login']);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        

        $request->authenticate();
        $request->session()->regenerate();

        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('mypage', absolute: false));
        }
        if (Gate::allows('admin', Auth::user())) {
            return redirect()->intended(route('admin.mypage', absolute: false));
        }
        return back()->with(['message'=>'Logged in']);
        /*
       
       $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect()->intended('dashboard');
        }
    
        return back()->withErrors([
            'email' => 'だめ',
        ])->withInput();
    
       return redirect('/')->with('status',$request->email);
        */
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
        //return Inertia::render('Home');
        return redirect('/')->with(['message'=>'Logged out']);
    }
}
