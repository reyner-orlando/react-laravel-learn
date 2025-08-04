<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peserta;

class DataController extends Controller
{
    public function index(){
        return response()->json(Peserta::all());
    }
}
