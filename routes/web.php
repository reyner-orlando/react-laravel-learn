<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuestbookController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', [GuestbookController::class, 'index'])->name('message.index');

Route::post('/home', [GuestbookController::class, 'store'])->name('message.store');