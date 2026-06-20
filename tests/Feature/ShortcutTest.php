<?php

namespace Tests\Feature;

use App\Models\Shortcut;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShortcutTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_prepends_dns_to_relative_url_with_slash(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('shortcuts.store'), [
            'name' => 'Test Relative URL Slash',
            'url' => '/absensi/irfaanaufal',
            'icon' => 'Link2',
            'color' => 'from-blue-500 to-cyan-500',
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('shortcuts', [
            'name' => 'Test Relative URL Slash',
            'url' => 'http://hfg093wdn44.sn.mynetname.net/absensi/irfaanaufal',
        ]);
    }

    public function test_store_prepends_dns_to_relative_url_without_slash(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('shortcuts.store'), [
            'name' => 'Test Relative URL No Slash',
            'url' => 'absensi/irfaanaufal',
            'icon' => 'Link2',
            'color' => 'from-blue-500 to-cyan-500',
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('shortcuts', [
            'name' => 'Test Relative URL No Slash',
            'url' => 'http://hfg093wdn44.sn.mynetname.net/absensi/irfaanaufal',
        ]);
    }

    public function test_store_does_not_prepend_dns_to_absolute_url(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('shortcuts.store'), [
            'name' => 'Test Absolute URL',
            'url' => 'https://google.com',
            'icon' => 'Link2',
            'color' => 'from-blue-500 to-cyan-500',
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('shortcuts', [
            'name' => 'Test Absolute URL',
            'url' => 'https://google.com',
        ]);
    }

    public function test_update_prepends_dns_to_relative_url(): void
    {
        $user = User::factory()->create();
        $shortcut = Shortcut::create([
            'user_id' => $user->id,
            'name' => 'Old Name',
            'url' => 'https://old.url',
            'icon' => 'Link2',
            'color' => 'from-blue-500 to-cyan-500',
        ]);

        $response = $this->actingAs($user)->put(route('shortcuts.update', $shortcut->id), [
            'name' => 'Updated Name',
            'url' => '/absensi/irfaanaufal',
            'icon' => 'Link2',
            'color' => 'from-blue-500 to-cyan-500',
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('shortcuts', [
            'id' => $shortcut->id,
            'name' => 'Updated Name',
            'url' => 'http://hfg093wdn44.sn.mynetname.net/absensi/irfaanaufal',
        ]);
    }
}
