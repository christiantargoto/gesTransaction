<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\DB;
use App\Models\Transaction;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index()
{
    return response()->json(Transaction::all());
}
    /*
    public function index()
    {
        $transactions = Transaction::with('client')->get();
        return view('transactions.index', compact('transactions'));
    }*/

    public function create()
    {
        $clients = Client::all();
        return view('transactions.create', compact('clients'));
    }

    //store transaction
    public function store(Request $request)
{
    $validated = $request->validate([
        'numero_compte' => 'required|exists:clients,numero_compte',
        'type' => 'required|in:versement,retrait',
        'montant' => 'required|numeric|min:0.01'
    ]);

    $transaction = Transaction::create($validated);

    return response()->json($transaction, 201);
}

    /*
    public function store(Request $request)
{
    $request->validate([
        'numero_compte' => 'required|exists:clients,numero_compte',
        'type' => 'required|in:versement,retrait',
        'montant' => 'required|numeric|min:0.01',
    ]);

    // Calculer le solde actuel du compte
    $solde = Transaction::where('numero_compte', $request->numero_compte)
        ->selectRaw("SUM(CASE WHEN type = 'versement' THEN montant ELSE -montant END) as solde")
        ->value('solde');

    $solde = $solde ?? 0; // Si aucune transaction, solde = 0

    // Si c'est un retrait, vérifier que le solde est suffisant
    if ($request->type === 'retrait' && $request->montant > $solde) {
        return redirect()->back()
            ->withErrors(['montant' => 'Le montant du retrait dépasse le solde disponible (solde actuel : ' . number_format($solde, 2, ',', ' ') . ' FCFA).'])
            ->withInput();
    }

    // Enregistrement de la transaction
    Transaction::create($request->all());

    return redirect()->route('transactions.index')->with('success', 'Transaction enregistrée.');
}*/
public function getClientNom($numero_compte)
{
    // Supposons que tu as un modèle Client lié à la table clients
    $client = \App\Models\Client::where('numero_compte', $numero_compte)->first();

    if ($client) {
        return response()->json(['nom_client' => $client->nom]);
    } else {
        return response()->json(['nom_client' => null], 404);
    }
}


/////recherche transaction
public function getByNumeroCompte($numero_compte)
    {
        $transactions = Transaction::where('numero_compte', $numero_compte)->orderBy('created_at', 'desc')->get();

        if ($transactions->isEmpty()) {
            return response()->json(['message' => 'Aucune transaction trouvée.'], 404);
        }

        return response()->json($transactions);
    }

////
   

    public function requetes(Request $request)
    {
        $search = $request->input('search');
    
        $isDate = false;
        $searchDate = null;
    
        // Essaye de détecter si c’est une date au format JJ/MM/AAAA
        try {
            $searchDate = Carbon::createFromFormat('d/m/Y', $search)->format('Y-m-d');
            $isDate = true;
        } catch (\Exception $e) {
            $isDate = false;
        }
    
        $transactions = Transaction::with('client')
            ->when($search, function ($query, $search) use ($searchDate, $isDate) {
                $query->where('numero_compte', 'like', "%$search%")
                    ->orWhereHas('client', function ($q) use ($search) {
                        $q->where('nom', 'like', "%$search%");
                    });
    
                if ($isDate) {
                    $query->orWhereDate('created_at', $searchDate); // Ignore l'heure automatiquement
                }
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    
        return view('transactions.requetes', compact('transactions'));
    }
    

   


}
