<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;
use Pipedrive\Api\UsersApi;
use Pipedrive\APIException;
use Pipedrive\Client;
use Pipedrive\Configuration;
use Pipedrive\Exceptions\OAuthProviderException;

class PipedriveController extends Controller
{
    public function create(): RedirectResponse
    {
        $config = Configuration::getDefaultConfiguration();
        $config->setClientId(Config::get('auth.pipedrive.client_id'));
        $config->setClientSecret(Config::get('auth.pipedrive.client_secret'));
        $config->setOauthRedirectUri(Config::get('auth.pipedrive.redirect_uri'));

        return redirect()->to($config->getAuthorizationPageUrl());
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws APIException
     */
    public function handle(Request $request): RedirectResponse
    {
        $code = $request->input('code');

        $config = Configuration::getDefaultConfiguration();
        $config->setClientId(Config::get('auth.pipedrive.client_id'));
        $config->setClientSecret(Config::get('auth.pipedrive.client_secret'));
        $config->setOauthRedirectUri(Config::get('auth.pipedrive.redirect_uri'));
        $config->setOAuthTokenUpdateCallback(function ($token) use ($config) {
            return $token;
        });

        try {
            $config->authorize($code);

            $usersApiInstance = new UsersApi(null, $config);
            $currentUserData = $usersApiInstance->getCurrentUser()->getData();

            $user = User::query()->firstOrNew([
                'company_id' => $currentUserData->getCompanyId(),
                'user_id' => $currentUserData->getId(),
            ]);

            $user->fill([
                'name' => $currentUserData->getName(),
                'company_domain' => $currentUserData->getCompanyDomain(),
                'access_token' => $config->getAccessToken(),
                'refresh_token' => $config->getRefreshToken(),
                'expiry' => $config->getExpiresAt(),
            ]);
            $user->save();

            event(new Registered($user));

            Auth::login($user);

            return redirect(RouteServiceProvider::HOME);
        } catch (GuzzleException $exception) {
            dd($exception);
        } catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }
}
