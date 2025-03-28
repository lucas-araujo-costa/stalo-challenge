<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;

class TransactionSeeder extends Seeder
{
    public function run()
    {
        $transactions = [
            [
                'user_id' => 1,
                'amount' => 150.00,
                'cpf' => '12345678909', 
                'status' => 'Em processamento',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 1,
                'amount' => 250.75,
                'cpf' => '98765432100',
                'status' => 'Aprovada',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'user_id' => 1,
                'amount' => 99.90,
                'cpf' => '45678912345',
                'status' => 'Negada',
                'created_at' => now()->subDay(),
                'updated_at' => now()->subDay(),
            ],
            [
                'user_id' => 1,
                'amount' => 500.00,
                'cpf' => '11122233344',
                'status' => 'Em processamento',
                'created_at' => now()->subHours(5),
                'updated_at' => now()->subHours(5),
            ],
        ];

        foreach ($transactions as $transaction) {
            Transaction::create($transaction);
        }
    }
}
