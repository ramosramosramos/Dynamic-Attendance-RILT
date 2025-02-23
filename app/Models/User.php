<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enum\RoleEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'archive_at',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function scopeGetDataUsers($query)
    {
        $search = request()->input('search');
        $role = request()->input('role');

        return $query->with('roles:id,name')
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', '%'.$search.'%');
            })
            ->when($role, function ($query) use ($role) {
                $query->whereHas('roles', function ($q) use ($role) {
                    $q->where('name', 'like', '%'.$role.'%');
                });
            })
            ->whereNull('archive_at')
            ->whereHas('roles', function ($query) {
                $query->where('name', '!=', RoleEnum::ADMIN);
            })
            ->latest()
            ->paginate(20)
            ->appends(request()->query());
    }

    public function scopeGetArchiveDataUsers($query)
    {
        return $query->with('roles:id,name')
            ->where('archive_at', '!=', null)
            ->whereHas('roles', function ($query) {
                $query->where('name', '!=', RoleEnum::ADMIN);
            })->latest()->paginate(20);
    }
}
