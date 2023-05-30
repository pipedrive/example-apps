<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Pipedrive\Api\DealsApi;
use Pipedrive\Client;
use Pipedrive\Configuration;
use Pipedrive\Models\OAuthToken;

class DealPickController extends Controller
{
    /**
     * Handle the incoming request.
     * @throws Exception
     */
    public function __invoke(Request $request, string $id): RedirectResponse
    {
        $user = Auth::getUser();

        $config = Configuration::getDefaultConfiguration();
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

        $status = random_int(0, 1) ? 'won' : 'lost';

        $dealsApiInstance = new DealsApi(null, $config);
        $deal = $dealsApiInstance->getDeal($id)->getData();

        $dealsApiInstance->updateDeal($id, [
            'status' => $status,
        ]);

        if ($status === 'won') {
            return redirect('dashboard')->with('won', "Deal {$deal['title']} has been won");
        } else {
            return redirect('dashboard')->with('lost', "Deal {$deal['title']} has been lost");
        }
    }
}
