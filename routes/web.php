<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MypageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\RegisterAdminUserController;
use App\Http\Controllers\Admin\BistroController;
use App\Http\Controllers\ReviewController;

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
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/profile-wishlist', [ProfileController::class, 'updateWishlist'])->name('profile.wishlist.update');

    Route::post('/review-create', [ReviewController::class, 'store'])->name('review.store');

});




require __DIR__.'/auth.php';
require __DIR__.'/admin.php';

