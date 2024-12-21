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
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\File;

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
        $manager = new ImageManager(new Driver());
        $now = Carbon::now();
        $time = $now->year."_".$now->month."_".$now->day."_".$now->hour.$now->minute.$now->second;
        $images = $request->file();
        $iconUrl = "";
       // dd($request);
        $request->validate([
            'username' =>[
                'required',
                'string',
                'max:255',
                'unique:users,username,'.Auth::user()->username.',username'
            ],

            'intro' => 'max:200',
            'birth_year' => 'max:4',
        ]);
        if(!empty($images)){
                //dd($images);
                //$imageName = $time."_".$request->username.".".$images['icon']->getClientOriginalExtension();
                $imageName = $time."_".$request->username.".webp";
                $img = $manager->read($images['icon']);
                $img->save(storage_path('app/public/images/usericon/'."/".$imageName));

                //$path = $images['icon']->storeAs('images/profileicon',$imageName, 'public');
                $path = '/images/usericon/'."/".$imageName;
                $iconUrl = Storage::url($path);            
        }
        
       


   
        if(empty($request->icon)){
            $iconUrl = $request->color_code;
        }
        User::where('id', $request->user()->id)->update([
                'icon' => $iconUrl?$iconUrl:$request->icon,
                'intro' => $request->intro?$request->intro:"I enjoy exploring local flavors, hidden gems, and popular spots to find meals that leave a lasting impression. Let’s share our favorite food discoveries and inspire each other’s culinary journeys!",
                'username' => $request->username,
                'gender' => $request->gender,
                'birth_year' => intval($request->birth_year),
                'country' => $request->country,
                'locality_type' => $request->locality_type,
            ]);

        return back()->with(['message'=>'Your profile updated']);
        
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
       return redirect('/')->with(['message'=>'Your account deleted']);
    }

    //Update user wishlist
    public function updateWishlist(Request $request): RedirectResponse
    {
       
        //dd($request->query('wishlist'));
        User::where('id', $request->user()->id)->update([
                'wishlist' => $request->query('wishlist'),

            ]);

        return back();
        
    }
}
