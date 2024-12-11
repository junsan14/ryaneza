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


class BistroController extends Controller
{
    public function home(): Response
    {
        $bistros = Bistro::latest('created_at')->get();
        return Inertia::render('Home', ['bistros'=>$bistros]);
        
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
        
        return Inertia::render('Bistro/Bistro', ['bistro'=>$bistro]);
        
    }
    public function store(Request $request): Response
    {  
        $now = Carbon::now();
        $time = $now->year."_".$now->month."_".$now->day."_".$now->hour.$now->minute.$now->second;
        $images = $request->file();
        $thumbnailPath = "";
        $kvsPath = $request->kvs_images;
        $pointsPath = $request->points;
        $menusPath = $request->menu_images;
        if(!empty($images)){
            foreach ($images as $key=>$image) {
                if($key === "thumbnail"){
                    $imageName = $time."_".$request->name."_".$key.".".$image->getClientOriginalExtension();
                    $path = $image->storeAs('images',$imageName, 'public');
                    $url = Storage::url($path);
                    $thumbnailPath= $url;
                }elseif($key === "kvs"){
                    foreach($image as $key=>$kv){
                        $imageName = $time."_".$request->name."_".$key.".".$kv->getClientOriginalExtension();
                        $path = $kv->storeAs('images',$imageName, 'public');
                        $url = Storage::url($path);
                        $kvsPath[$key] = $url ;
                    }
              
                }elseif($key === "points"){
                    foreach($image as $key=>$point){          
                    
                        $imageName = $time."_".$request->name."_point".$key.".".$point['image']->getClientOriginalExtension();
                        $path = $point['image']->storeAs('images',$imageName, 'public');
                        $url = Storage::url($path);
        
                        foreach($pointsPath as $i=>$pointPath){
                            if($pointPath['id'] === 'point'.($key+1) ){    
                                $pointsPath[$i]['image'] = $url;
                            }
                        }  
                    }
                }
                elseif($key === "menu_images"){
                    //dd($key);
                    foreach($image as $key=>$menu_image){          
                    
                        $imageName = $time."_".$request->name."_point".$key.".".$menu_image['image']->getClientOriginalExtension();
                        $path = $menu_image['image']->storeAs('images',$imageName, 'public');
                        $url = Storage::url($path);
                        foreach($menusPath as $i=>$menuPath){
                             //dd($menusPath);
                            if($menuPath['id'] === 'menu_image'.($key+1) ){    
                                $menusPath[$i]['image'] = $url;
                            }
                        } 
                    }
                }
            }
        }
        
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
            'thumbnail' => $thumbnailPath?$thumbnailPath:$request->thumbnail,
            'kvs_images'=>$kvsPath,
            'points'=>!empty($pointsPath)?$pointsPath:$request->points,
            'menu_images'=>$menusPath,
            'seats_number' => $request->seats_number,
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
            'payment_options' => $request->payment_options,
            'reservation' => $request->reservation,
            'keywords' => $request->keywords,
            
        ]);
        if($request->is_edit){
             return Inertia::render('Home', ['message'=>$request->name.' is editted']);
             //return back()->with(['message'=>$request->name.' is editted']);
        }else{
             return Inertia::render('Home', ['message'=>$request->name.' is created']);
        }
       
       // return redirect('/')->with(['message'=>$request->name.' is created']);
        //return back()->with(['message'=>$request->name.' is created']);
        
    }
     public function destroy(Request $request)
    {
        
        $id = $request->query('id');

        Bistro::where('id', $id)->delete(); 
        return back();
        
       
    }
}
