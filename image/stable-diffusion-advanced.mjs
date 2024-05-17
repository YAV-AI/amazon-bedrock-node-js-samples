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

const prompt = "a beautiful mountain landscape";
const negativePrompts = [
  "poorly rendered",
  "poor background details",
  "poorly drawn mountains",
  "disfigured mountain features",
];
const stylePreset = "photographic"; // (e.g. photographic, digital-art, cinematic, ...)
const clipGuidancePreset = "FAST_GREEN"; // (e.g. FAST_BLUE FAST_GREEN NONE SIMPLE SLOW SLOWER SLOWEST)
const sampler = "K_DPMPP_2S_ANCESTRAL"; // (e.g. DDIM, DDPM, K_DPMPP_SDE, K_DPMPP_2M, K_DPMPP_2S_ANCESTRAL, K_DPM_2, K_DPM_2_ANCESTRAL, K_EULER, K_EULER_ANCESTRAL, K_HEUN)

const width = 768;
const height = 1024;

const textPrompts = [
  { text: prompt, weight: 1.0 },
  ...negativePrompts.map((negprompt) => ({ text: negprompt, weight: -1.0 })),
];

const input = {
  modelId: "stability.stable-diffusion-xl-v1",
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify({
    text_prompts: textPrompts,
    cfg_scale: 5,
    // If you want to set a seed, specify the seed value below
    // seed: 452345,
    steps: 50,
    style_preset: stylePreset,
    clip_guidance_preset: clipGuidancePreset,
    sampler: sampler,
    width: width,
    height: height,
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
console.log(parsedResponse);
// {
//   result: 'success',
//     artifacts: [
//       {
//         seed: 0,
//         base64: 'iVBORw0K .....'
//       }
//     ]
// }

// Lets create the image from the base64 data
const base64ImageData = parsedResponse.artifacts[0].base64;

// Remove the data URI prefix if it exists
const base64Data = base64ImageData.replace(/^data:image\/\w+;base64,/, "");

// Create a buffer from the base64 data
const imageBuffer = Buffer.from(base64Data, "base64");

// Generate a timestamp (e.g., current date and time)
const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");

// Trim the prompt text to not exceed 100 characters
const trimmedPrompt = prompt.slice(0, 100);

// Create a prompt slug by replacing spaces with hyphens
const promptSlug = trimmedPrompt.replace(/\s+/g, "-");

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
