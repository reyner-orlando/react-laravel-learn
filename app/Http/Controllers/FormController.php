<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peserta;

class FormController extends Controller
{
    public function submit(Request $request){
        $validated = $request->validate([
            'nama'=> 'required|string|max:255',
            'deskripsi'=> 'required|string',
            'waktu_tenggat'=> 'nullable|date',
        ]);

        Peserta::create([
            'nama' => $validated['nama'], // 👈 simpan ke kolom 'nama'
            'deskripsi' => $validated['deskripsi'], 
            'waktu_tenggat' => $validated['waktu_tenggat'], 
        ]);

        return response()->json(['message' => 'Berhasil Disimpan']);
    }
}
