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
use Illuminate\Validation\UnauthorizedException;
use Illuminate\View\View;
use Pipedrive\Api\UsersApi;
use Pipedrive\Client;
use Pipedrive\Configuration;
use Pipedrive\Exceptions\OAuthProviderException;
use Pipedrive\Model\BaseUserMe;
use Pipedrive\Model\Unauthorized;

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
     * @param Request $request
     * @return RedirectResponse
     */
    public function handle(Request $request): RedirectResponse
    {
        $code = $request->input('code');

        $config = Configuration::getDefaultConfiguration();
        $config->setClientId(Config::get('auth.pipedrive.client_id'));
        $config->setClientSecret(Config::get('auth.pipedrive.client_secret'));
        $config->setOauthRedirectUri(Config::get('auth.pipedrive.redirect_uri'));
        $config->setOAuthTokenUpdateCallback(function ($token) {
            return $token;
        });

        $config->authorize($code);

        $usersApiInstance = new UsersApi(null, $config);

        $currentUserData = $usersApiInstance->getCurrentUser();

        if ($currentUserData instanceof Unauthorized) {
            throw new UnauthorizedException();
        }

        $currentUser = $currentUserData->getData();

        if (is_null($currentUser)) {
            return redirect(RouteServiceProvider::HOME);
        }

        $user = User::query()->firstOrNew([
            'company_id' => $currentUser->getCompanyId(),
            'user_id' => $currentUser->getId(),
        ]);

        $user->fill([
            'name' => $currentUser->getName(),
            'company_domain' => $currentUser->getCompanyDomain(),
            'access_token' => $config->getAccessToken(),
            'refresh_token' => $config->getRefreshToken(),
            'expiry' => $config->getExpiresAt(),
        ])->save();

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
