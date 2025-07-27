@extends('layouts.app')
@section('content')
    <form action="{{ route('message.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="name">Nama:</label>
            <input type="text" name="name" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="message">Pesan:</label>
            <textarea name="message" class="form-control" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Kirim</button>
    </form>

    <hr>

    <h3>Pesan Tamu:</h3>
    @foreach($messages as $msg)
        <div class="card mb-2">
            <div class="card-body">
                <strong>{{ $msg->name }}</strong><br>
                {{ $msg->message }}
                <div class="text-muted small">{{ $msg->created_at->diffForHumans() }}</div>
            </div>
        </div>
    @endforeach
@endsection