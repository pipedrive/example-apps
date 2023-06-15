<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DealPickController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect('dashboard');
});

Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])->name('dashboard');
Route::post('/deal/{id}/pick', DealPickController::class)
    ->middleware(['auth', 'verified'])->name('deal.pick');

require __DIR__.'/auth.php';
