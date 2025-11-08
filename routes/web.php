<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\TransactionController;

//CLIENT
Route::get('/client/clientAll', [ClientController::class, 'index'])->name('clients.index');
Route::get('client/createClient', [ClientController::class, 'create'])->name('clients.create');
Route::post('client/addClient', [ClientController::class, 'store'])->name('clients.store');

Route::delete('/delete/{client}', [ClientController::class, 'destroy'])->name('clients.destroy');


Route::get('/edit/{client}', [ClientController::class, 'edit'])->name('clients.edit');
Route::put('/clientedit/{client}', [ClientController::class, 'update'])->name('clients.update');

//TRANSACTION
Route::get('/transaction/TransactionAll', [TransactionController::class, 'index'])->name('transactions.index');
Route::get('transaction/createTransaction', [TransactionController::class, 'create'])->name('transactions.create');
Route::post('transaction/addTransaction', [TransactionController::class, 'store'])->name('transactions.store');

Route::get('/clients/find-by-compte/{numero}', [App\Http\Controllers\ClientController::class, 'findByCompte']);

Route::get('/clients/requetes', [TransactionController::class, 'requetes'])->name('transactions.requetes');

Route::get('/clients/solde', [ClientController::class, 'monsolde'])->name('clients.monsolde');