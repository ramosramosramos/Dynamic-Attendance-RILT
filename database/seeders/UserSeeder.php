<?php

namespace Database\Seeders;

use App\Enum\PermissionEnum;
use App\Enum\RoleEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $this->createRoles();
        $this->createPermmisions();
        User::factory(100)->create();
        $this->createStudentsAndTeachers();
    }

    public function getAdmin()
    {
        return User::create(
            [
                'name' => 'Kent Jerone Ramos',
                'email' => 'admin@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
                'remember_token' => Str::random(10),
            ]
        )->assignRole(RoleEnum::ADMIN);
    }

    public function createStudentsAndTeachers()
    {
        $users = User::whereNotIn('id', [$this->getAdmin()->id])->get();
        $users->each(function ($user) {
            $user->assignRole(fake()->randomElement([RoleEnum::STUDENT, RoleEnum::TEACHER]));
        });
    }

    public function createRoles()
    {

        foreach (RoleEnum::cases() as $role) {
            Role::create(['name' => $role->value]);
        }
    }

    public function createPermmisions()
    {
        foreach (PermissionEnum::cases() as $permission) {
            Permission::create(['name' => $permission->value]);
        }
    }
}
