<?php

namespace App\Http\Controllers;

use App\Enum\RoleEnum;
use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Http\Resources\TeacherResource;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $teachers = Teacher::with('user:id,name')
            ->whereNull('archive_at')
            ->latest()
            ->paginate(21);

        return inertia('Teacher/Index', ['teachers' => TeacherResource::collection($teachers)]);
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Teacher/Create', ['teachers' => $this->getTeachers()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        Teacher::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        $user = [
            'id' => $teacher->id,
            'user_id' => $teacher->user_id,
        ];

        return inertia('Teacher/Edit', ['teachers' => $this->getTeachers(), 'user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        $teacher->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->update(['archive_at' => null]);
        $teacher->delete();
    }
    public function moveArchive(Teacher $teacher)
    {
        $teacher->update(['archive_at' => now()]);
    }

    public function restoreArchive(Teacher $teacher)
    {
        $teacher->update(['archive_at' => null]);
    }

    public function restore($id)
    {
        $teacher = Teacher::withTrashed()->find($id);
        $teacher->restore();
    }

    public function forceDelete($id)
    {
        $teacher = Teacher::withTrashed()->find($id);
        $teacher->forceDelete();
    }
    private function getTeachers()
    {
        return Cache::remember('teachers', now()->addHours(24), function () {
            return User::whereHas('roles', function ($role) {
                return $role->where('name', RoleEnum::TEACHER);
            })->select(['id', 'name'])->orderBy('name', 'asc')->get();
        });
    }
}
