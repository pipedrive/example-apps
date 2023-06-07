<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\UnauthorizedException;
use Pipedrive\Api\UsersApi;
use Pipedrive\Configuration;
use Pipedrive\Model\Unauthorized;

class PipedriveController extends Controller
{
    public function create(): RedirectResponse
    {
        $config = new Configuration();
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
     * @throws Exception|GuzzleException
     */
    public function handle(Request $request): RedirectResponse
    {
        $code = $request->input('code');

        $config = new Configuration();
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
