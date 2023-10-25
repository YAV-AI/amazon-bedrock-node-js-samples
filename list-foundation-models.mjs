import {
  BedrockClient,
  ListFoundationModelsCommand,
} from "@aws-sdk/client-bedrock";

async function listFoundationModels() {
  // Create a BedrockClient
  const client = new BedrockClient({ region: "us-east-1" }); // Replace 'us-east-1' with your desired region

  try {
    // Create a ListFoundationModelsCommand
    const command = new ListFoundationModelsCommand({});

    // Execute the command to list foundational models
    const response = await client.send(command);

    // Access the list of foundational models from the response
    const foundationalModels = response.modelSummaries;

    // Process and use the foundational models as needed
    foundationalModels.forEach((model) => {
      console.log(`-----------------------------------------`);
      console.log(`- Model Name: ${model.modelName}`);
      console.log(`- Model ID: ${model.modelId}`);
      console.log(`- Provider Name: ${model.providerName}`);
    });
  } catch (error) {
    console.error("Error listing foundational models:", error);
  }
}

// Call the function to list foundational models
listFoundationModels();
