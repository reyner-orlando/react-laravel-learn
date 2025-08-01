<!DOCTYPE html>
<html>
<head>
    <title>My Laravel App</title>
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>
<body>
    <header class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
        {{-- <a class="navbar-brand" href="/">
            <img src="{{ asset('images/Tempo White RED.png') }}" alt="Logo Perusahaan" class="img-fluid custom-logo-size">
        </a> --}}
        <h1>TO DO LIST</h1>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto"> <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Beranda</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">To-Do-List</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Tambah Tugas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Kontak</a>
                </li>
            </ul>
        </div>
    </div>
</header>

    <div id="app"></div> <!-- React mengontrol ini -->
    <div id="app2"></div> <!-- React mengontrol ini -->

    <footer>
        <p>© 2025 My Footer</p>
    </footer>
</body>
</html>
