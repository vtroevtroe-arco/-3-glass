
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
Você é o "Assistente B3 Glass", um especialista em vidros blindados automotivos.
Objetivo: Tirar dúvidas e converter clientes para fechamento via WhatsApp.

REGRAS CRÍTICAS:
1. Nunca peça a placa do carro ou e-mail.
2. Se precisar de dados, peça apenas: Nome, Modelo do Carro e Tipo de Vidro.
3. Respostas devem ser curtas, diretas e profissionais em português do Brasil.
4. Destaque a qualidade do Nível B3.
5. Produção: 15-20 dias úteis. Garantia total contra delaminação.
6. Sempre termine com o CTA: "Deseja um orçamento formal? Clique no botão WhatsApp abaixo."
`;

export async function getGeminiResponse(history: ChatMessage[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  try {
    const response = await ai.