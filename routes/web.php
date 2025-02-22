<?php

use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['verified'])->name('dashboard');
    Route::resource('users', UserController::class)->except([ 'update', 'destroy']);
    Route::post('users/{user}/update', [UserController::class, 'update'])->name('users.update');
    Route::post('users/{user}/destroy', [UserController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/auth.php';
