<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Pipedrive\Client;
use Pipedrive\Configuration;
use Pipedrive\Models\OAuthToken;

class DealPickController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $id): RedirectResponse
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
        Configuration::$oAuthTokenUpdateCallback = function (OAuthToken $token) use ($user) {
            User::where([
                'company_id' => $user->company_id,
                'user_id' => $user->user_id,
            ])->update([
                'access_token' => $token->accessToken,
                'refresh_token' => $token->refreshToken,
                'expiry' => $token->expiry,
            ]);
        };

        $status = random_int(0, 1) ? 'won' : 'lost';

        $deal = $client->getDeals()->getDetailsOfADeal($id);

        $client->getDeals()->updateADeal([
            'id' => $id,
            'status' => $status
        ]);

        if ($status === 'won') {
            return redirect('dashboard')->with('won', "Deal {$deal->data->title} has been won");
        } else {
            return redirect('dashboard')->with('lost', "Deal {$deal->data->title} has been lost");
        }
    }
}
