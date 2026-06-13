<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Show the public welcome page for a specific user.
     */
    public function show(string $username): Response
    {
        $user = User::where('username', strtolower($username))->firstOrFail();

        $shortcuts = $user->shortcuts()->get(['name', 'url', 'description', 'icon', 'color']);

        return Inertia::render('PublicShortcuts', [
            'owner' => [
                'name' => $user->name,
                'username' => $user->username,
                'profile_photo_path' => $user->profile_photo_path,
            ],
            'shortcuts' => $shortcuts,
        ]);
    }
}
