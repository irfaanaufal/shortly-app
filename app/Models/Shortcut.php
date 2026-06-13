<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'name', 'url', 'description', 'icon', 'color'])]
class Shortcut extends Model
{
    use HasFactory;

    /**
     * Get the user who owns this shortcut (for custom shortcuts).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the users who selected this shortcut.
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
