<?php

namespace App\Http\Controllers;

use App\Enum\RoleEnum;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class StudentController extends Controller
{
    public function index()
    {

        return inertia('Student/Index', [
            'students' => StudentResource::collection(Student::query()->active()->getStudents()),
            'filters' => [
                'search' => request('search', ''),
            ],
        ]);

    }

    public function archive()
    {

        return inertia('Student/Archive', [
            'students' => StudentResource::collection(Student::query()->inActive()->getStudents()),
            'filters' => [
                'search' => request('search', ''),
            ],
        ]);

    }

    public function bin()
    {

        return inertia('Student/Bin', [
            'students' => StudentResource::collection(Student::query()->onlyTrashed()->getStudents()),
            'filters' => [
                'search' => request('search', ''),
            ],
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Student/Create', ['students' => $this->getStudents()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        Student::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        $user = [
            'id' => $student->id,
            'user_id' => $student->user_id,
        ];

        return inertia('Student/Edit', ['students' => $this->getStudents(), 'user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->update(['archive_at' => null]);
        $student->delete();
    }

    public function moveArchive(Student $student)
    {
        $student->update(['archive_at' => now()]);
    }

    public function restoreArchive(Student $student)
    {
        $student->update(['archive_at' => null]);
    }

    public function restore($id)
    {
        $student = Student::withTrashed()->find($id);
        $student->restore();
    }

    public function forceDelete($id)
    {
        $student = Student::withTrashed()->find($id);
        $student->forceDelete();
    }

    private function getStudents()
    {
        return Cache::remember('students', now()->addHours(24), function () {
            return User::whereHas('roles', function ($role) {
                return $role->where('name', RoleEnum::STUDENT);
            })->select(['id', 'name'])->orderBy('name', 'asc')->get();
        });
    }
}
