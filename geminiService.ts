
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getFashionAdvice = async (productName: string, category: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Eres un experto asesor de moda en una tienda online llamada NovaStyle. El cliente está mirando el producto "${productName}" de la categoría "${category}". Dame un consejo de estilo breve (máximo 2 frases) sobre cómo combinarlo.`,
    });
    return response.text || "Este producto es excelente para combinar con básicos neutros.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Una elección con mucho estilo para tu armario.";
  }
};
