import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Create a BedrockRuntimeClient with your configuration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

const prompt = "red backpack on a table";

const input = {
  modelId: "amazon.titan-image-generator-v1",
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    textToImageParams: {
      text: prompt,
      negativeText: "people, faces",
    },
    taskType: "TEXT_IMAGE",
    imageGenerationConfig: {
      cfgScale: 8,
      // if you want to specify a seed value
      // seed: 0,
      quality: "standard", // or premium
      width: 512,
      height: 512,
      numberOfImages: 1,
    },
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

// body: Uint8ArrayBlobAdapter(518508) [Uint8Array] [
//     123,  34, 105, 109, 97, 103, 101, 115,  34,  58,  91,  34,
//     105,  86,  66,  79, 82, 119,  48,  75,  71, 103, 111,  65,
//      65,  65,  65,  78, 83,  85, 104,  69,  85, 103,  65,  65,
//      65, 103,  65,  65, 65,  65,  73,  65,  67,  65,  73,  65,
//      65,  65,  66,  55, 71, 107,  79, 116,  65,  65,  69,  65,
//      65,  69, 108,  69, 81,  86,  82,  52, 110,  70,  84,  57,
//      51,  90,  73, 106, 83,  55,  73, 114, 106,  65,  70, 119,
//     106, 121,  83,  55, 53,  57,  79,  70,  88, 108,  70, 118,
//     111,  65, 117,  57,
//     ... 518408 more items
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
// {
//   images: [
//     'iVBORw0KGgoAA...',
//     'siv03ldsnc...'
//   ]
//   error: null
// }

// Lets create the image from the base64 data
// If you have multiple images, handle this in a loop.
const base64ImageData = parsedResponse.images[0];

// Remove the data URI prefix if it exists
const base64Data = base64ImageData.replace(/^data:image\/\w+;base64,/, "");

// Create a buffer from the base64 data
const imageBuffer = Buffer.from(base64Data, "base64");

// Generate a timestamp (e.g., current date and time)
const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");

// Trim the prompt text to not exceed 20 characters
const trimmedPrompt = prompt.slice(0, 20);

// Remove all special characters from the prompt
const promptWithoutSpecialChars = trimmedPrompt.replace(/[^\w\s]/g, "");

// Create a prompt slug by replacing spaces with hyphens
const promptSlug = promptWithoutSpecialChars.replace(/\s+/g, "-");

// Get the current directory
const currentDir = dirname(fileURLToPath(import.meta.url));

// Define the "output" directory
const outputDirectory = path.join(currentDir, "output");

// Create the filename
const filename = `${timestamp}-${promptSlug}.png`;

// Construct the absolute file path
const filePath = path.join(outputDirectory, filename);

// Save the image buffer to the file
fs.writeFileSync(filePath, imageBuffer);

console.log("------------------------");
console.log("-------Image Path-------");
console.log("------------------------");
console.log(`Image saved to: ${filePath}`);
