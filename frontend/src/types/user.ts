export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  cpf?: string;
  addresses: Address[];
  preferences: UserPreferences;
  createdAt: string;
}

export interface Address {
  id: string;
  type: "home" | "work" | "other";
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
  };
}
