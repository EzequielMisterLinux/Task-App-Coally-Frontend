export interface User {

    names      : string;
    lastnames  : string;
    age        : number;
    email      : string;
    password   : string;
  }
  
  export interface AuthResponse {
    message: string;
    user: User;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
  }
  
  export interface RegisterData {
    names: string;
    lastnames: string;
    age: number;
    email: string;
    password: string;
  }