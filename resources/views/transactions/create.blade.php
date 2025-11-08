@extends('layouts.app')

@section('content')
    <h2>Nouvelle Transaction</h2>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('transactions.store') }}">
        @csrf

        <div class="mb-3">
            <label class="form-label">Numéro de compte :</label>
            <input type="text" name="numero_compte" id="numero_compte" class="form-control" value="{{ old('numero_compte') }}" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Nom du client :</label>
            <input type="text" id="nom_client" class="form-control" disabled>
        </div>

        <div class="mb-3">
            <label class="form-label">Type de transaction :</label>
            <select name="type" class="form-select" required>
                <option value="">-- Choisir --</option>
                <option value="versement" {{ old('type') == 'versement' ? 'selected' : '' }}>Versement</option>
                <option value="retrait" {{ old('type') == 'retrait' ? 'selected' : '' }}>Retrait</option>
            </select>
        </div>

        <div class="mb-3">
            <label class="form-label">Montant :</label>
            <input type="number" name="montant" class="form-control" value="{{ old('montant') }}" required>
        </div>

       
        <button type="submit" class="btn btn-success">Enregistrer</button>
        <a href="{{ route('transactions.index') }}" class="btn btn-secondary">Annuler</a>
    </form>
@endsection

@section('scripts')
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    $('#numero_compte').on('keyup change', function () {
        let numero = $(this).val();
        if (numero.length > 3) {
            $.ajax({
                url: '{{ url("/clients/find-by-compte") }}/' + numero,
                method: 'GET',
                success: function (response) {
                    $('#nom_client').val(response.nom || 'Client introuvable');
                },
                error: function () {
                    $('#nom_client').val('Erreur');
                }
            });
        } else {
            $('#nom_client').val('');
        }
    });
</script>
@endsection
