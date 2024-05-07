# Personal AI

This is a personal AI assistant that works with Apple Shortcuts removing the need for a dedicated hardware device.

## How it works

The assistant is run on Cloudflare Workers and can work with any LLM model. The code snippet here uses llama 3 as an example with a custom function calling for fetching weather data.

## Setting Up the Shortcut

### Getting Started

1. **Clone the repository**:
   - Clone this repository and navigate to the root directory.

2. **Install dependencies**:
   - Run `npm install` to install the necessary dependencies.

3. **Authenticate with Cloudflare**:
   - Run `npx wrangler login` to log in to your Cloudflare account.

4. **Create KV namespaces**:
   - Run `npx wrangler kv:namespace create chats` to create a KV namespace. Note down the ID.
   - Run `npx wrangler kv:namespace create chats --preview` to create a preview KV namespace. Note down the ID.

5. **Configure the project**:
   - Update `wrangler.toml` with the namespace IDs:

   ```toml
   kv_namespaces = [
    { binding = "personal_ai_chats", id = "<id>", preview_id = "<preview_id>"}
   ]
    ```

6. **Set up API keys**:

- Run `npx wrangler secret put GROQ_API_KEY` to set the GROQ API key.
- Run `npx wrangler secret put OPENWEATHERMAP_API_KEY` to set the OpenWeather API key.

   > **Note**: You can get these keys by signing up on [GroqCloud](https://console.groq.com/login) and [OpenWeather](https://home.openweathermap.org/users/sign_up) respectively.

### Deploying the Worker

To deploy the worker, run `npx wrangler deploy`.

### Setting Up the Shortcut

1. **Install the shortcut**:
   - Use [this link](https://www.icloud.com/shortcuts/284c0f68f7b0450ebab0b19e9adc317f) to install the shortcut.

2. **Configure the shortcut**:
   - Open the shortcut and replace the `URL` field with your worker's URL.
   - If you didn't change the default name, the URL should be `https://personal-ai.<your-username>.workers.dev`.
