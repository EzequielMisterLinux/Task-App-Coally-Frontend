export interface Welcome {
    message: string;
    token:   string;
    user:    User;
}

export interface User {
    id:    string;
    names: string;
    email: string;
}
