<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\Shortcut;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccessControlTest extends TestCase
{
    use RefreshDatabase;

    private function createAdmin(): User
    {
        $role = Role::create(['name' => 'IT', 'level' => 1]);
        $user = User::factory()->create();
        $user->role_id = $role->id;
        $user->save();

        return $user;
    }

    private function createShortcutFor(User $user): Shortcut
    {
        return Shortcut::create([
            'user_id' => $user->id,
            'name' => 'Owned Shortcut',
            'url' => 'https://example.com',
            'icon' => 'Link2',
            'color' => 'from-blue-500 to-cyan-500',
        ]);
    }

    public function test_guest_is_redirected_to_login_from_dashboard(): void
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_non_admin_cannot_access_admin_systems_page(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get('/admin/systems')->assertForbidden();
    }

    public function test_admin_level_1_can_access_systems_page_even_without_email_verification(): void
    {
        $admin = $this->createAdmin();
        $admin->email_verified_at = null;
        $admin->save();

        $this->assertNull($admin->fresh()->email_verified_at);
        $this->actingAs($admin)->get('/admin/systems')->assertOk();
    }

    public function test_non_admin_cannot_create_system(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/admin/systems', ['name' => 'Evil System'])
            ->assertForbidden();
    }

    public function test_user_cannot_edit_another_users_shortcut(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $shortcut = $this->createShortcutFor($owner);

        $this->actingAs($other)
            ->get(route('shortcuts.edit', $shortcut))
            ->assertForbidden();
    }

    public function test_user_cannot_update_another_users_shortcut(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $shortcut = $this->createShortcutFor($owner);

        $this->actingAs($other)
            ->put(route('shortcuts.update', $shortcut), ['name' => 'Hijacked'])
            ->assertForbidden();
    }

    public function test_user_cannot_delete_another_users_shortcut(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $shortcut = $this->createShortcutFor($owner);

        $this->actingAs($other)
            ->delete(route('shortcuts.destroy', $shortcut))
            ->assertForbidden();
    }

    public function test_user_cannot_edit_global_shortcut(): void
    {
        $user = User::factory()->create();
        $shortcut = Shortcut::create([
            'user_id' => null,
            'name' => 'Global Shortcut',
            'url' => 'https://example.com',
            'icon' => 'Link2',
            'color' => 'from-blue-500 to-cyan-500',
        ]);

        $this->actingAs($user)
            ->get(route('shortcuts.edit', $shortcut))
            ->assertForbidden();
    }

    public function test_user_cannot_select_another_users_shortcut_in_dashboard_sync(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $shortcut = $this->createShortcutFor($owner);

        $this->actingAs($other)
            ->post(route('dashboard.shortcuts.update'), [
                'shortcut_ids' => [$shortcut->id],
            ])
            ->assertSessionHasErrors('shortcut_ids.0');
    }

    public function test_user_cannot_reorder_another_users_shortcut(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $shortcut = $this->createShortcutFor($owner);

        $this->actingAs($other)
            ->put(route('shortcuts.reorder'), [
                'shortcut_ids' => [$shortcut->id],
            ])
            ->assertSessionHasErrors('shortcut_ids.0');
    }
}
