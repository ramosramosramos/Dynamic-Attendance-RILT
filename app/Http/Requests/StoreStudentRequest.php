<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
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
            'user_id' => ['required', 'numeric', 'exists:users,id', 'unique:students,user_id'],
        ];

    }

    public function messages()
    {
        return [
            'user_id.required' => 'The student field is required.',
            'user_id.exists' => "This student does not exist in user's table.",
            'user_id.unique' => 'This student is already exists.',
        ];
    }
}
