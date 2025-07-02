import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateTreatmentRecommendations(patientData: {
  age: number;
  gender: string;
  medicalHistory: string;
  dnaProfile: string;
  lifestyle: string;
  geneExpressionData?: Record<string, any>;
  mutationProfile?: Record<string, any>;
}): Promise<{
  recommendations: Array<{
    treatment: string;
    efficacy: number;
    rationale: string;
  }>;
}> {
  const prompt = `Based on the following comprehensive patient data, recommend personalized chemotherapy treatments:
    Age: ${patientData.age}
    Gender: ${patientData.gender}
    Medical History: ${patientData.medicalHistory}
    DNA Profile: ${patientData.dnaProfile}
    Lifestyle: ${patientData.lifestyle}
    Gene Expression Data: ${JSON.stringify(patientData.geneExpressionData || {})}
    Mutation Profile: ${JSON.stringify(patientData.mutationProfile || {})}

    Provide exactly 3 recommendations in JSON format with the following structure:
    {
      "recommendations": [
        {
          "treatment": "Treatment name and detailed protocol",
          "efficacy": 0.85,
          "rationale": "Comprehensive explanation including genomic factors"
        }
      ]
    }

    Ensure efficacy is a number between 0 and 1, and provide detailed rationales based on genomic and lifestyle factors.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
  });

  const result = JSON.parse(response.choices[0].message.content);
  return result;
}

export async function analyzeASOTargets(geneData: {
  sequence: string;
  expressionData: Record<string, any>;
}): Promise<{
  targets: Array<{
    sequence: string;
    geneId: string;
    confidence: number;
    details: Record<string, any>;
  }>;
}> {
  const prompt = `Analyze the following genetic data for potential ASO drug targets:
    Sequence: ${geneData.sequence}
    Expression Data: ${JSON.stringify(geneData.expressionData)}

    Identify potential ASO targets in JSON format:
    {
      "targets": [
        {
          "sequence": "target mRNA sequence",
          "geneId": "gene identifier",
          "confidence": 0.95,
          "details": {
            "mechanism": "targeting explanation",
            "predictedEfficiency": "efficiency score",
            "potentialSideEffects": "predicted side effects"
          }
        }
      ]
    }`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content);
}

export async function analyzeCancerVaccineTargets(mutationData: {
  profile: Record<string, any>;
  immuneResponse: Record<string, any>;
}): Promise<{
  vaccineTargets: Array<{
    neoantigen: string;
    mutationDetails: Record<string, any>;
    immunogenicityScore: number;
  }>;
}> {
  const prompt = `Analyze the following mutation and immune response data for personalized cancer vaccine targets:
    Mutation Profile: ${JSON.stringify(mutationData.profile)}
    Immune Response Data: ${JSON.stringify(mutationData.immuneResponse)}

    Identify potential vaccine targets in JSON format:
    {
      "vaccineTargets": [
        {
          "neoantigen": "peptide sequence",
          "mutationDetails": {
            "gene": "affected gene",
            "mutation": "specific mutation",
            "frequency": "mutation frequency"
          },
          "immunogenicityScore": 0.88
        }
      ]
    }`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content);
}

export async function getAIChatResponse(message: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an AI oncology assistant helping medical professionals with treatment-related questions. Provide clear, professional responses with evidence-based recommendations."
      },
      { role: "user", content: message }
    ]
  });

  return response.choices[0].message.content;
}