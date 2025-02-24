<?php

namespace Database\Seeders;

use App\Enum\RoleEnum;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::whereHas('roles', function ($role) {
            return $role->where('name', RoleEnum::STUDENT->value);
        })->get();

        $students->each(function ($student) {
            Student::createQuietly(['user_id' => $student->id]);
        });
    }
}
