@extends('layouts.app')

@section('content')
    <div class="container">
        <h2 class="mb-4">Rechercher des Transactions</h2>

        {{-- Champ de recherche --}}
        <form method="GET" action="{{ route('transactions.requetes') }}" class="row g-3 mb-4">
            <div class="col-md-4">
                <input type="text" name="search" class="form-control" placeholder="Nom client, numéro de compte ou date" value="{{ request('search') }}">
            </div>
            <div class="col-md-2">
                <button type="submit" class="btn btn-primary">Rechercher</button>
            </div>
        </form>

        {{-- Résultats --}}
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Numéro de Compte</th>
                    <th>Nom du Client</th>
                    <th>Type</th>
                    <th>Montant</th>
                    <th>Date/Heure</th>
                </tr>
            </thead>
            <tbody>
                @forelse($transactions as $transaction)
                    <tr>
                        <td>{{ $transaction->numero_compte }}</td>
                        <td>{{ $transaction->client->nom }}</td>
                        <td>{{ ucfirst($transaction->type) }}</td>
                        <td>{{ number_format($transaction->montant, 0, ',', ' ') }} FCFA</td>
                        <td>{{ $transaction->created_at->format('d/m/Y H:i') }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="text-center">Aucune transaction trouvée</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        {{-- Pagination --}}
        {{ $transactions->links() }}
    </div>
@endsection
