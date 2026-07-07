<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Karyawan;
use App\Models\Role;
use App\Models\User;
use App\Models\UserApplication;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function checkKaryawan($fid): JsonResponse
    {
        $karyawan = Karyawan::where('fid', $fid)->first();

        if (!$karyawan) {
            return response()->json([
                'success' => false,
                'message' => 'FID tidak ditemukan. Silakan hubungi tim IT.'
            ], 404);
        }

        $linked = User::where('fid', $fid)->exists();
        if ($linked) {
            return response()->json([
                'success' => false,
                'message' => 'FID ini sudah terdaftar. Silakan login.'
            ], 400);
        }

        return response()->json([
            'success' => true,
            'karyawan' => [
                'fid' => $karyawan->fid,
                'nama_karyawan' => $karyawan->nama_karyawan,
                'divisi' => $karyawan->divisi ?? 'Umum',
            ]
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'fid' => 'required|string|exists:karyawans,fid',
            'name' => 'required|string|max:255',
            'username' => 'required|string|alpha_dash|lowercase|max:255|unique:' . User::class,
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $roleUser = Role::where('name', 'user')->firstOrFail();

        $user = User::create([
            'fid' => $request->fid,
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $roleUser->id,
        ]);

        event(new Registered($user));

        $app = Application::firstOrCreate(
            ['slug' => 'shortly'],
            ['name' => 'Shortly', 'description' => 'Aplikasi pemendek kustom tautan internal.']
        );

        UserApplication::create([
            'user_id' => $user->id,
            'application_id' => $app->id,
            'is_active' => true,
            'approved_at' => now(),
        ]);

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
