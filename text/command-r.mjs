import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Create a BedrockRuntimeClient with your configuration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

const prompt = `
You are an expert in data formatting. For the following csv data, output it as json.
Output the json only.

\`\`\`
name,age,occupation
Jane Smith,25,Data Scientist
Bob Johnson,42,Software Developer
Emily Davis,37,Product Manager
\`\`\`
`;

const input = {
  // cohere.command-r-plus-v1:0
  modelId: "cohere.command-r-v1:0",
  contentType: "application/json",
  accept: "*/*",
  body: JSON.stringify({
    message: prompt,
    max_tokens: 400,
    temperature: 0.75,
    p: 0.01,
    k: 0,
    stop_sequences: [],
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
//   Uint8ArrayBlobAdapter(975) [Uint8Array] [
//     123,  34,  99, 104,  97, 116,  95, 104, 105, 115, 116, 111,
//     114, 121,  34,  58,  91, 123,  34, 109, 101, 115, 115,  97,
//     103, 101,  34,  58,  34,  92, 110,  89, 111, 117,  32,  97,
//     114, 101,  32,  97, 110,  32, 101, 120, 112, 101, 114, 116,
//      32, 105, 110,  32, 100,  97, 116,  97,  32, 102, 111, 114,
//     109,  97, 116, 116, 105, 110, 103,  46,  32,  70, 111, 114,
//      32, 116, 104, 101,  32, 102, 111, 108, 108, 111, 119, 105,
//     110, 103,  32,  99, 115, 118,  32, 100,  97, 116,  97,  44,
//      32, 111, 117, 116,
//     ... 875 more items
//   ]

// // Save the raw response
const rawRes = response.body;

// Convert it to a JSON String
const jsonString = new TextDecoder().decode(rawRes);

// Parse the JSON string
const parsedResponse = JSON.parse(jsonString);

console.log("-------------------------");
console.log("---Parsed Response Body---");
console.log("-------------------------");
console.log(parsedResponse);
console.log("-------------------------");
// Output:
// {
//   chat_history: [
//     {
//       message: '\n' +
//         'You are an expert in data formatting. For the following csv data, output it as json.\n' +
//         'Output the json only.\n' +
//         '\n' +
//         '```\n' +
//         'name,age,occupation\n' +
//         'Jane Smith,25,Data Scientist\n' +
//         'Bob Johnson,42,Software Developer\n' +
//         'Emily Davis,37,Product Manager\n' +
//         '```\n',
//       role: 'USER'
//     },
//     {
//       message: '```json\n' +
//         '[\n' +
//         '    {"name":"Jane Smith","age":25,"occupation":"Data Scientist"},\n' +
//         '    {"name":"Bob Johnson","age":42,"occupation":"Software Developer"},\n' +
//         '    {"name":"Emily Davis","age":37,"occupation":"Product Manager"}\n' +
//         ']\n' +
//         '```',
//       role: 'CHATBOT'
//     }
//   ],
//   finish_reason: 'COMPLETE',
//   generation_id: '57d52911-83cc-4902-967c-d7dc0195e20b',
//   response_id: '87ce6c02-4d2f-43c4-b017-608bdef5026e',
//   text: '```json\n' +
//     '[\n' +
//     '    {"name":"Jane Smith","age":25,"occupation":"Data Scientist"},\n' +
//     '    {"name":"Bob Johnson","age":42,"occupation":"Software Developer"},\n' +
//     '    {"name":"Emily Davis","age":37,"occupation":"Product Manager"}\n' +
//     ']\n' +
//     '```'
// }

console.log("-------------------------");
console.log("----Generation Result----");
console.log("-------------------------");
// Answers are in parsedResponse.text
console.log(parsedResponse.text);
console.log("-------------------------");
