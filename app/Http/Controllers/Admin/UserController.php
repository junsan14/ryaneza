<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

use App\Models\User;


class UserController extends Controller
{
    public function show(): Response
    {
       // $id = $request->query('id');
        $users = User::get();
        
        return Inertia::render('Admin/EditUsers', ['users'=>$users]);
        
    }
    public function update(Request $request): RedirectResponse
    {
       //dd($request->username);
    
       //dd($user->username);
        $now = Carbon::now();
        $user = Auth::user();
        $editUser = $request->id;
        $request->validate([
            'username' =>[
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($user->id)->ignore($editUser),
            ],
            'birth_year' => 'max:4',
        ]);



       //dd($request);
        //dd(intval($request->birth_year));
        User::where('id', $request->id)->update([
                'admin' => $request->admin,
                'username' => $request->username,
                'gender' => $request->gender,
                'birth_year' => intval($request->birth_year),
                'country' => $request->country,
                'email_verified_at' => $now,
                'locality_type' => $request->locality_type,
            ]);

        return back()->with(['message'=>$request->username."'s profile updated"]);
        
    }
    public function destroy(Request $request): RedirectResponse
    {
   
        $id =$request->query('id');
        $user = User::where('id',$id)->first();

        //Auth::logout();

        $user->delete();

        //$request->session()->invalidate();
        //$request->session()->regenerateToken();

       // return Redirect::to('/');
       return back()->with(['message'=>$request->query('username').' deleted']);
    }


}
