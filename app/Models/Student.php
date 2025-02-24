<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'user_id',
        'archive_at',
    ];
    public function user()
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function scopeActive($query)
    {
        return $query->whereNull('archive_at');
    }

    public function scopeInActive($query)
    {
        return $query->whereNotNull('archive_at');
    }

    public function scopeGetStudents($query)
    {
        $search = request('search', '');

        return $query
            ->with('user:id,name')
            ->when($search, function ($query, $search) {
                return $query->whereHas('user', function ($query) use ($search) {
                    return $query->where('name', 'like', "%$search%");
                });
            })
            ->latest()
            ->paginate(21)->appends(request()->query());
    }
}
