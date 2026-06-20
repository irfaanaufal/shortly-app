<?php

namespace App\Http\Controllers;

use App\Models\Shortcut;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ShortcutController extends Controller
{
    /**
     * Display the user's dashboard with settings.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $shortcuts = Shortcut::whereNull('user_id')
            ->orWhere('user_id', $user->id)
            ->get();

        return Inertia::render('Dashboard', [
            'shortcuts' => $shortcuts,
            'userShortcuts' => $user->shortcuts()->pluck('id'),
        ]);
    }

    /**
     * Update the user's selected shortcuts.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        $allowedShortcutIds = Shortcut::whereNull('user_id')
            ->orWhere('user_id', $user->id)
            ->pluck('id')
            ->toArray();

        $request->validate([
            'shortcut_ids' => 'present|array',
            'shortcut_ids.*' => [
                'exists:shortcuts,id',
                Rule::in($allowedShortcutIds),
            ],
        ]);

        $user->shortcuts()->sync($request->shortcut_ids);

        return redirect()->back()->with('status', 'shortcuts-updated');
    }

    /**
     * Update the user's username.
     */
    public function updateUsername(Request $request): RedirectResponse
    {
        $user = $request->user();

        $request->validate([
            'username' => [
                'required',
                'string',
                'alpha_dash',
                'lowercase',
                'max:255',
                Rule::unique(User::class)->ignore($user->id),
            ],
        ]);

        $user->update([
            'username' => $request->username,
        ]);

        return redirect()->back()->with('status', 'username-updated');
    }

    /**
     * Show the form for creating a new shortcut.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Shortcut/create');
    }

    /**
     * Store a newly created shortcut.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->has('url')) {
            $url = trim($request->input('url'));
            if ($url !== '') {
                if (str_starts_with($url, '/')) {
                    $url = 'http://hfg093wdn44.sn.mynetname.net' . $url;
                } elseif (!preg_match('~^[a-zA-Z][a-zA-Z0-9.+-]*://~', $url)) {
                    $url = 'http://hfg093wdn44.sn.mynetname.net/' . $url;
                }
                $request->merge(['url' => $url]);
            }
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:500',
            'description' => 'nullable|string|max:1000',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255',
        ]);

        $userId = $request->user()->role === 'admin' ? null : $request->user()->id;

        $shortcut = Shortcut::create(array_merge($validated, [
            'user_id' => $userId,
        ]));

        // Otomatis centang shortcut kustom baru untuk pembuatnya
        if ($userId !== null) {
            $request->user()->shortcuts()->attach($shortcut->id);
        }

        return redirect()->route('dashboard')->with('status', 'shortcut-created');
    }

    /**
     * Show the form for editing the specified shortcut.
     */
    public function edit(Request $request, Shortcut $shortcut): Response
    {
        if ($shortcut->user_id === null) {
            if ($request->user()->role !== 'admin') {
                abort(403, 'Unauthorized action.');
            }
        } else {
            if ($shortcut->user_id !== $request->user()->id) {
                abort(403, 'Unauthorized action.');
            }
        }

        return Inertia::render('Shortcut/edit', [
            'shortcut' => $shortcut,
        ]);
    }

    /**
     * Update the specified shortcut.
     */
    public function updateShortcut(Request $request, Shortcut $shortcut): RedirectResponse
    {
        if ($shortcut->user_id === null) {
            if ($request->user()->role !== 'admin') {
                abort(403, 'Unauthorized action.');
            }
        } else {
            if ($shortcut->user_id !== $request->user()->id) {
                abort(403, 'Unauthorized action.');
            }
        }

        if ($request->has('url')) {
            $url = trim($request->input('url'));
            if ($url !== '') {
                if (str_starts_with($url, '/')) {
                    $url = 'http://hfg093wdn44.sn.mynetname.net' . $url;
                } elseif (!preg_match('~^[a-zA-Z][a-zA-Z0-9.+-]*://~', $url)) {
                    $url = 'http://hfg093wdn44.sn.mynetname.net/' . $url;
                }
                $request->merge(['url' => $url]);
            }
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:500',
            'description' => 'nullable|string|max:1000',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255',
        ]);

        $shortcut->update($validated);

        return redirect()->route('dashboard')->with('status', 'shortcut-updated');
    }

    /**
     * Remove the specified shortcut.
     */
    public function destroyShortcut(Request $request, Shortcut $shortcut): RedirectResponse
    {
        if ($shortcut->user_id === null) {
            if ($request->user()->role !== 'admin') {
                abort(403, 'Unauthorized action.');
            }
        } else {
            if ($shortcut->user_id !== $request->user()->id) {
                abort(403, 'Unauthorized action.');
            }
        }

        $shortcut->delete();

        return redirect()->route('dashboard')->with('status', 'shortcut-deleted');
    }
}
