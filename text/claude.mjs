import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Create a BedrockRuntimeClient with your configuration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

const prompt = `Hi! how are you?`;

const input = {
  // You can change the modelId
  // "anthropic.claude-v1"
  // "anthropic.claude-instant-v1"
  // "anthropic.claude-v2"
  // "anthropic.claude-v2:1"
  modelId: "anthropic.claude-instant-v1",
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    prompt: `\n\nHuman:${prompt}\n\nAssistant:`,
    max_tokens_to_sample: 300,
    temperature: 0.5,
    top_k: 250,
    top_p: 1,
  }),
};

// Create an InvokeModelCommand with the input parameters
const command = new InvokeModelCommand(input);

// Send the command to invoke the model and await the response
const response = await client.send(command);
console.log("-------------------");
console.log("---Full Response---");
console.log("-------------------");
console.log(response);

// response.body = Uint8ArrayBlobAdapter(65) [Uint8Array] [
//   123,  34,  99, 111, 109, 112, 108, 101, 116, 105, 111,
//   110,  34,  58,  34,  32,  73,  39, 109,  32, 119, 101,
//   108, 108,  44,  32, 116, 104,  97, 110, 107, 115,  33,
//    34,  44,  34, 115, 116, 111, 112,  95, 114, 101,  97,
//   115, 111, 110,  34,  58,  34, 115, 116, 111, 112,  95,
//   115, 101, 113, 117, 101, 110,  99, 101,  34, 125
// ]

// Save the raw response
const rawRes = response.body;

// Convert it to a JSON String
const jsonString = new TextDecoder().decode(rawRes);

// Parse the JSON string
const parsedResponse = JSON.parse(jsonString);

console.log("-------------------------");
console.log("---Parsed Response Body---");
console.log("-------------------------");
// Answers are in parsedResponse.completion
console.log(parsedResponse);
console.log("-------------------------");
// Output:
// {
//   completion: " I'm doing well, thanks for asking!",
//   stop_reason: 'stop_sequence'
// }
