<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class System extends Model
{
    use HasFactory;

    protected $table = 'system_ptsam';

    protected $fillable = ['nama_sistem', 'link_sistem', 'icon', 'color', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function shortcuts()
    {
        return $this->hasMany(Shortcut::class);
    }
}
