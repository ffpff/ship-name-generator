import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface GeneratedName {
  name: string;
  meaning: string;
}

interface AIProvider {
  apiUrl: string;
  headers: Record<string, string>;
  formatRequest: (prompt: string) => any;
  parseResponse: (response: any) => GeneratedName[];
}

interface AIProviders {
  [key: string]: AIProvider;
}

// AI Provider configurations
const AI_PROVIDERS: AIProviders = {
  openai: {
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    formatRequest: (prompt: string) => ({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative ship name generator that specializes in creating unique and meaningful vessel names. Respond with multiple names and their meanings in the format: [\"Name1\"]|[\"Meaning1\"] [\"Name2\"]|[\"Meaning2\"] etc."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 500,
      presence_penalty: 0.6,
      frequency_penalty: 0.5
    }),
    parseResponse: (response: any) => {
      const content = response.data.choices[0].message.content?.trim() || 
        '["Ocean Spirit"]|["A name representing the eternal connection with the sea"]';
      
      // 分割多个名字对
      const namePairs = content.match(/\["[^"]+"\]\|\["[^"]+"\]/g) || [];
      
      return namePairs.map((pair: string) => {
        const [namePart, meaningPart] = pair.split('|');
        const name = namePart.replace(/^\["|\"]$/g, '');
        const meaning = meaningPart.replace(/^\["|\"]$/g, '');
        return { name, meaning };
      });
    }
  },
  kieai: {
    apiUrl: 'https://kieai.erweima.ai/api/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${process.env.KIEAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    formatRequest: (prompt: string) => ({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are a creative ship name generator that specializes in creating unique and meaningful vessel names. Respond with multiple names and their meanings in the format: [\"Name1\"]|[\"Meaning1\"] [\"Name2\"]|[\"Meaning2\"] etc."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    }),
    parseResponse: (response: any) => {
      const content = response.data.choices[0].message.content?.trim() || 
        '["Ocean Spirit"]|["A name representing the eternal connection with the sea"]';
      
      // 分割多个名字对
      const namePairs = content.match(/\["[^"]+"\]\|\["[^"]+"\]/g) || [];
      
      return namePairs.map((pair: string) => {
        const [namePart, meaningPart] = pair.split('|');
        const name = namePart.replace(/^\["|\"]$/g, '');
        const meaning = meaningPart.replace(/^\["|\"]$/g, '');
        return { name, meaning };
      });
    }
  }
  // Add more AI providers here as needed
  // Example:
  // anthropic: {
  //   apiUrl: 'https://api.anthropic.com/v1/complete',
  //   headers: {...},
  //   formatRequest: (prompt: string) => ({...}),
  //   parseResponse: (response: any) => ...
  // }
};

// Style descriptions mapping
const STYLE_DESCRIPTIONS = {
  romantic: 'romantic and love-themed',
  adventure: 'adventurous and exciting',
  luxury: 'luxurious and elegant',
  nautical: 'traditional maritime-themed',
  humorous: 'fun and witty',
  mythology: 'inspired by mythology and legends',
  nature: 'nature and ocean-themed',
  vintage: 'classic and timeless',
  coastal: 'coastal and beach-themed',
  patriotic: 'patriotic and proud'
};

// AI service abstraction
async function generateWithAI(prompt: string, provider = 'kieai') {
  const config = AI_PROVIDERS[provider];
  if (!config) {
    throw new Error(`AI provider ${provider} not configured`);
  }

  try {
    const response = await axios.post(
      config.apiUrl,
      config.formatRequest(prompt),
      { headers: config.headers }
    );
    return config.parseResponse(response);
  } catch (error) {
    console.error(`Error calling ${provider} API:`, error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, secondName, style, shipType } = await req.json();

    if (!firstName || !secondName || !style || !shipType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const styleDescription = STYLE_DESCRIPTIONS[style as keyof typeof STYLE_DESCRIPTIONS] || 'unique and creative';

    const prompt = `Generate 5 ${styleDescription} ship name for a ${shipType} inspired by "${firstName}" and "${secondName}", with explicit semantic interpretation.

Core requirements:
1. Name construction:
   - Morphological blend ratio ≥60% (neologism formation)
   - Phonosemantic alignment with ${styleDescription}
   - Ship-class suffix patterns (e.g., -ia/-is/-on for research vessels)

2. Semantic guidelines:
   - Bilateral etymology (reflect both source names)
   - ${shipType}-specific symbolism
   - Style-encoded semantics (${styleDescription})

3. Output specs:
   - Lexical length: 2-3 morphemes
   - Reading ease score ≥80 (Flesch formula)
   - Maritime semantic compatibility index >0.7

Response format:
["Generated Name"]|["Express the meaning in one sentence"]`;

    const results = await generateWithAI(prompt);

    return NextResponse.json({ names: results });
  } catch (error: any) {
    console.error('Error generating ship names:', error);
    const errorMessage = error.response?.data?.error?.message || 'Failed to generate ship names';
    return NextResponse.json(
      { error: errorMessage },
      { status: error.response?.status || 500 }
    );
  }
} 