<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ClientController;
use App\Http\Controllers\TransactionController;

//CLIENTS
Route::get('/clients', [ClientController::class, 'index']);

Route::post('/clients', [ClientController::class, 'store']);

Route::delete('/clients/{id}', [ClientController::class, 'destroy']);

Route::put('/clients/{id}', [ClientController::class, 'update']);

//TRANSACTIONS
Route::get('/transactions', [TransactionController::class, 'index']);
Route::post('/transactions', [TransactionController::class, 'store']);

Route::get('/client-nom/{numero_compte}', [TransactionController::class, 'getClientNom']);

Route::get('/transactions/{numero_compte}', [TransactionController::class, 'getByNumeroCompte']);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
