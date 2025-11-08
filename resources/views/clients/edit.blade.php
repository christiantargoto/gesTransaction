@extends('layouts.app')

@section('content')
    <h1>Modifier le client</h1>

    <form action="{{ route('clients.update', $client) }}" method="POST" class="mt-4">
        @csrf
        @method('PUT')

        <div class="mb-3">
            <label class="form-label">Nom</label>
            <input type="text" name="nom" value="{{ $client->nom }}" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Numéro de compte</label>
            <input type="text" name="numero_compte" value="{{ $client->numero_compte }}" class="form-control" required>
        </div>

        <button type="submit" class="btn btn-primary">Mettre à jour</button>
        <a href="{{ route('clients.index') }}" class="btn btn-secondary">Annuler</a>
    </form>
@endsection
