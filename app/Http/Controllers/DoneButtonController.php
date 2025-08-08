<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peserta;

class DoneButtonController extends Controller
{
    public function done(Request $request){
        $id = $request->input('id');
        $peserta = Peserta::findorFail($id);
        $peserta->selesai = 1;
        $peserta->save();

        return response()->json(['success' => true]);
    }
}
