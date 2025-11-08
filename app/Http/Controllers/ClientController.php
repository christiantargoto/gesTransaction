<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    // 📌 GET /api/clients — Lister tous les clients
    public function index()
    {
        return Client::all();
        
    }

    // 📌 POST /api/clients — Ajouter un nouveau client
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:191',
            'numero_compte' => 'required|string|max:191',
        ]);

        $client = Client::create([
            'nom' => $request->nom,
            'numero_compte' => $request->numero_compte,
        ]);

        return response()->json($client, 201);
    }

    // 📌 GET /api/clients/{id} — Afficher un seul client
    public function show($id)
    {
        return Client::findOrFail($id);
    }

    // 📌 PUT /api/clients/{id} — Modifier un client
    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);

        $request->validate([
            'nom' => 'required|string|max:191',
            'numero_compte' => 'required|string|max:191',
        ]);

        $client->update([
            'nom' => $request->nom,
            'numero_compte' => $request->numero_compte,
        ]);

        return response()->json($client);
    }

    // 📌 DELETE /api/clients/{id} — Supprimer un client
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();

        return response()->json(['message' => 'Client supprimé avec succès']);
    }

    public function findByCompte($numero)
{
    $client = Client::where('numero_compte', $numero)->first();

    if ($client) {
        return response()->json(['nom' => $client->nom]);
    } else {
        return response()->json(['nom' => 'Client introuvable'], 404);
    }
}
}
