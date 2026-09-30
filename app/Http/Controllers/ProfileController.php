<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'karyawan' => $user->karyawan,
            'stats' => [
                'shortcuts' => $user->shortcuts()->where('is_active', true)->count(),
                'applications' => $user->userApplications()->where('is_active', true)->count(),
            ],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->safe()->only(['name', 'email']));

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        if ($request->hasFile('profile_photo')) {
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }

            $file = $request->file('profile_photo');
            $extension = strtolower($file->guessExtension() ?? 'jpg');
            $filename = \Illuminate\Support\Str::random(40) . '.' . $extension;

            $file->storeAs('profile-photos', $filename, 'public');

            $user->avatar_path = 'profile-photos/' . $filename;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }
}
