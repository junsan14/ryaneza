<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Bistro;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;

use App\Models\User;
use App\Models\Bistro_review;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\File;

class BistroController extends Controller
{
    public function home(): Response
    {
        $bistros = Bistro::latest('created_at')->get();
        $bistro_ids = Bistro::select('id')->latest('created_at')->get();
        $averageRates = [];
        foreach($bistro_ids as $key=>$bistro_id){
            $averageRate = Bistro_review::where('bistro_id', $bistro_id->id)->avg('overall_rate');
            $averageRates[$bistro_id->id] = $averageRate;
        }
       
        return Inertia::render('Home', ['bistros'=>$bistros, 'averageRates'=>$averageRates]);
        
    }
    public function create(): Response
    {
        return Inertia::render('Admin/CreateBistro');
        
    }
    public function edit(Request $request): Response
    {
        $id = $request->query('id');
        $bistro = Bistro::find([['id','=' , $id]])->first();

        return Inertia::render('Admin/CreateBistro', ['bistro'=>$bistro]);
        
    }
    public function show(Request $request): Response
    {
        $id = $request->query('id');
      
        $bistro = Bistro::find([['id','=' , $id]])->first();
        $bistro_reviews = Bistro_review::where('bistro_id', $id)->join('users', 'users.id', '=', 'bistro_reviews.author_id')
                         ->latest('bistro_reviews.created_at')->get();
      
        //dd($bistro_reviews);
        return Inertia::render('Bistro/Bistro', ['bistro'=>$bistro, 'bistro_reviews'=>$bistro_reviews]);
        
    }
    public function store(Request $request): RedirectResponse
    {
        $manager = new ImageManager(new Driver());
        $now = Carbon::now();
        $time = $now->year."_".$now->month."_".$now->day."_".$now->hour.$now->minute.$now->second;
        $allImages = $request->file();
        $imageArrays = [
            "thumbnail_image"=>$request->thumbnail_image,
            "kv_images"=>$request->kv_images,
            "interior_slides"=>$request->interior_slides,
            "food_slides"=>$request->food_slides,
            "menu_images"=>$request->menu_images
        ];
    
   
        $thumbnail = $request->thumbnail_image;
        $kvs = $request->kv_images;
        $interiors = $request->interior_slides;
        $food = $request->food_slides;
        //dd($allImages);
        if(!empty($allImages)){
            foreach ($allImages as $key => $eachImages) {
                //dd($eachImages);
                foreach($eachImages as $index=>$image){
                     $imageName = $time."_".$request->name."_".$key.$index."."."webp";
                     $img = $manager->read($image['src']);
                    if(!File::exists(storage_path('app/public/images/bistros/'.$request->name))){
                        File::makeDirectory(storage_path('app/public/images/bistros/' . $request->name));
                    }
                    $img->save(storage_path('app/public/images/bistros/'.$request->name."/".$imageName));
                    $path = '/images/bistros/'.$request->name."/".$imageName;
                    $url = Storage::url($path);
                    $imageArrays[$key][$index]['src']=$url;  
                }
            }
            
        }
        //dd($imageArrays["thumbnail_image"]);
        Bistro::updateOrCreate(
            ['id'=> $request->id],
            [
            'author' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'province' => $request->province,
            'district' => $request->district,
            'sector' => $request->sector,
            'address' => $request->address,
            'google_map' => $request->google_map,
            'opening_hour' => $request->opening_hour,
            'mobile' => $request->mobile,
            'email' => $request->email,
            'genre' => $request->genre,
            'style' => $request->style,
            'speciality' => $request->speciality,
            'occasion' => $request->occasion,
            'ambience' => $request->ambience,
            'time_occasion' => $request->time_occasion,
            'dietary_restriction' => $request->dietary_restriction,
            'thumbnail_image' => $imageArrays["thumbnail_image"],
            'kv_images'=>$imageArrays["kv_images"],
            'interior_slides'=>$imageArrays["interior_slides"],
            'food_slides'=>$imageArrays["food_slides"],
            'menu_images'=>$imageArrays["menu_images"],
            'seats_number' => $request->seats_number,
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
            'payment_options' => $request->payment_options,
            'reservation' => $request->reservation,
            'keywords' => $request->keywords,
            
        ]);
        if($request->is_edit){
             return redirect('/')->with(['message'=>$request->name.' editted']);
        }else{
             return redirect('/')->with(['message'=>$request->name.' created']);
        }
       
       // return redirect('/')->with(['message'=>$request->name.' is created']);
        //return back()->with(['message'=>$request->name.' is created']);
        
    }
     public function destroy(Request $request):RedirectResponse
    {
        $id = $request->query('id');

        Bistro::where('id', $id)->delete(); 
        return redirect('/')->with(['message'=>$request->query('name').' deleted']);
        //return back()->with(['message'=>$request->query('name').' is deleted']);
        
       
    }
}
