<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\User\Auth\AuthController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/import',[DashboardController::class,'import']);
Route::get('/pdf',[AuthController::class,'pdf101']);

// Auth::routes();
Route::any( '/{path?}', function(){
    return view( 'index' );
} )->where('path', '.*');

Route::any( '/login', function(){
    return view( 'index' );
} )->where('path', '.*');

Route::any( '/vendor/login', function(){
    return view( 'index' );
} )->where('path', '.*');


Route::any( '/register', function(){
    return view( 'index' );
} )->where('path', '.*');




