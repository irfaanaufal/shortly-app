<?php

namespace App\Http\Middleware;

use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();
        if ($user) {
            $user->load(['role']);
            if ($request->method() === 'GET' && !$user->userApplications()->exists()) {
                $user->ensureUserApplications();
            }
        }

        $userData = null;
        if ($user) {
            $userData = $user->toArray();
            unset($userData['role_id']);
            $userData['level'] = $user->level;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $userData,
            ],
            'logo_url' => asset('images/logo.png'),
            'storage_url' => rtrim(asset(''), '/'),
        ];
    }
}
