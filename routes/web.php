<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MypageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\RegisterAdminUserController;
use App\Http\Controllers\Admin\BistroController;

/*
Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'status' => session('status'),
    ]);
})->name('home');
*/
Route::get('/',[BistroController::class, 'home'])->name('home');
Route::get('/about', function () {return Inertia::render('About');})->name('about');

Route::get('/bistro',[BistroController::class, 'show'])->name('show.bistro');

/*
Route::get('/mypage', function () {
    return Inertia::render('Mypage/mypage');
})->middleware(['auth', 'verified'])->name('mypage');
*/


Route::middleware('auth')->group(function () {

    Route::get('/mypage', [MypageController::class, 'index'])->name('mypage');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//Adimin
Route::get('admin-register', [RegisterAdminUserController::class, 'create'])
        ->name('admin.register');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';

