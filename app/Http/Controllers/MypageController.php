<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use App\Models\Bistro;
use App\Models\User;
use App\Models\Bistro_review;


class MypageController extends Controller
{
    public function index(Request $request)
    {
       
        $bistros = [];
        $averageRates = [];
        $wishlist = $request->user()->wishlist;
        //dd($wishlist);
        if($wishlist){
            foreach($wishlist as $key=>$item){
                if(Bistro::where('id', $item)->first()){
                    $bistros[] = Bistro::where('id', $item)->first();
                    $bistro_id = Bistro::where('id', $item)->first('id');
                    $averageRate = Bistro_review::where('bistro_id', $bistro_id->id)->avg('overall_rate');
                    $averageRates[$bistro_id->id] = $averageRate;
                }
                
    
            }
        }


        //dd($averageRates);

        $bistro_reviews = Bistro_review::where('author_id', $request->user()->id)
                        ->join('bistros', 'bistros.id', '=', 'bistro_reviews.bistro_id')
                        ->latest('bistro_reviews.created_at')
                        ->get();


       //dd($bistro_reviews);
        if ($request->user()->hasVerifiedEmail()) {
            return Inertia::render('Mypage/MypageIndex', 
            ['user'=>$request->user(), 'bistros'=>$bistros,
             'bistro_reviews'=>$bistro_reviews, 'averageRates'=>$averageRates
            ]);
        }
         return Inertia::render('Home', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
