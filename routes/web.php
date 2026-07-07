<?php

use App\Http\Controllers\LogNotifikasiController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShortcutController;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [ShortcutController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/dashboard/shortcuts', [ShortcutController::class, 'update'])->name('dashboard.shortcuts.update');
    Route::post('/dashboard/username', [ShortcutController::class, 'updateUsername'])->name('dashboard.username.update');

    Route::get('/dashboard/shortcut/create', [ShortcutController::class, 'create'])->name('shortcuts.create');
    Route::post('/dashboard/shortcut', [ShortcutController::class, 'store'])->name('shortcuts.store');
    Route::get('/dashboard/shortcut/{shortcut}/edit', [ShortcutController::class, 'edit'])->name('shortcuts.edit');
    Route::put('/dashboard/shortcut/{shortcut}', [ShortcutController::class, 'updateShortcut'])->name('shortcuts.update');
    Route::delete('/dashboard/shortcut/{shortcut}', [ShortcutController::class, 'destroyShortcut'])->name('shortcuts.destroy');
    Route::put('/dashboard/shortcuts/reorder', [ShortcutController::class, 'reorder'])->name('shortcuts.reorder');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/systems', [SystemController::class, 'index'])->name('systems.index');
    Route::post('/systems', [SystemController::class, 'store'])->name('systems.store');
    Route::put('/systems/{system}', [SystemController::class, 'update'])->name('systems.update');
    Route::delete('/systems/{system}', [SystemController::class, 'destroy'])->name('systems.destroy');
    Route::patch('/systems/{system}/toggle', [SystemController::class, 'toggleActive'])->name('systems.toggle');
});

Route::get('/u/{username}', [PublicController::class, 'show'])->name('public.shortcuts');

// API Notifikasi
Route::middleware('auth')->group(function () {
    Route::get('/api/notifications', [LogNotifikasiController::class, 'index']);
    Route::patch('/api/notifications/read-all', [LogNotifikasiController::class, 'markAllRead']);
});

require __DIR__.'/auth.php';
