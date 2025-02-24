<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
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

    Route::middleware(['admin'])->group(function () {
        Route::resource('users', UserController::class)->except(['update', 'destroy']);
        Route::get('users/archive/data', [UserController::class, 'archive'])->name('users.archive');
        Route::get('users/bin/data', [UserController::class, 'bin'])->name('users.bin');
        Route::post('users/{user}/update', [UserController::class, 'update'])->name('users.update');
        Route::post('users/{user}/destroy', [UserController::class, 'destroy'])->name('users.destroy');
        Route::post('users/{user}/moveArchive', [UserController::class, 'moveArchive'])->name('users.moveArchive');
        Route::post('users/{user}/restoreArchive', [UserController::class, 'restoreArchive'])->name('users.restoreArchive');
        Route::post('users/{id}/restore', [UserController::class, 'restore'])->name('users.restore');
        Route::post('users/{id}/forceDelete', [UserController::class, 'forceDelete'])->name('users.forceDelete');

        Route::resource('teachers', TeacherController::class)->except(['update', 'destroy']);
        Route::get('teachers/archive/data', [TeacherController::class, 'archive'])->name('teachers.archive');
        Route::get('teachers/bin/data', [TeacherController::class, 'bin'])->name('teachers.bin');
        Route::post('teachers/{teacher}/update', [TeacherController::class, 'update'])->name('teachers.update');
        Route::post('teachers/{teacher}/destroy', [TeacherController::class, 'destroy'])->name('teachers.destroy');
        Route::post('teachers/{teacher}/moveArchive', [TeacherController::class, 'moveArchive'])->name('teachers.moveArchive');
        Route::post('teachers/{teacher}/restoreArchive', [TeacherController::class, 'restoreArchive'])->name('teachers.restoreArchive');
        Route::post('teachers/{id}/restore', [TeacherController::class, 'restore'])->name('teachers.restore');
        Route::post('teachers/{id}/forceDelete', [TeacherController::class, 'forceDelete'])->name('teachers.forceDelete');

        Route::resource('students', StudentController::class)->except(['update', 'destroy']);
        Route::get('students/archive/data', [StudentController::class, 'archive'])->name('students.archive');
        Route::get('students/bin/data', [StudentController::class, 'bin'])->name('students.bin');
        Route::post('students/{student}/update', [StudentController::class, 'update'])->name('students.update');
        Route::post('students/{student}/destroy', [StudentController::class, 'destroy'])->name('students.destroy');
        Route::post('students/{student}/moveArchive', [StudentController::class, 'moveArchive'])->name('students.moveArchive');
        Route::post('students/{student}/restoreArchive', [StudentController::class, 'restoreArchive'])->name('students.restoreArchive');
        Route::post('students/{id}/restore', [StudentController::class, 'restore'])->name('students.restore');
        Route::post('students/{id}/forceDelete', [StudentController::class, 'forceDelete'])->name('students.forceDelete');
    });

});

require __DIR__.'/auth.php';
