<?php

namespace App\Http\Controllers;

use App\Enum\RoleEnum;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('roles:id,name')
        ->whereNull('archive_at')
        ->whereHas('roles', function ($query) {
            $query->where('name', '!=', RoleEnum::ADMIN);
        })->latest()->paginate(20);

        return inertia('User/Index', [
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create', [
            'roles' => $this->getRoles(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create(array_merge($request->validated(), [
            'password' => bcrypt($request->role),
        ]));
        $user->update(['password' => bcrypt($request->role.'_'.$user->id)]);
        $user->assignRole($request->role);

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserResource($user),
            'roles' => $this->getRoles(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        $user->syncRoles([$request->role]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
    }

    public function moveArchive(User $user)
    {
        $user->update(['archive_at' => now()]);
    }

    public function restoreArchive(User $user)
    {
        $user->update(['archive_at' => null]);
    }

    public function restore($id)
    {
        $user = User::withTrashed()->find($id);
        $user->restore();
    }

    public function forceDelete($id)
    {
        $user = User::withTrashed()->find($id);
        $user->forceDelete();
    }

    private function getRoles()
    {
        return Role::where('name', '!=', RoleEnum::ADMIN)
            ->select('id', 'name')->get();
    }
}
