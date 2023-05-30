<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use http\Exception\RuntimeException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Pipedrive\Api\DealsApi;
use Pipedrive\Configuration;
use Pipedrive\Model\UpdateDealRequest;

class DealPickController extends Controller
{
    /**
     * Handle the incoming request.
     * @throws Exception
     */
    public function __invoke(Request $request, string $id): RedirectResponse
    {
        /** @var User $user */
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

        $deal = $dealsApiInstance->getDeal((int) $id)->getData();

        if (is_null($deal)) {
            throw new RuntimeException('Fail');
        }

        $dealsApiInstance->updateDeal((int) $id, new UpdateDealRequest([
            'status' => $status,
        ]));

        if ($status === 'won') {
            return redirect('dashboard')->with('won', "Deal {$deal->getTitle()} has been won");
        } else {
            return redirect('dashboard')->with('lost', "Deal {$deal->getTitle()} has been lost");
        }
    }
}
