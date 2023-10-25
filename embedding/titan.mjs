import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Create a BedrockRuntimeClient with your configuration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

const input = {
  modelId: "amazon.titan-embed-text-v1",
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    inputText: "this is where you place your input text",
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

// response.body
//
// Uint8ArrayBlobAdapter(16954) [Uint8Array] [
//     123, 34, 101, 109, 98, 101, 100, 100, 105, 110, 103, 34,
//      58, 91,  48,  46, 57,  49,  55,  57,  54,  56,  55, 53,
//      44, 48,  46,  50, 56,  49,  50,  53,  44,  45,  48, 46,
//      53, 51,  53,  49, 53,  54,  50,  53,  44,  48,  46, 54,
//      54, 55,  57,  54, 56,  55,  53,  44,  45,  48,  46, 57,
//      51, 51,  53,  57, 51,  55,  53,  44,  45,  48,  46, 52,
//      49, 48,  49,  53, 54,  50,  53,  44,  45,  48,  46, 48,
//      54, 52,  52,  53, 51,  49,  50,  53,  44,  45,  52, 46,
//      57, 50,  48,  57,
//     ... 16854 more items
//   ]

// // Save the raw response
const rawRes = response.body;

// Convert it to a JSON String
const jsonString = new TextDecoder().decode(rawRes);

// Parse the JSON string
const parsedResponse = JSON.parse(jsonString);

console.log("-------------------------");
console.log("---Pased Response Body---");
console.log("-------------------------");
console.log(parsedResponse);
// {
//   embedding: [
//       0.91796875,
//       ...
//   ]
// }

// Answers are in parsedResponse.embedding
console.log("-------------------------");
console.log("--------Embedding--------");
console.log("-------------------------");
console.log(parsedResponse.embedding);
console.log("-------------------------");
