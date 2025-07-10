export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
  registerDate: Date;
  resetToken?: string;
  resetTokenExpiration?: Date;
  role: "user" | "admin" | "founder";
  points: number;
}
