<?php

namespace App\Http\Controllers;
use App\Models\Message;


use Illuminate\Http\Request;

class GuestbookController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'name' => 'required|max:255',
            'message' => 'required|string',
        ]);

        Message::create([
            'name' => $request->name,
            'message' => $request->message,
        ]);
        return redirect()->back()->with('success', 'Pesan berhasil disimpan!');
    }

    public function index(){
        $messages = Message::orderBy('created_at', 'desc')->get();
        return view('home', compact('messages'));

    }
}
