
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
Você é o "Assistente B3 Glass", um especialista em vidros blindados automotivos.
Objetivo: Tirar dúvidas e converter clientes para fechamento via WhatsApp.

REGRAS CRÍTICAS:
1. Nunca peça a placa do carro.
2. Nunca peça e-mail.
3. Se precisar de dados, peça apenas: Nome, Modelo do Carro e Tipo de Vidro.
4. Respostas devem ser curtas, diretas e profissionais.
5. Sempre destaque a qualidade do Nível B3 (padrão de segurança).
6. Explique sobre tempo de produção (geralmente 15-20 dias), garantia e cuidados básicos de instalação.
7. Sempre termine com o CTA: "Quer fechar seu pedido agora? Clique no botão WhatsApp e fale com a B3 Glass."

Contexto B3 Glass: Somos referência em blindagem transparente, focados em segurança e durabilidade. Blindagem é coisa séria.
`;

export async function getGeminiResponse(history: ChatMessage[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    return response.text || "Desculpe, tive um problema ao processar sua resposta. Pode tentar novamente?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Houve um erro na conexão. Por favor, fale conosco diretamente pelo WhatsApp.";
  }
}
