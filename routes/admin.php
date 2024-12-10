<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Admin\BistroController;

/*
Route::middleware('guest')->group(function () {

});
*/
Route::middleware(['auth', 'can:admin', 'verified'])->group(function () {
    

    Route::get('/admin-mypage', function () {
        return Inertia::render('Admin/AdminMypage', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'canRegister' => Route::has('register'),
            'status' => session('status'),
        ]);
    })->name('admin.mypage');

    Route::get('/create-bistro', [BistroController::class, 'create'])->name('bistro.create');
    Route::post('/create-bistro', [BistroController::class, 'store'])->name('bistro.store');
    Route::get('/edit-bistro', [BistroController::class, 'edit'])->name('bistro.edit');
    Route::delete('/delete-bistro', [BistroController::class, 'destroy'])->name('bistro.destroy');
});
