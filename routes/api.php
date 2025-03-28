<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('api.auth')->group(function () {
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::put('/transactions/{id}', [TransactionController::class, 'update']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
});
