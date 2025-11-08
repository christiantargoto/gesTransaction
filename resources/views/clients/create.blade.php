@extends('layouts.app')

@section('content')
    <h1>Ajouter un nouveau client</h1>

    <form action="{{ route('clients.store') }}" method="POST" class="mt-4">
        @csrf

        <div class="mb-3">
            <label class="form-label">Nom</label>
            <input type="text" name="nom" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Numéro de compte</label>
            <input type="text" name="numero_compte" class="form-control" required>
        </div>

        <button type="submit" class="btn btn-success">Enregistrer</button>
        <a href="{{ route('clients.index') }}" class="btn btn-secondary">Annuler</a>
    </form>
@endsection
