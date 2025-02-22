<?php

namespace App\Enum;

enum RoleEnum :string
{
    case ADMIN = 'admin';
    case STUDENT = 'student';
    case TEACHER = 'teacher';
    case USER = 'user';
}
