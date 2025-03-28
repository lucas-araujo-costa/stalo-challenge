<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Teste',
            'email' => 'teste@example.com',
            'password' => bcrypt('123456'),
        ]);
    }
}
