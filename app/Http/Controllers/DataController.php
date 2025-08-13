<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peserta;

class DataController extends Controller
{
    public function index(Request $request){
        $perPage = 10;
        $page = $request->get('page', 1);
        return response()->json(Peserta::where('selesai',0)->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page));
    }
    public function done(Request $request){
        $perPage = 10;
        $page = $request->get('page', 1);
        return response()->json(Peserta::where('selesai',1)->paginate($perPage, ['*'], 'page', $page));
    }
}
