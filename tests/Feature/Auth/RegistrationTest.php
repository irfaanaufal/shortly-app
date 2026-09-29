<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        \App\Models\Karyawan::create([
            'fid' => 'FID-TEST-001',
            'nama_karyawan' => 'Test User',
            'divisi' => 'IT',
            'jabatan' => 'Staff',
        ]);

        $response = $this->post('/register', [
            'fid' => 'FID-TEST-001',
            'name' => 'Test User',
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_duplicate_fid_cannot_register(): void
    {
        \App\Models\Karyawan::create([
            'fid' => 'FID-DUP-001',
            'nama_karyawan' => 'Test User',
            'divisi' => 'IT',
            'jabatan' => 'Staff',
        ]);

        \App\Models\User::factory()->create(['fid' => 'FID-DUP-001']);

        $response = $this->post('/register', [
            'fid' => 'FID-DUP-001',
            'name' => 'Test User',
            'username' => 'dupuser',
            'email' => 'dup@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasErrors('fid');
        $this->assertGuest();
    }

    public function test_username_with_dot_is_rejected(): void
    {
        \App\Models\Karyawan::create([
            'fid' => 'FID-DOT-001',
            'nama_karyawan' => 'Test User',
            'divisi' => 'IT',
            'jabatan' => 'Staff',
        ]);

        $response = $this->post('/register', [
            'fid' => 'FID-DOT-001',
            'name' => 'Test User',
            'username' => 'budi.santoso',
            'email' => 'budi@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasErrors('username');
        $this->assertGuest();
    }
}
