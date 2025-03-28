<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

Route::get('/', function () {
    dd(\App\Models\User::all());
    return 'This is your multi-tenant application. The id of the current tenant is ' . tenant('id');
});
