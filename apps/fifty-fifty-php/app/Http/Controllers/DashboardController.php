<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\View\View;
use Pipedrive\Api\DealsApi;
use Pipedrive\Configuration;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @throws Exception|GuzzleException
     */
    public function __invoke(Request $request): View
    {
        /** @var User $user */
        $user = Auth::getUser();

        $config = new Configuration();
        $config->setClientId(Config::get('auth.pipedrive.client_id'));
        $config->setClientSecret(Config::get('auth.pipedrive.client_secret'));
        $config->setOauthRedirectUri(Config::get('auth.pipedrive.redirect_uri'));

        $config->setAccessToken($user->access_token);
        $config->setRefreshToken($user->refresh_token);
        $config->setExpiresAt($user->expiry);

        $config->setOAuthTokenUpdateCallback(function () use ($config, $user) {
            User::query()->where([
                'company_id' => $user->company_id,
                'user_id' => $user->user_id,
            ])->update([
                'access_token' => $config->getAccessToken(),
                'refresh_token' => $config->getRefreshToken(),
                'expiry' => $config->getExpiresAt(),
            ]);
        });

        $dealsApiInstance = new DealsApi(null, $config);
        $deals = $dealsApiInstance->getDeals(
            null,
            null,
            null,
            'open',
            0,
            10,
        )->getData();

        return view('dashboard', [
            'items' => $deals,
        ]);
    }
}
