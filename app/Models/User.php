<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = ['name', 'username', 'email', 'password', 'fid', 'role_id', 'avatar_path'];

    protected $appends = ['role_name', 'profile_photo_url', 'level'];

    public function shortcuts()
    {
        return $this->belongsToMany(Shortcut::class)->orderByPivot('position');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function karyawan()
    {
        return $this->belongsTo(Karyawan::class, 'fid', 'fid');
    }

    public function userApplications()
    {
        return $this->hasMany(UserApplication::class);
    }

    public function applications()
    {
        return $this->belongsToMany(Application::class, 'user_applications');
    }

    public function logNotifikasi()
    {
        return $this->hasMany(LogNotifikasi::class);
    }

    public function isIT(): bool
    {
        return $this->level === 1;
    }

    public function isAdmin(): bool
    {
        return in_array($this->level, [1, 2, 3, 4], true);
    }

    public function assignRoleFromDivisi(): void
    {
        $divisiMap = [
            'it' => 'IT',
            'direktur' => 'Direktur Utama',
            'direktur utama' => 'Direktur Utama',
            'hrd' => 'HRD',
            'admin' => 'Admin',
            'teknisi' => 'Teknisi',
            'qa' => 'QA',
            'qc' => 'QC',
            'ekspedisi' => 'Ekspedisi',
        ];

        $roleName = $divisiMap[strtolower(trim((string) $this->karyawan?->divisi))] ?? 'Users Baru';

        $roleId = Role::where('name', $roleName)->value('id');

        if ($roleId) {
            $this->role_id = $roleId;
            $this->save();
        }
    }

    public function ensureUserApplications(): void
    {
        if ($this->userApplications()->count() === 0) {
            $apps = Application::where('slug', 'shortly')->get();
            foreach ($apps as $app) {
                UserApplication::create([
                    'user_id' => $this->id,
                    'application_id' => $app->id,
                    'is_active' => true,
                    'approved_at' => now(),
                ]);
            }
        }
    }

    public function getRoleNameAttribute()
    {
        return $this->role?->name;
    }

    public function getLevelAttribute(): ?int
    {
        return $this->role?->level;
    }

    public function getProfilePhotoUrlAttribute()
    {
        return $this->avatar_path ? asset($this->avatar_path) : null;
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
