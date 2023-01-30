<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\Auth\AuthController;
/*
|--------------------------------------------------------------------------
| Admin API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Unauthenticated Routes

Route::group(['prefix' => 'client'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});


// Authenticated Routes
Route::group(['prefix' => 'client', 'middleware' => ['auth:client-api', 'scopes:client']], function () {
     // Admin Logout Api
    Route::post('logout', [AuthController::class, 'logout']);
});

