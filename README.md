# Siri Ultra

This is a Siri Ultra that works with Apple Shortcuts removing the need for a dedicated hardware device.

## How it works

The assistant is run on Cloudflare Workers and can work with any LLM model. The code snippet here uses llama 3 as an example with a custom function calling for fetching weather data and search online.

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
      [[kv_namespaces]]
      binding = "personal_ai_chats"
      id = "<id>"
      preview_id = "<preview_id>"
    ```

6. **Set up API keys**:

- Run `npx wrangler secret put API_KEY` to set the GROQ or OpenAI API key.
- Run `npx wrangler secret put OPENWEATHERMAP_API_KEY` to set the OpenWeather API key.
- Run `npx wrangler secret put SEARCH1API_KEY` to set the SEARCH1API_KEY API key.

   > **Note**: You can get these keys by signing up on [GroqCloud](https://console.groq.com/login) or [OpenAI](https://openai.com/) and [OpenWeather](https://home.openweathermap.org/users/sign_up) and [Search1API](https://www.search1api.com/) respectively.

7. **Update the LLMs Vars**:
   ```toml
      [vars]
      API_BASE= "https://api.groq.com/openai/v1/"
      MODEL="llama3-70b-8192"
      SYSTEM_PROMPT="You are Siri Pro. Answer in 1-2 sentences. Be friendly, helpful and concise. Default to metric units when possible. Keep the conversation short and sweet. You only answer in text. Don't include links or any other extras. Don't respond with computer code, for example don't return user longitude."
    ```


### Deploying the Worker

To deploy the worker, run `npx wrangler deploy`.

### Setting Up the Shortcut

1. **Install the shortcut**:
   - Use [this link](https://www.icloud.com/shortcuts/21cb74bb382c4e2298123ac375f9573a) to install the shortcut.

2. **Configure the shortcut**:
   - Open the shortcut and replace the `URL` field with your worker's URL.
   - If you didn't change the default name, the URL should be `https://personal-ai.<your-username>.workers.dev`.
