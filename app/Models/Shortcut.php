<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shortcut extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'url', 'description', 'icon', 'color', 'system_id', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function system()
    {
        return $this->belongsTo(System::class);
    }

}
