<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Pipedrive\Api\DealsApi;
use Pipedrive\Configuration;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::getUser();

        $config = Configuration::getDefaultConfiguration();
        $config->setClientId(Config::get('auth.pipedrive.client_id'));
        $config->setClientSecret(Config::get('auth.pipedrive.client_secret'));
        $config->setOauthRedirectUri(Config::get('auth.pipedrive.redirect_uri'));

        $config->setAccessToken($user->access_token);
        $config->setRefreshToken($user->refresh_token);
        $config->setExpiresAt($user->expiry);

        $dealsApiInstance = new DealsApi(null, $config);
        $response = $dealsApiInstance->getDeals(
            null,
            null,
            null,
            'open',
            0,
            10,
        );

        return view('dashboard', [
            'items' => $response->getData()
        ]);
    }
}
