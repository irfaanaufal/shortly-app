<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShortcutController;
use App\Http\Controllers\PublicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', [ShortcutController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/dashboard/shortcuts', [ShortcutController::class, 'update'])->name('dashboard.shortcuts.update');
    Route::post('/dashboard/username', [ShortcutController::class, 'updateUsername'])->name('dashboard.username.update');

    // Shortcut CRUD
    Route::get('/dashboard/shortcut/create', [ShortcutController::class, 'create'])->name('shortcuts.create');
    Route::post('/dashboard/shortcut', [ShortcutController::class, 'store'])->name('shortcuts.store');
    Route::get('/dashboard/shortcut/{shortcut}/edit', [ShortcutController::class, 'edit'])->name('shortcuts.edit');
    Route::put('/dashboard/shortcut/{shortcut}', [ShortcutController::class, 'updateShortcut'])->name('shortcuts.update');
    Route::delete('/dashboard/shortcut/{shortcut}', [ShortcutController::class, 'destroyShortcut'])->name('shortcuts.destroy');
});

Route::get('/u/{username}', [PublicController::class, 'show'])->name('public.shortcuts');

require __DIR__.'/auth.php';
