# [:watermelon: Prerequisite services](https://github.com/JSLancerTeam/saasgear/docs/prerequisite.md)
We use the following third-party services in SaaSgear.

- Mailgun
- Stripe
- Sentry (optional)
- Facebook, Github, Google (optional)
- Google Analytics (optional)

## **Stripe**

Subscription and payment are handled by Stripe. This is the best payment service at this moment for developers.

Please follow the guide at here to setup a Stripe account: [https://support.suredone.com/support/solutions/articles/1000244502-how-to-setup-stripe-account](https://support.suredone.com/support/solutions/articles/1000244502-how-to-setup-stripe-account)

After that you need to copy API key and API secret into **api/.env**

```jsx
STRIPE_PRIVATE_KEY=[YOUR_STRIPE_KEY]
```

## **Mailgun**

Emails in SaaSgear are sent using mailgun. It's a cheap and reliable transaction email service.

Follow the guide at here to create an mailgun account: [https://www.mailgun.com/](https://www.mailgun.com/)

After that you can copy the mailgun api key and secret into **api/.env:**

```jsx
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
MAIL_FROM=
```

## **Sentry**

Sentry is an application monitor and error logging service. Using Sentry, we can ensure that every error in front-end and backend API is logged so we can check later.

Create a Sentry account here: [https://sentry.io/signup/](https://sentry.io/signup/)

After that you can login into Sentry dashboard and copy the api key into .env files

**api/.env**

```jsx
SENTRY_DSN=XXXX
```

**app/.env**

```jsx
REACT_APP_SENTRY_DSN
```

In case Sentry is not enabled, errors in backend API are still logged and stored in api/logs folder.

## **Github login**

In order to authenticate user with Github, you need to create a Github app. Please follow the guide here: [https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/)

After you have obtain Github app secret key, you can use in our project:

**api/.env**

```jsx
GITHUB_CLIENT_KEY=
GITHUB_SECRET_KEY=
```

**app/.env**

```jsx
REACT_APP_GITHUB_CLIENT_KEY=
```

## Facebook login

In order to authenticate user with Facebook, you also need to create a Facebook app. Please follow the guide here: [https://developers.facebook.com/docs/facebook-login/web](https://developers.facebook.com/docs/facebook-login/web)

After you have created your Facebook app, you can put Facebook app config into .env file:

**api/.env**

```jsx
FACEBOOK_CLIENT_KEY=
FACEBOOK_CLIENT_SECRET_KEY=
```

**app/.env**

```jsx
REACT_APP_FACEBOOK_CLIENT_KEY=
```

## Google login

In order to authencate user with Google, you need setup credentials for Google OAuth. Please follow the guide here: [https://developers.google.com/identity/sign-in/web/sign-in](https://developers.google.com/identity/sign-in/web/sign-in)

After you have created your Google credentials , you can put credentials information into .env file:

**api/.env**

```jsx
GOOGLE_CLIENT_KEY=
GOOGLE_SECRET_KEY=
```

**app/.env**

```jsx
REACT_APP_GOOGLE_CLIENT_KEY=
```

## Google Analytics

Please follow the guide here to obtain Google Analytics tracking ID: [https://support.google.com/analytics/answer/1008080?hl=en](https://support.google.com/analytics/answer/1008080?hl=en)

And then copy the tracking ID into .env file

**app/.env**

```jsx
REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID=
```
