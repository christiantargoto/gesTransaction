@extends('layouts.app')

@section('content')
    <h1 class="mb-4">Liste des clients</h1>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <a href="{{ route('clients.create') }}" class="btn btn-primary mb-3">Ajouter un client</a>

    <table class="table table-bordered table-hover">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Numéro de compte</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($clients as $client)
                <tr>
                    <td>{{ $client->id }}</td>
                    <td>{{ $client->nom }}</td>
                    <td>{{ $client->numero_compte }}</td>
                    <td>
                        <a href="{{ route('clients.edit', $client) }}" class="btn btn-warning btn-sm">Modifier</a>
                        
                        <form action="{{ route('clients.destroy', $client) }}" method="POST" class="d-inline"
                              onsubmit="return confirm('Supprimer ce client ?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm">Supprimer</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
