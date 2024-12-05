export interface CreateUser {
    username: string;
    email: string;
    password: string;
    referralCode?: string;
}

export interface UserLogin {
    email: string;
    password: string;
}
