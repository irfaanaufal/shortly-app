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
    private function formatShortcutUrl(string $url): string
    {
        $baseUrl = config('app.default_base_url', 'http://hfg093wdn44.sn.mynetname.net');
        if (str_starts_with($url, '/')) {
            return $baseUrl . $url;
        } elseif (!preg_match('~^[a-zA-Z][a-zA-Z0-9.+-]*://~', $url)) {
            return $baseUrl . '/' . $url;
        }
        return $url;
    }

    private function getAllowedShortcutIds($user): array
    {
        return Shortcut::whereNull('user_id')
            ->orWhere('user_id', $user->id)
            ->pluck('id')
            ->toArray();
    }

    private function sanitizeUrl(string $url): string
    {
        $parsed = parse_url($url);
        if (isset($parsed['host'])) {
            $blocked = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
            foreach ($blocked as $host) {
                if ($parsed['host'] === $host) {
                    abort(422, 'URL tidak valid.');
                }
            }
            $host = $parsed['host'] ?? '';
            if (preg_match('/^(10\.|169\.254\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/', $host)
                || preg_match('/^(fc00:|fd00:|fe80:)/i', $host)) {
                abort(422, 'URL tidak valid.');
            }
        }
        return $url;
    }

    /**
     * Display the user's dashboard with settings.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $shortcuts = Shortcut::where('is_active', true)
            ->where(function ($q) use ($user) {
                $q->whereNull('user_id')
                  ->orWhere('user_id', $user->id);
            })
            ->with('system')
            ->orderByRaw('COALESCE((SELECT position FROM shortcut_user WHERE shortcut_user.shortcut_id = shortcuts.id AND shortcut_user.user_id = ?), 999999) ASC', [$user->id])
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
        $allowedShortcutIds = $this->getAllowedShortcutIds($user);

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
                $url = $this->formatShortcutUrl($url);
                $this->sanitizeUrl($url);
                $request->merge(['url' => $url]);
            }
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => [
                'required', 'string', 'max:255',
                function ($attribute, $value, $fail) {
                    $parsed = parse_url($value);
                    $scheme = strtolower($parsed['scheme'] ?? '');
                    if ($scheme && !in_array($scheme, ['http', 'https'], true)) {
                        $fail('URL harus menggunakan protokol HTTP atau HTTPS.');
                    }
                },
            ],
            'description' => 'nullable|string|max:255',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255|regex:/^from-[a-z]+-[0-9]+ to-[a-z]+-[0-9]+$/',
        ]);

        $shortcut = Shortcut::create(array_merge($validated, [
            'user_id' => $request->user()->id,
        ]));

        $request->user()->shortcuts()->attach($shortcut->id);

        return redirect()->route('dashboard')->with('status', 'shortcut-created');
    }

    /**
     * Show the form for editing the specified shortcut.
     */
    public function edit(Request $request, Shortcut $shortcut): Response
    {
        if ($shortcut->user_id === null) {
            abort(403, 'Global shortcuts cannot be edited by users.');
        }

        if ($shortcut->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Shortcut/edit', [
            'shortcut' => $shortcut,
        ]);
    }

    public function updateShortcut(Request $request, Shortcut $shortcut): RedirectResponse
    {
        if ($shortcut->user_id === null) {
            abort(403, 'Global shortcuts cannot be edited by users.');
        }

        if ($shortcut->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        if ($request->has('url')) {
            $url = trim($request->input('url'));
            if ($url !== '') {
                $url = $this->formatShortcutUrl($url);
                $this->sanitizeUrl($url);
                $request->merge(['url' => $url]);
            }
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => [
                'required', 'string', 'max:255',
                function ($attribute, $value, $fail) {
                    $parsed = parse_url($value);
                    $scheme = strtolower($parsed['scheme'] ?? '');
                    if ($scheme && !in_array($scheme, ['http', 'https'], true)) {
                        $fail('URL harus menggunakan protokol HTTP atau HTTPS.');
                    }
                },
            ],
            'description' => 'nullable|string|max:255',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255|regex:/^from-[a-z]+-[0-9]+ to-[a-z]+-[0-9]+$/',
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
            abort(403, 'Global shortcuts cannot be deleted by users.');
        }

        if ($shortcut->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $shortcut->delete();

        return redirect()->route('dashboard')->with('status', 'shortcut-deleted');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $user = $request->user();

        $allowedShortcutIds = $this->getAllowedShortcutIds($user);

        $request->validate([
            'shortcut_ids' => 'required|array',
            'shortcut_ids.*' => [
                'exists:shortcuts,id',
                Rule::in($allowedShortcutIds),
            ],
        ]);

        foreach ($request->shortcut_ids as $position => $shortcutId) {
            $user->shortcuts()->updateExistingPivot($shortcutId, ['position' => $position]);
        }

        return redirect()->back()->with('status', 'order-updated');
    }
}
