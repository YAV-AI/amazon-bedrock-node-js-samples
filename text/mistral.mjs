import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Create a BedrockRuntimeClient with your configuration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

const prompt = `
<s>[INST] What is your favourite condiment? [/INST]
Well, I'm quite partial to a good squeeze of fresh lemon juice. 
It adds just the right amount of zesty flavour to whatever I'm cooking up in the kitchen!</s> 
[INST] Do you have mayonnaise recipes? [/INST]
`;

const input = {
  // You can change the modelId
  // mistral.mistral-7b-instruct-v0:2
  modelId: "mistral.mixtral-8x7b-instruct-v0:1",
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    prompt,
    max_tokens: 400,
    top_k: 50,
    top_p: 0.7,
    temperature: 0.7,
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
console.log("---Pased Response Body---");
console.log("-------------------------");
// Answers are in parsedResponse.completion
console.log(parsedResponse);
console.log("-------------------------");
// Output:
// {
//   completion: " I'm doing well, thanks for asking!",
//   stop_reason: 'stop_sequence'
// }
