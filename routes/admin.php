<?php

use App\Http\Controllers\Admin\ClientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Auth\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\WorkerController;
use App\Http\Controllers\Admin\InformationPageController;
use App\Http\Controllers\Admin\JobController;
use App\Http\Controllers\Admin\JobProfileController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\NationalityController;
use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\SubscriptionController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\Admin\ServiceSchedulesController;
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
Route::group(['prefix' => 'admin'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
});

// Authenticated Routes
Route::group(['prefix' => 'admin', 'middleware' => ['auth:admin-api', 'scopes:admin']], function () {

    // Admin Details Api
    Route::get('details', [AuthController::class, 'details']);

    // Admin Dashboard Api
    Route::get('dashboard', [DashboardController::class, 'dashboard']);

    // Jobs Api
    Route::resource('jobs', JobController::class);

    // workers Api
    Route::resource('workers', WorkerController::class);
    Route::get('all-workers', [WorkerController::class,'AllWorkers']);
    Route::get('worker_availability/{id}', [WorkerController::class,'getWorkerAvailability']);
    Route::put('update_availability/{id}', [WorkerController::class,'updateAvailability']);


    // Clients Api
    Route::resource('clients', ClientController::class);
    Route::get('all-clients', [ClientController::class,'AllClients']);

    // Services Api
    Route::resource('services', ServicesController::class);
    Route::get('all-services', [ServicesController::class,'AllServices']);

     // Services Api
     Route::resource('service-schedule', ServiceSchedulesController::class);

    // Reviews Api
    Route::resource('reviews', ReviewController::class);

    // Skills Api
    Route::resource('skills', SkillController::class);

    // Tasks Api
    Route::resource('tasks', TaskController::class);

    // Language Api
    Route::resource('languages', LanguageController::class);

    // Nationality Api
    Route::resource('nationalities', NationalityController::class);

    // Information Pages Api
    Route::resource('information-pages', InformationPageController::class);

    // Plans Api
    Route::resource('plans', PlanController::class);

    // Subscriptions Api
    Route::resource('subscriptions', SubscriptionController::class);

    // Job Profile Api
    Route::resource('job-profiles', JobProfileController::class);

    // General Setting Api
    Route::get('general-settings', [SettingController::class, 'getGeneralSettings']);
    Route::post('general-settings', [SettingController::class, 'saveGeneralSettings']);

    // My Account Api
    Route::get('my-account', [SettingController::class, 'getAccountDetails']);
    Route::post('my-account', [SettingController::class, 'saveAccountDetails']);

    // Change Password Api
    Route::post('change-password', [SettingController::class, 'changePassword']);

    // Admin Logout Api
    Route::post('logout', [AuthController::class, 'logout']);
});
