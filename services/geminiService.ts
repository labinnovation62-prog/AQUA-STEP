import { GoogleGenAI } from "@google/genai";
import { SensorData } from "../types";

// Helper to safely get the API key
const getApiKey = (): string | undefined => {
  try {
    // Check if process is defined to avoid ReferenceError in some browser environments
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};

// Fallback logic for when API is unavailable or fails
const simulateAIAnalysis = (data: SensorData): string => {
    if (data.ph < 6.5) return "Alert: Acidity levels detected; checking pH neutralization stage.";
    if (data.ph > 8.0) return "Alert: Alkalinity high; optimizing filtration balance.";
    if (data.tds > 250) return "Warning: TDS nearing limit; membrane maintenance recommended soon.";
    if (data.voltage > 4.5) return "Performance Excellent: Turbine generation exceeding expected efficiency.";
    if (data.flowRate < 0.3) return "Notice: Low flow rate detected; system in conservation mode.";
    return "System Optimal: Water quality parameters and energy generation are within target ranges.";
};

export const analyzeWaterQuality = async (data: SensorData): Promise<string> => {
  const apiKey = getApiKey();
  
  // If no key, return simulated data immediately without error
  if (!apiKey) {
    return simulateAIAnalysis(data) + " (Simulated)";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      Analyze the following water recycling system data for a school project called "AquaStep":
      pH: ${data.ph}
      TDS: ${data.tds} ppm
      Voltage Generated: ${data.voltage} V
      Flow Rate: ${data.flowRate} L/min
      Turbine RPM: ${data.turbineRpm}

      Provide a concise 1-sentence assessment of the water quality and system efficiency suitable for a dashboard display.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [{ text: prompt }]
      }
    });

    if (response.text) {
        return response.text.trim();
    }
    
    throw new Error("Empty response from AI model");

  } catch (error) {
    console.warn("Gemini API unavailable, using simulation fallback:", error);
    // Graceful fallback to simulation so the UI never breaks
    return simulateAIAnalysis(data);
  }
};