<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;
use Pipedrive\APIException;
use Pipedrive\Client;
use Pipedrive\Configuration;
use Pipedrive\Exceptions\OAuthProviderException;

class PipedriveController extends Controller
{
    public function create(): RedirectResponse
    {
        $config = Config::get('auth.pipedrive');

        $client = new Client(
            $config['client_id'],
            $config['client_secret'],
            $config['redirect_uri'],
        );

        return redirect()->to($client->auth()->buildAuthorizationUrl());
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws APIException
     */
    public function handle(Request $request): RedirectResponse
    {
        $code = $request->input('code');

        $config = Config::get('auth.pipedrive');

        $client = new Client(
            $config['client_id'],
            $config['client_secret'],
            $config['redirect_uri'],
        );

        try {
            $token = $client->auth()->authorize($code);

            $result = $client->getUsers()->getCurrentUserData();

            $user = User::query()->firstOrNew([
                'company_id' => $result->data->companyId,
                'user_id' => $result->data->id,
            ]);

            $user->fill([
                'name' => $result->data->name,
                'company_id' => $result->data->companyId,
                'user_id' => $result->data->id,
                'company_domain' => $result->data->companyDomain,
                'access_token' => $token->accessToken,
                'refresh_token' => $token->refreshToken,
                'expiry' => $token->expiry,
            ]);
            $user->save();

            event(new Registered($user));

            Auth::login($user);

            return redirect(RouteServiceProvider::HOME);
        } catch (OAuthProviderException $exception) {
            dd($exception->getResponseBody());
        }
    }
}
