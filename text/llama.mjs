import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Create a BedrockRuntimeClient with your configuration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

const prompt = `
[INST]You are a very intelligent bot with exceptional critical thinking[/INST]
I went to the market and bought 10 apples.
I gave 2 apples to your friend and 2 to the helper.
I then went and bought 5 more apples and ate 1.
How many apples did I remain with?
Let's think step by step
`;

const input = {
  // You can change the modelId
  // meta.llama2-70b-chat-v1
  modelId: "meta.llama2-13b-chat-v1",
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    prompt,
    max_gen_len: 512,
    temperature: 0.5,
    top_p: 0.9,
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
//   generation: '\n' +
//     'First, I gave 2 apples to your friend, so I have 10 - 2 = 8 apples left.\n' +
//     'Next, I gave 2 apples to the helper, so I have 8 - 2 = 6 apples left.\n' +
//     'Then, I went and bought 5 more apples, so I have 6 + 5 = 11 apples left.\n' +
//     'Finally, I ate 1 apple, so I have 11 - 1 = 10 apples left.\n' +
//     '\n' +
//     'So, I remain with 10 apples.',
//   prompt_token_count: 89,
//   generation_token_count: 128,
//   stop_reason: 'stop'
// }
