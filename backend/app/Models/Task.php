<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'is_done',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function setDueDateAttribute($value)
    {
        $this->attributes['due_date'] = Carbon::parse($value);
    }

    public function getDueDateAttribute($value)
    {
        return Carbon::parse($value)->format('d/m/Y');
    }
}
