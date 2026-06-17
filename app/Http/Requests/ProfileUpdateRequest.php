<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'profile_photo' => [
                'nullable',
                'file',
                'max:2048',
                function (string $attribute, mixed $value, \Closure $fail) {
                    if ($value instanceof \Illuminate\Http\UploadedFile) {
                        $extension = strtolower($value->getClientOriginalExtension());
                        $allowedExtensions = ['jpeg', 'png', 'jpg', 'gif'];
                        if (!in_array($extension, $allowedExtensions)) {
                            $fail('Format file foto profil harus berupa jpeg, png, jpg, atau gif.');
                        }
                    }
                },
            ],
        ];
    }
}
