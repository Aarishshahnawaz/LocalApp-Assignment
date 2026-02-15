import { OTPEntry } from "../types/auth";

const otpStore: Record<string, OTPEntry> = {};

export function generateOTP(email: string): OTPEntry {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const entry: OTPEntry = {
    code,
    expiresAt: Date.now() + 60 * 1000,
    attempts: 0,
  };

  otpStore[email] = entry;
  return entry;
}

export function getOTPEntry(email: string) {
  return otpStore[email];
}

export function validateOTP(email: string, input: string): {
  success: boolean;
  message: string;
} {
  const entry = otpStore[email];

  if (!entry) {
    return { success: false, message: "No OTP found" };
  }

  if (Date.now() > entry.expiresAt) {
    delete otpStore[email];
    return { success: false, message: "OTP expired" };
  }

  if (entry.attempts >= 3) {
    delete otpStore[email];
    return { success: false, message: "Max attempts exceeded" };
  }

  entry.attempts++;

  if (entry.code === input) {
    delete otpStore[email];
    return { success: true, message: "OTP valid" };
  }

  return { success: false, message: "Incorrect OTP" };
}
