<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peserta;

class DataController extends Controller
{
    public function index(){
        return response()->json(Peserta::paginate(10));
    }
    public function done(){
        return response()->json(Peserta::where('selesai',1)->paginate(10));
    }
}
