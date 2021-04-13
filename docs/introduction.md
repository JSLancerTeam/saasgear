# [:loudspeaker: Introduction](https://github.com/JSLancerTeam/saasgear/docs/introduction.md)
  
SaaSgear is a ReactJS and NodeJS SaaS boilerplate to help developers setup new SaaS project quickly.  
  
**Features:**  
- **ReactJS:** High-performance and ****powerful interactive UI with React.
- **GraphQL API:** Fetching all the data you need with a single API call using GraphQL. Multiple GraphQL is merged in a single request.
- **Subscription payments:** We have integrated Stripe subscription payments to allow you to monetize your SaaS.
- **Teams:** Your users are able to invite their teammates to their account.
- **Roles and Permissions:** Your users are only able to access the data and perform the actions that are allowed within their roles and permissions.
- **Authentication:** User authentication with email and password, or via Google, Github, Facebook. Signup, login, reset password are included out of the box.
- **Cross-browsers and mobile responsiveness:** Every single components have been tested across many different browsers and devices to make sure it works every where.
- **HTML Emails:** Send beautiful and responsive HTML emails to your customers with SendGrid and MJML.
- **Easy to upgrade:** Easy release is planned and tailored carefully to make sure your upgrade experience smooth and painless.
  
This project is consist of 2 sub projects:

**Structure**
- **App**: This is the main SaaS application. It is made by ReactJS. We use the container and component patterns to keep the app easy to modify and add new features.
- **API server**: A secure and high performance GraphQL API backend.

**Technical specficiation:**

- We use the best practice for both frontend ReactJS and backend NodeJS to make it high performance and also easy to upgrade and modify as your wish.
- Reponsive and cross-browser UI.
- Users can log in using email or any major social-media providers include Github, Facebook, Apple, Google. Social media login is optional and you can omit it from the project.
- Configuration data is loaded by dotenv.
- Data fetching by GraphQL.
- Heavy and time consuming tasks are handled by a Redis and NodeJS queue.
- Responsive email templates by MJML.
- Emails are sent via Mailgun (developers can switch to other email services like Mailgun or ses very easy)
- Errors and warnings are logged by Sentry
- Form validation by react-hook-form.
