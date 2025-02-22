<?php

namespace Database\Seeders;

use App\Enum\RoleEnum;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
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

      $userAdmin =  User::create(
            [
                'name' => 'Kent Jerone Ramos',
                'email' => 'admin@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
                'remember_token' => Str::random(10),
            ]
        )->assignRole(RoleEnum::ADMIN);

        User::factory(100)->create();
        $users = User::whereNotIn('id', [$userAdmin->id])->get();
        $users->each(function ($user) {
            $user->assignRole(RoleEnum::USER);
        });
    }
}
