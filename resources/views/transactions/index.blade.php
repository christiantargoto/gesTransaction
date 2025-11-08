@extends('layouts.app')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Liste des Transactions</h2>
        <a href="{{ route('transactions.create') }}" class="btn btn-primary">Nouvelle transaction</a>
    </div>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <table class="table table-bordered table-hover">
        <thead class="table-light">
            <tr>
                <th>ID</th>
                <th>Numéro de compte</th>
                <th>Type</th>
                <th>Montant</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($transactions as $transaction)
                <tr>
                    <td>{{ $transaction->id }}</td>
                    <td>{{ $transaction->numero_compte }}</td>
                    <td>{{ ucfirst($transaction->type) }}</td>
                    <td>{{ number_format($transaction->montant, 0, ',', ' ') }} FCFA</td>
                    <td>{{ $transaction->created_at->format('d/m/Y H:i') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
