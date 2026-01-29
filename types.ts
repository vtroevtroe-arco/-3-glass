
export type OSStatus = 'Orçamento' | 'Aprovado' | 'Em produção' | 'Pronto' | 'Entregue';

export type GlassType = 
  | 'Para-brisa'
  | 'Vigia traseiro'
  | 'Porta dianteira esquerda'
  | 'Porta dianteira direita'
  | 'Porta traseira esquerda'
  | 'Porta traseira direita'
  | 'Fixo';

export interface ServiceOrder {
  id: string;
  osNumber: string;
  date: string;
  customerName: string;
  cpfCnpj?: string;
  phone?: string;
  carBrand: string;
  carModel: string;
  carYear: string;
  glassType: GlassType[];
  blindLevel: string;
  height: string;
  width: string;
  thickness: string;
  notes: string;
  status: OSStatus;
  createdAt: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
}
