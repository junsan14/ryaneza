<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bistro_review;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
class ReviewController extends Controller
{
    public function store(Request $request): RedirectResponse
    {  
        //dd($request->howmany);
        Bistro_review::updateOrCreate(
            ['bistro_id'=> $request->bistro_id, 'author_id'=> $request->user()->id],
            [
            'author_id' => $request->user()->id,
            'food_rate' => $request->food_rate,
            'service_rate' => $request->service_rate,
            'ambience_rate' => $request->ambience_rate,
            'value_rate' => $request->value_rate,
            'convenience_rate' => $request->convenience_rate,
            'uniqueness_rate' => $request->uniqueness_rate,
            'overall_rate' => $request->overall_rate,
            'visited_date' => $request->visited_date,
            'situation' => $request->situation,
            'howmany' => $request->howmany,
            'cost' => $request->cost,
            'comment' => $request->comment,
            
        ]);
            if($request->isEdit){
                return back()->with(['message'=>'Your Comment edited']);
            }
            return back()->with(['message'=>'Your Comment created']);
 
            //return redirect('')->with(['message'=>'Your Comment is created']);
        
       
       // return redirect('/')->with(['message'=>$request->name.' is created']);
        //return back()->with(['message'=>$request->name.' is created']);
        
    }
}
