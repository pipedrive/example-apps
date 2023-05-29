<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Pipedrive\Client;
use Pipedrive\Configuration;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::getUser();

        $config = Config::get('auth.pipedrive');
        $client = new Client(
            $config['client_id'],
            $config['client_secret'],
            $config['redirect_uri'],
        );

        Configuration::$oAuthToken = (object) [
            'accessToken' => $user->access_token,
            'refreshToken' => $user->refresh_token,
            'expiry' => $user->expiry,
            'tokenType' => 'Bearer',
        ];

        $response = $client->getDeals()->getAllDeals([
            'limit' => 10,
            'status' => 'open',
        ]);

        return view('dashboard', [
            'items' => $response->data
        ]);
    }
}
