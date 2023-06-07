<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Pipedrive\Configuration;
use Pipedrive\Exceptions\OAuthProviderException;

class AuthenticatedSessionController extends Controller
{
    public function create(): RedirectResponse
    {
        return redirect()->route('auth.pipedrive');
    }

    /**
     * Destroy an authenticated session.
     *
     * @throws OAuthProviderException
     */
    public function destroy(Request $request): RedirectResponse
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

        try {
            $config->revokeToken('refresh_token');
        } finally {
            Auth::guard('web')->logout();

            $request->session()->invalidate();

            $request->session()->regenerateToken();

            return redirect('/');
        }
    }
}
