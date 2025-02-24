<?php

namespace App\Enum;

enum PermissionEnum: string
{
    case USERS_MANAGE = 'manage users';
    case USERS_CREATE = 'create users';
    case USERS_EDIT = 'edit users';
    case USERS_DELETE = 'delete users';
    case USERS_ARCHIVE = 'archive users';
    case USERS_RESTORE_ARCHIVE = 'restore archive users';
    case USERS_BIN = 'bin users';
    case USERS_RESTORE = 'restore users';
    case USERS_FORCEDELETE = 'force delete users';

    case TEACHERS_MANAGE = 'manage teachers';
    case TEACHERS_CREATE = 'create teachers';
    case TEACHERS_EDIT = 'edit teachers';
    case TEACHERS_DELETE = 'delete teachers';
    case TEACHERS_ARCHIVE = 'archive teachers';
    case TEACHERS_RESTORE_ARCHIVE = 'restore archive teachers';
    case TEACHERS_BIN = 'bin teachers';
    case TEACHERS_RESTORE = 'restore teachers';
    case TEACHERS_FORCEDELETE = 'force delete teachers';

    case STUDENTS_MANAGE = 'manage students';
    case STUDENTS_CREATE = 'create students';
    case STUDENTS_EDIT = 'edit students';
    case STUDENTS_DELETE = 'delete students';
    case STUDENTS_ARCHIVE = 'archive students';
    case STUDENTS_RESTORE_ARCHIVE = 'restore archive students';
    case STUDENTS_BIN = 'bin students';
    case STUDENTS_RESTORE = 'restore students';
    case STUDENTS_FORCEDELETE = 'force delete students';
    case TEACH = 'teach';
}
