# [Saas Gear](https://github.com/JSLancerTeam/saasgear)

SaaS gear is a ReactJS and NodeJS SaaS boilerplate to help developers set up new SaaS project quickly.

## Requirements
- NodeJS v14 or above
- MySQL
## Get started
- Clone the repo: `git clone https://github.com/JSLancerTeam/saasgear`
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
