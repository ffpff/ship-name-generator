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

type SupportedLanguage = 'en' | 'zh' | 'ja' | 'ko';

export async function POST(req: NextRequest) {
  try {
    const { firstName, secondName, style, shipType, language } = await req.json();

    if (!firstName || !secondName || !style || !shipType || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const styleDescription = STYLE_DESCRIPTIONS[style as keyof typeof STYLE_DESCRIPTIONS] || 'unique and creative';

    const languagePrompts: Record<SupportedLanguage, {
      suffix: string;
      readingEase: string;
      morphemes: string;
    }> = {
      en: {
        suffix: "e.g., -ia/-is/-on for research vessels",
        readingEase: "Flesch formula",
        morphemes: "2-3 morphemes"
      },
      zh: {
        suffix: "例如：-号/-轮/-舰 用于不同类型船只",
        readingEase: "通顺度评分",
        morphemes: "2-4个字"
      },
      ja: {
        suffix: "例：-丸/-号/-船 など、船舶の種類に応じて",
        readingEase: "読みやすさスコア",
        morphemes: "2-4文字"
      },
      ko: {
        suffix: "예: -호/-선/-함 등 선박 유형에 따라",
        readingEase: "가독성 점수",
        morphemes: "2-4음절"
      }
    };

    const langConfig = languagePrompts[language as SupportedLanguage] || languagePrompts.en;

    const prompt = `Generate 5 ${styleDescription} ship names for a ${shipType} inspired by "${firstName}" and "${secondName}" in ${language} language, with explicit semantic interpretation.

Core requirements:
1. Name construction:
   - Create names that sound natural in ${language} language
   - Phonosemantic alignment with ${styleDescription}
   - Ship-class suffix patterns (${langConfig.suffix})

2. Semantic guidelines:
   - Incorporate elements from both source names ("${firstName}" and "${secondName}")
   - ${shipType}-specific symbolism
   - Style-encoded semantics (${styleDescription})
   - Cultural relevance to ${language}-speaking regions

3. Output specs:
   - Length: ${langConfig.morphemes}
   - Reading ease score ≥80 (${langConfig.readingEase})
   - Maritime semantic compatibility
   - Names should feel authentic in ${language}

Response format:
["Generated Name"]|["Express the meaning in one sentence in ${language}"]`;

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