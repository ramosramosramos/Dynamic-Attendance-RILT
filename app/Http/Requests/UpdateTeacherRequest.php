<?php

namespace App\Http\Requests;

use App\Models\Teacher;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTeacherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id'=>['required','numeric','exists:users,id',Rule::unique(Teacher::class)->ignore(request()->route()->parameter('teacher')->id)],
        ];

    }
    public function messages(){
        return [
            'user_id.required' => 'The teacher field is required.',
            'user_id.exists' => "This teacher does not exist in user's table.",
            'user_id.unique' => 'This teacher is already exists.',
        ];
    }
}
