<?php

namespace App\Http\Controllers;

use App\Models\Shortcut;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    public function show(string $username): Response
    {
        $user = User::where('username', strtolower($username))
            ->whereNull('deleted_at')
            ->firstOrFail(['id', 'name', 'username', 'avatar_path']);

        $shortcuts = $user->shortcuts()->where('is_active', true)->limit(100)
            ->get(['id', 'name', 'url', 'description', 'icon', 'color']);

        return Inertia::render('PublicShortcuts', [
            'owner' => [
                'name' => $user->name,
                'username' => $user->username,
                'profile_photo_url' => $user->avatar_path ? asset('storage/' . ltrim($user->avatar_path, '/')) : null,
            ],
            'shortcuts' => $shortcuts,
        ]);
    }

}
