<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'username', 'email', 'password', 'fid', 'role_id'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $appends = ['role_name', 'profile_photo_url'];

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

    public function isSuperAdmin(): bool
    {
        return $this->role?->name === 'superadmin';
    }

    public function isAdmin(): bool
    {
        return in_array($this->role?->name, ['superadmin', 'admin']);
    }

    public function getRoleNameAttribute()
    {
        return $this->role?->name;
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
