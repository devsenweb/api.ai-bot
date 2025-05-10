# Case & Claim Webhook API (Node.js)

This Node.js application exposes a webhook endpoint to handle conversational actions such as case creation, case status checks, and claim status retrieval. It was designed for integration with NLP tools like Dialogflow to automate customer service workflows for insurance or support systems.

---

## Features

- Accepts POST requests at `/webhook`
- Routes actions based on Dialogflow-style `result.action`:
  - `create.case`: Simulates a case creation process and returns a generated case number
  - `get.casestatus`: Fetches case status using an external service
  - `get.claimstatus`: Returns a predefined claim status message
- Uses HTTP POST calls to backend SOAP/REST endpoints
- Responds with a JSON object compatible with voice platforms (Dialogflow-style `speech` and `displayText`)
- Graceful error handling with fallback messages

---

## API Endpoints

### POST /webhook

Expected JSON input (Dialogflow-style format):

```json
{
  "result": {
    "action": "create.case",
    "contexts": [
      {
        "parameters": {
          "number": "123456"
        }
      }
    ]
  }
}
```

### Supported Actions

| Action             | Description                        |
|--------------------|------------------------------------|
| create.case        | Generates a random case number     |
| get.casestatus     | Retrieves case status via POST     |
| get.claimstatus    | Returns a static claim message     |

---

## Installation

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
npm install
```

---

## Running Locally

```bash
node index.js
```

The server will start on port `8080` by default.

---

## Notes

- Backend service endpoints use hardcoded URLs like:
  ```
  http://5fbafa2f0e824e3989f9627c568c53aa.cloudapp.net/Service1.svc/GetStatus
  ```
- These are placeholder/mock URLs and should be replaced with real backend service endpoints in production.
- The app assumes Dialogflow sends `result.contexts` and `result.action` objects in the request body.

---

## Example Response

```json
{
  "speech": "Your case status is pending",
  "displayText": "Your case status is pending"
}
```

---

## Error Handling

The app returns a default error message if something goes wrong:

```json
{
  "speech": "Oops!!! something went wrong",
  "displayText": "Oops!!! something went wrong"
}
```

---

## License

This project is for demonstration purposes and may need adaptation before being used in production.
