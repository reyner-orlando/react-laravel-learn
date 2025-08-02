<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peserta;

class FormController extends Controller
{
    public function submit(Request $request){
        $validated = $request->validate([
            'title'=> 'required|string|max:255',
            'desc'=> 'required|string',
            'waktutenggat'=> 'nullable|date',
        ]);

        Peserta::create([
            'nama' => $validated['title'], // 👈 simpan ke kolom 'nama'
            'deskripsi' => $validated['desc'], 
            'waktu_tenggat' => $validated['waktutenggat'], 
        ]);

        return response()->json(['message' => 'Berhasil Disimpan']);
    }
}
