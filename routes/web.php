<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuestbookController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\DoneButtonController;
use App\Models\Peserta;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home', [GuestbookController::class, 'index'])->name('message.index');

Route::post('/home', [GuestbookController::class, 'store'])->name('message.store');

Route::post('/form-submit', [FormController::class, 'submit']);

Route::get('/data', [DataController::class, 'index']);

Route::post('/done', [DoneButtonController::class, 'done']);

Route::get('/peserta', function (Request $request) {
    $perPage = 10;
    $page = $request->get('page', 1);

    $data = Peserta::paginate($perPage, ['*'], 'page', $page);

    return response()->json($data);
});
Route::get('/peserta/done', function (Request $request) {
    $perPage = 10;
    $page = $request->get('page', 1);

    $data = Peserta::where('selesai',1)->paginate($perPage, ['*'], 'page', $page);

    return response()->json($data);
});