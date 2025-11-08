<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\Client;
use Illuminate\Http\JsonResponse;

class ClientController extends Controller
{

    


    public function index(): JsonResponse
    {
        return response()->json(Client::all());
    }

   
/*
    public function index()
{
    $clients = Client::orderBy('id', 'desc')->get();
    return view('clients.index', compact('clients'));
}
*/

    public function create()
    {
        return view('clients.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:191',
            'numero_compte' => 'required|string|max:191',
        ]);

        Client::create($request->all());

        return redirect()->route('clients.index')->with('success', 'Client créé avec succès.');
    }
/*
    public function show(Client $client)
    {
        return view('clients.show', compact('client'));
    }*/

    public function edit(Client $client)
    {
        return view('clients.edit', compact('client'));
    }

    public function update(Request $request, Client $client)
    {
        $request->validate([
            'nom' => 'required|string|max:191',
            'numero_compte' => 'required|string|max:191',
        ]);

        $client->update($request->all());

        return redirect()->route('clients.index')->with('success', 'Client mis à jour avec succès.');
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()->route('clients.index')->with('success', 'Client supprimé avec succès.');
    }
}
