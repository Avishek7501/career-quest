export interface UserStatus {
    UserId: number;
    Username: string;
    Email: string;
    Password: string;
    Address?: string | null;
    Phone?: string | number | null;
    Gender?: string | null;
    CreatedAt: string;
    UpdatedAt?: string;
    ResetPasswordToken?: string | null;
}
