<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peserta;

class FormController extends Controller
{
    public function submit(Request $request){
        $validated = $request->validate([
            'nama'=> 'required|string|max:255',
        ]);

        Peserta::create($validated);

        return response()->json(['message' => 'Berhasil Disimpan']);
    }
}
