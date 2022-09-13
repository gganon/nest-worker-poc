## NestJS + Worker thread

Just a quick POC using a Node Worker Thread to offload computation for a NestJS API onto a separate thread

#### Try it out

Install dependencies

```
yarn install
```

Start the server

```
yarn start
```

Call the POST API that uses a long running worker thread

```
curl --location --request POST 'localhost:3000/strong-hash' \
--header 'Content-Type: application/json' \
--data-raw '{
    "input": "my scret"
}'
```

#### What's happening

This server exposes a `/strong-hash` POST API that hashes a given input string with PBKDF2-HMAC-SHA512 with 2,000,000 iterations which can take a while to compute. This work is offloaded to a worker thread to keep the main server thread free to process other incoming requests.

You can follow the code for this API starting from the `getStrongHash()` function in `src/app.controller.ts`

#### Caveats

The worker thread + TypeScript setup doesn't seem to work well with Jest tests.
