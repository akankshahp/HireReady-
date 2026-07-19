import type { AnalysisResult } from "./types";

const SYSTEM_PROMPT = `You are HireReady, an expert technical recruiter and resume coach.
Analyze the candidate's resume against the job description and return STRICT JSON matching this schema:
{
  "score": number (0-100 match),
  "summary": string (2-3 sentences),
  "strengths": string[] (3-6 bullets),
  "gaps": string[] (3-6 bullets),
  "missingKeywords": string[] (important JD keywords absent from resume),
  "suggestions": string[] (3-6 concrete rewrite/action suggestions)
}
Return only valid JSON, no markdown fences.`;

export async function analyzeResume(
  resume: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing VITE_OPENAI_API_KEY. Add it to a .env file and restart the dev server."
    );
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `JOB DESCRIPTION:\n${jobDescription}\n\nRESUME:\n${resume}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? "{}";
  return JSON.parse(content) as AnalysisResult;
}
