<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| Employee API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Unauthenticated Routes
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);


// Authenticated Routes
Route::group( ['middleware' => ['auth:api','scopes:user'] ],function(){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('details',[AuthController::class, 'details']);    
});
