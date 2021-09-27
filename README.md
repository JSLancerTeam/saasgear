# [SaaSgear](https://github.com/JSLancerTeam/saasgear)

ReactJS and NodeJS SaaS boilerplate for your next SaaS application.

## Features
- **ReactJS:** High-performance and powerful interactive UI with React.
- **GraphQL API:** Fetching all the data you need with a single API call using GraphQL. Multiple GraphQL is merged in a single request.
- **Subscription payments:** We have integrated Stripe subscription payments to allow you to monetize your SaaS.
- **Teams:** Your users are able to invite their teammates to their account.
- **Roles and Permissions:** Your users are only able to access the data and perform the actions that are allowed within their roles and permissions.
- **Authentication:** User authentication with email and password, or via Google, Github, Facebook. Signup, login, reset password are included out of the box.
- **Cross-browsers and mobile responsiveness:** Every single components have been tested across many different browsers and devices to make sure it works every where.
- **HTML Emails:** Send beautiful and responsive HTML emails to your customers with SendGrid and MJML.
- **Easy to upgrade:** Easy release is planned and tailored carefully to make sure your upgrade experience smooth and painless.

## Requirements
- NodeJS v14 or above
- Yarn or NPM
- MySQL

## Get started
- Clone this repo: `git clone https://github.com/JSLancerTeam/saasgear`
- Follow [this guide](https://github.com/JSLancerTeam/saasgear/blob/master/docs/prerequisite.md) to setup services and update .env file in `app` and `api` folder.
- Install NodeJS dependencies in `app` and `api`
- Follow [this guide](https://github.com/JSLancerTeam/saasgear/blob/master/docs/database.md) to setup MySQL database
- Set Stripe subscriptions `cd api && yarn run db:create-products`. You may need to update your subscription price and name before running this command. The script is located at `api/scripts/create-products`.
- Launch API server `cd api && yarn start`
- Launch front-end server `cd app && yarn start`

## Documents
[:loudspeaker: Introduction](https://github.com/JSLancerTeam/saasgear/blob/master/docs/introduction.md)

[:watermelon: Prerequisite services](https://github.com/JSLancerTeam/saasgear/blob/master/docs/prerequisite.md)

[:blue_square: Database & migration](https://github.com/JSLancerTeam/saasgear/blob/master/docs/database.md)

[:globe_with_meridians: GraphQL](https://github.com/JSLancerTeam/saasgear/blob/master/docs/graphql.md)

[:closed_lock_with_key: Authentication](https://github.com/JSLancerTeam/blob/master/saasgear/docs/authentication.md)

[:envelope: Email](https://github.com/JSLancerTeam/saasgear/blob/master/docs/mail.md)

[:credit_card: Stripe subscriptions](https://github.com/JSLancerTeam/saasgear/blob/master/docs/stripe.md)

[:ear_of_rice: Redux toolkit](https://github.com/JSLancerTeam/saasgear/blob/master/docs/redux-toolkit.md)

## Developers
- David Tran - [davidtran](http://github.com/davidtran)
- Leo Phan - [nhuthuy212507](https://github.com/nhuthuy212507)
- Clement Le - [tuananhitoct](https://github.com/tuananhitoct)

## Technology stack

### Front-end
![Frontend Stack](https://github.com/JSLancerTeam/saasgear/blob/documents/docs/images/front-end-stack2.png)

### Back-end
![API Stack](https://github.com/JSLancerTeam/saasgear/blob/documents/docs/images/backend-stack.png)

### Support databases
![Databasee Stack](https://github.com/JSLancerTeam/saasgear/blob/documents/docs/images/database-stack.png)

### Payment
![Payment Stack](https://github.com/JSLancerTeam/saasgear/blob/documents/docs/images/payment-stack.png)
<br />

## License
All code in this repository is provided under the MIT
<br>
