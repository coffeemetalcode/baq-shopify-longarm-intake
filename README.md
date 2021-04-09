# BAQ Shopify Longarm Intake
## Tech Stack
### Server
* Node
* Express
### UI
* Angular
* Shopify Polaris CSS

## Development Setup
Start the development server from the project root folder
```bash
>$ npm start
```
(The development server starts on port `8989`)

In a separate terminal, start `ngrok`
```bash
>$ ngrok http 8989
```
Copy the `https` forwarding URL from the `ngrok` window into the "API Url" field in the Shopify App setup page. Add it to the "Allowed redirection URL(s)" by itself and also with the `/auth/callback` endpoint, and click "Save" to save the changes.

Choose "Apps" from the left pane, and choose "Longarm Intake." Under "Test your app," click "Select store." Click "Install app" to the right of the store you wish to test in.