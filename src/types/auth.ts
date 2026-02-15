export type OTPEntry = {
  code: string;
  expiresAt: number;
  attempts: number;
};
