<?php

namespace Database\Seeders;

use App\Enum\RoleEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => RoleEnum::ADMIN]);
        Role::create(['name' => RoleEnum::TEACHER]);
        Role::create(['name' => RoleEnum::STUDENT]);
        Role::create(['name' => RoleEnum::USER]);

        $userAdmin = User::create(
            [
                'name' => 'Kent Jerone Ramos',
                'email' => 'admin@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
                'remember_token' => Str::random(10),
            ]
        )->assignRole(RoleEnum::ADMIN);
        $user = User::create(
            [
                'name' => 'Kent Jerone Ramos',
                'email' => 'user@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
                'remember_token' => Str::random(10),
            ]
        )->assignRole(RoleEnum::USER);

        User::factory(100)->create();
        $users = User::whereNotIn('id', [$userAdmin->id])->get();
        $users->each(function ($user) {
            $user->assignRole(fake()->randomElement([RoleEnum::STUDENT, RoleEnum::TEACHER]));
        });
    }
}
