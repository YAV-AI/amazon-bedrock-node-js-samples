import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Create a BedrockRuntimeClient with your configuration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

const input = {
  modelId: "cohere.command-text-v14",
  contentType: "application/json",
  accept: "*/*",
  body: JSON.stringify({
    prompt: 'Translate the word "Good Morning" to French',
    max_tokens: 400,
    temperature: 0.75,
    p: 0.01,
    k: 0,
    stop_sequences: [],
    return_likelihoods: "NONE",
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
// Uint8ArrayBlobAdapter(250) [Uint8Array] [
//     123,  34, 103, 101, 110, 101, 114,  97, 116, 105, 111, 110,
//     115,  34,  58,  91, 123,  34, 105, 100,  34,  58,  34,  52,
//      48,  98, 102, 102,  98, 100,  48,  45,  55,  49,  52,  51,
//      45,  52,  52,  53,  51,  45,  57,  49,  54, 100,  45,  97,
//      57,  51,  53,  98,  50,  55,  98,  51, 100,  57,  97,  34,
//      44,  34, 116, 101, 120, 116,  34,  58,  34,  32,  84, 104,
//     101,  32,  97, 110, 115, 119, 101, 114,  32, 105, 115,  32,
//      66, 111, 110, 106, 111, 117, 114,  32, 105, 115,  32, 116,
//     104, 101,  32,  70,
//     ... 150 more items
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
console.log("-------------------------");
// Output:
// {
//   generations: [
//     {
//       id: '6e7079d3-fbb4-477d-aa94-b1690f501c09',
//       text: ' The answer is Bonjour is the French translation of Good Morning.'
//     }
//   ],
//   id: '64bdce94-6148-4836-bb13-ebbb3df68390',
//   prompt: 'Translate the word "Good Morning" to French\n\nBonjour'
// }

// Answers are in parsedResponse.generations
console.log("-------------------------");
console.log("----Generation Result----");
console.log("-------------------------");
// Answers are in parsedResponse.generations[0].data.text
console.log(parsedResponse.generations[0].text);
console.log("-------------------------");
