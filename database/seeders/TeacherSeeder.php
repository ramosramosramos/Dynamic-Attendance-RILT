<?php

namespace Database\Seeders;

use App\Enum\RoleEnum;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = User::whereHas('roles',function($role){
            return $role->where('name',RoleEnum::TEACHER->value);
        })->get();

        $teachers->each(function($teacher){
            Teacher::create(['user_id'=>$teacher->id]);
        });
    }
}
