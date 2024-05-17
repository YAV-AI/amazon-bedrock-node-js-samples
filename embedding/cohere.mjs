import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Create a BedrockRuntimeClient with your configuration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

const input = {
  //  cohere.embed-multilingual-v3
  modelId: "cohere.embed-english-v3",
  contentType: "application/json",
  accept: "*/*",
  body: JSON.stringify({
    texts: ["Hello world", "This is a test"],
    input_type: "search_document",
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
// Uint8ArrayBlobAdapter(25633) [Uint8Array] [
//     123,  34, 105, 100,  34,  58,  34,  99,  51,  50, 101,  50,
//      50,  56, 100,  45,  49,  55,  98, 102,  45,  52,  97, 100,
//     101,  45,  56,  98,  51, 102,  45,  48, 100,  99,  98,  99,
//      97,  48,  50,  55,  99,  49,  57,  34,  44,  34, 116, 101,
//     120, 116, 115,  34,  58,  91,  34, 104, 101, 108, 108, 111,
//      32, 119, 111, 114, 108, 100,  34,  44,  34, 116, 104, 105,
//     115,  32, 105, 115,  32,  97,  32, 116, 101, 115, 116,  34,
//      93,  44,  34, 101, 109,  98, 101, 100, 100, 105, 110, 103,
//     115,  34,  58,  91,
//     ... 25533 more items
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
console.log(parsedResponse);
// {
//   id: 'c32e228d-17bf-4ade-8b3f-0dcbca027c19',
//   texts: [ 'hello world', 'this is a test' ],
//   embeddings: [
//     [
//        -0.029205322,    -0.02357483,    -0.05987549,   -0.05819702,
//         -0.03540039,   -0.030151367,   -0.033294678,   0.054748535,
//       ... 924 more items
//     ],
//     [
//        -0.013885498,   0.009994507,   -0.03253174,  -0.024993896, -0.0102005005,
//        0.0002374649,   0.015380859, -0.0074310303, -0.0031375885,  -0.027282715,
//       ... 924 more items
//     ]
//   ],
//   response_type: 'embeddings_floats'
// }

// Answers are in parsedResponse.embeddings
console.log("-------------------------");
console.log("--------Embeddings--------");
console.log("-------------------------");
console.log(parsedResponse.embeddings);
console.log("-------------------------");
