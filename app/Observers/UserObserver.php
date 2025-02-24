<?php

namespace App\Observers;

use App\Enum\RoleEnum;
use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {


        cache()->forget('teachers');
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {


        cache()->forget('teachers');
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        cache()->forget('teachers');
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        cache()->forget('teachers');
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        cache()->forget('teachers');
    }
}
