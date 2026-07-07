<?php

namespace App\Http\Controllers;

use App\Models\System;
use App\Models\Shortcut;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SystemController extends Controller
{
    public function index(): Response
    {
        $systems = System::withCount('shortcuts')->latest()->get();

        return Inertia::render('Admin/SystemManagement', [
            'systems' => $systems,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nama_sistem' => 'required|string|max:255',
            'link_sistem' => 'nullable|string|max:500',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255',
        ]);

        $system = System::create($validated);

        $this->syncShortcuts($system);

        return redirect()->route('admin.systems.index')->with('status', 'system-created');
    }

    public function update(Request $request, System $system): RedirectResponse
    {
        $validated = $request->validate([
            'nama_sistem' => 'required|string|max:255',
            'link_sistem' => 'nullable|string|max:500',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255',
        ]);

        $system->update($validated);

        $this->syncShortcuts($system);

        return redirect()->route('admin.systems.index')->with('status', 'system-updated');
    }

    public function destroy(System $system): RedirectResponse
    {
        Shortcut::where('system_id', $system->id)->delete();
        $system->delete();

        return redirect()->route('admin.systems.index')->with('status', 'system-deleted');
    }

    public function toggleActive(System $system): RedirectResponse
    {
        $system->update(['is_active' => !$system->is_active]);

        $this->syncShortcuts($system);

        return redirect()->route('admin.systems.index')->with('status', 'system-toggled');
    }

    private function syncShortcuts(System $system): void
    {
        $shortcut = Shortcut::where('system_id', $system->id)->first();

        $data = [
            'name' => $system->nama_sistem,
            'url' => $system->link_sistem ?: '#',
            'icon' => $system->icon,
            'color' => $system->color,
        ];

        if ($shortcut) {
            $shortcut->update($data);
        } else {
            Shortcut::create(array_merge($data, [
                'description' => null,
                'user_id' => null,
                'system_id' => $system->id,
            ]));
        }
    }
}
