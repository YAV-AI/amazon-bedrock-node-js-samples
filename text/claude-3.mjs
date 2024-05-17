import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Create a BedrockRuntimeClient with your configuration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

const question = "Give me 5 random cat names";
const prompt = `
Human: You are a Cat name generator. Here are some instructions
<instructions>
Always respond in JSON with 2 keys
1. question: typeOf String
2. answer: typeOf Array
</instructions>
Question: ${question}
Assistant:
`;

const input = {
  // anthropic.claude-3-sonnet-20240229-v1:0
  modelId: "anthropic.claude-3-haiku-20240307-v1:0",
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
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
//     123, 34, 105, 100,  34,  58,  34, 109, 115, 103,  95,  48,
//      49, 81,  76,  84,  57, 114, 110,  74,  87, 103, 120,  75,
//     119, 54,  85, 122, 122,  54,  66, 118,  86,  52,  78,  34,
//      44, 34, 116, 121, 112, 101,  34,  58,  34, 109, 101, 115,
//     115, 97, 103, 101,  34,  44,  34, 114, 111, 108, 101,  34,
//      58, 34,  97, 115, 115, 105, 115, 116,  97, 110, 116,  34,
//      44, 34,  99, 111, 110, 116, 101, 110, 116,  34,  58,  91,
//     123, 34, 116, 121, 112, 101,  34,  58,  34, 116, 101, 120,
//     116, 34,  44,  34,
//     ... 296 more items
//   ]

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
//   id: 'msg_01QLT9rnJWgxKw6Uzz6BvV4N',
//   type: 'message',
//   role: 'assistant',
//   content: [
//     {
//       type: 'text',
//       text: '{\n' +
//         '  "question": "Give me 5 random cat names",\n' +
//         '  "answer": [\n' +
//         '    "Whiskers",\n' +
//         '    "Luna",\n' +
//         '    "Simba",\n' +
//         '    "Bella",\n' +
//         '    "Max"\n' +
//         '  ]\n' +
//         '}'
//     }
//   ],
//   model: 'claude-3-haiku-48k-20240307',
//   stop_reason: 'end_turn',
//   stop_sequence: null,
//   usage: { input_tokens: 70, output_tokens: 60 }
// }
