<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::where('user_id', Auth::id())->get();
        return response()->json($transactions, 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'amount' => 'required|numeric',
            'cpf' => 'required|string|size:14|regex:/^\d{3}\.\d{3}\.\d{3}-\d{2}$/',
            'status' => 'required|in:Em processamento,Aprovada,Negada',
            'document' => 'nullable|file|mimes:pdf,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('document')) {
            $data['document'] = $request->file('document')->store('documents', 'public');
        }

        $data['cpf'] = preg_replace('/\D/', '', $data['cpf']);
        $data['user_id'] = Auth::id();

        $transaction = Transaction::create($data);
        return response()->json($transaction, 201);
    }

    public function show($id)
    {
        $transaction = Transaction::where('user_id', Auth::id())->findOrFail($id);
        return response()->json($transaction, 200);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::where('user_id', Auth::id())->findOrFail($id);
        $data = $request->validate([
            'amount' => 'required|numeric',
            'cpf' => 'required|string|size:14|regex:/^\d{3}\.\d{3}\.\d{3}-\d{2}$/',
            'status' => 'required|in:Em processamento,Aprovada,Negada',
            'document' => 'nullable|file|mimes:pdf,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('document')) {
            if ($transaction->document) {
                \Storage::disk('public')->delete($transaction->document);
            }
            $data['document'] = $request->file('document')->store('documents', 'public');
        }

        $data['cpf'] = preg_replace('/\D/', '', $data['cpf']);
        $transaction->update($data);

        return response()->json($transaction, 200);
    }

    public function destroy($id)
    {
        $transaction = Transaction::where('user_id', Auth::id())->findOrFail($id);
        $transaction->delete();
        return response()->json(['message' => 'Transação excluída com sucesso!'], 200);
    }
}
