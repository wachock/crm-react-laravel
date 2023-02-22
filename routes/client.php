<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\Auth\AuthController;
use App\Http\Controllers\Client\ClientEmailController;
use App\Http\Controllers\Client\DashboardController;
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

Route::group(['prefix' => 'client', 'middleware' => ['auth:client-api', 'scopes:client']], function () {

    Route::post('logout', [AuthController::class, 'logout']);

   // Dashboard Routes
   Route::post('dashboard', [DashboardController::class, 'dashboard']);
   Route::post('schedule', [DashboardController::class, 'meetings'])->name('schedule');
   Route::post('offers', [DashboardController::class, 'offers'])->name('offers');
   Route::post('view-offer', [DashboardController::class, 'viewOffer'])->name('view-offer');
   Route::post('contracts', [DashboardController::class, 'contracts'])->name('contracts');
   Route::post('view-contract', [DashboardController::class, 'viewContract'])->name('view-contract');
   Route::post('get-contract', [DashboardController::class, 'getContract'])->name('get-contract');
   Route::post('add-file',[DashboardController::class,'addfile'])->name('add-file');
   Route::post('get-files',[DashboardController::class,'getfiles'])->name('get-files');
   Route::post('delete-file',[DashboardController::class,'deletefile'])->name('delete-file');
    // My Account Api
    Route::get('my-account', [DashboardController::class, 'getAccountDetails']);
    Route::post('my-account', [DashboardController::class, 'saveAccountDetails']);

    // Change Password Api
    Route::post('change-password', [DashboardController::class, 'changePassword']);

  
});

Route::group(['prefix' => 'client'], function () {

    Route::post('login', [AuthController::class, 'login']);

     // Emails Routes
     Route::post('meeting', [ClientEmailController::class, 'ShowMeeting'])->name('meeting');
     Route::post('get-offer',[ClientEmailController::class,'GetOffer'])->name('get-offer');
     Route::post('accept-offer',[ClientEmailController::class,'AcceptOffer'])->name('accept-offer');
     Route::post('accept-meeting',[ClientEmailController::class,'AcceptMeeting'])->name('accept-meeting');
     Route::post('get-offer-token',[ClientEmailController::class,'GetOfferFromHash'])->name('get-offer-token');
     Route::post('accept-contract',[ClientEmailController::class,'AcceptContract'])->name('accept-contract');
     Route::post('get-service-template',[ClientEmailController::class,'serviceTemplate'])->name('get-service-template');
 
});





