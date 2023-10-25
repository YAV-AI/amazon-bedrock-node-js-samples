import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Create a BedrockRuntimeClient with your configuration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

const input = {
  // You can change the modelId
  // "ai21.j2-mid-v1"
  // "ai21.j2-ultra-v1"
  modelId: "ai21.j2-mid-v1",
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    prompt: "How do you say Good Morning in French?",
    maxTokens: 200,
    temperature: 0.7,
    topP: 1,
    stopSequences: [],
    countPenalty: { scale: 0 },
    presencePenalty: { scale: 0 },
    frequencyPenalty: { scale: 0 },
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
//    Uint8ArrayBlobAdapter(1855)[Uint8Array][
//     123,  34, 105, 100,  34,  58,  49,  50,  51,  52,  44,  34,
//     112, 114, 111, 109, 112, 116,  34,  58, 123,  34, 116, 101,
//     120, 116,  34,  58,  34,  72, 111, 119,  32, 100, 111,  32,
//     121, 111, 117,  32, 115,  97, 121,  32,  71, 111, 111, 100,
//      32,  77, 111, 114, 110, 105, 110, 103,  32, 105, 110,  32,
//      70, 114, 101, 110,  99, 104,  63,  34,  44,  34, 116, 111,
//     107, 101, 110, 115,  34,  58,  91, 123,  34, 103, 101, 110,
//     101, 114,  97, 116, 101, 100,  84, 111, 107, 101, 110,  34,
//      58, 123,  34, 116,
//     ... 1755 more items
//   ]

// Save the raw response
const rawRes = response.body;

// Convert it to a JSON String
const jsonString = new TextDecoder().decode(rawRes);

// Parse the JSON string
const parsedResponse = JSON.parse(jsonString);

console.log("-------------------------");
console.log("---Pased Response Body---");
console.log("-------------------------");
console.log(parsedResponse);
console.log("-------------------------");
// Output:
// {
//   id: 1234,
//   prompt: {
//     text: 'How do you say Good Morning in French?',
//     tokens: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
//   },
//   completions: [ { data: [Object], finishReason: [Object] } ]
// }

console.log("-------------------------");
console.log("----Completion Result----");
console.log("-------------------------");
// Answers are in parsedResponse.completions[0].data.text
console.log(parsedResponse.completions[0].data.text);
console.log("-------------------------");
