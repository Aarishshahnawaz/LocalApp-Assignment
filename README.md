# React Native OTP Authentication Assignment

## Overview

This project implements a **passwordless authentication flow** using **Email + OTP**, followed by a **session tracking screen**.
All logic is implemented **locally** without any backend, as required by the assignment.

---

## Tech Stack

* React Native (Expo)
* TypeScript
* Functional Components
* React Hooks (useState, useEffect, useRef)
* AsyncStorage (External SDK)

---

## Features

### 1. Email + OTP Login

* User enters email.
* Taps **Send OTP**.
* A **6-digit OTP** is generated locally.
* User enters OTP to log in.

---

### 2. OTP Rules

* OTP length: **6 digits**
* Expiry time: **60 seconds**
* Maximum attempts: **3**
* Resending OTP:

  * Invalidates old OTP
  * Resets attempt count
* OTP is stored **per email**, not globally.

---

### 3. Session Screen

After successful login:

* Displays logged-in email.
* Shows **session start time**.
* Displays **live session duration** (mm:ss).
* Logout button available.

Timer behavior:

* Does not reset on re-render.
* Stops correctly on logout.
* Cleans up on screen unmount.

---

## Edge Cases Handled

* Expired OTP
* Incorrect OTP
* Exceeded maximum attempts
* Resend OTP resets state
* Session timer continues correctly

---

## Project Structure

```
src/
├── screens/
│   ├── LoginScreen.tsx
│   ├── OtpScreen.tsx
│   └── SessionScreen.tsx
├── hooks/
│   └── useSessionTimer.ts
├── services/
│   ├── otpManager.ts
│   └── analytics.ts
├── types/
│   └── auth.ts
```

---

## OTP Logic and Expiry Handling

### Data Structure

Each OTP is stored per email in an object:

```ts
{
  code: string;
  expiresAt: number;
  attempts: number;
}
```

### Logic

1. When user requests OTP:

   * A random 6-digit code is generated.
   * Expiry time set to 60 seconds.
   * Attempts reset to 0.

2. When verifying:

   * Check if OTP exists.
   * Check expiry.
   * Check attempt limit.
   * If correct → login success.
   * If incorrect → increment attempts.

3. After:

   * Success
   * Expiry
   * 3 failed attempts
     → OTP is removed.

---

## External SDK Used

### AsyncStorage

AsyncStorage was used as the required external SDK.

#### Why AsyncStorage?

* Lightweight and simple.
* No configuration required.
* Suitable for local logging and session persistence.

### Logged Events

The following events are stored:

* OTP generated
* OTP validation success
* OTP validation failure
* Logout

---

## Session Timer Logic

* Session start time stored in state.
* Custom hook `useSessionTimer` calculates duration.
* Timer uses `setInterval`.
* Interval is cleaned up on unmount to prevent memory leaks.

---

## What GPT Helped With

GPT was used for:

* Initial project structure.
* OTP manager logic.
* Session timer hook structure.
* UI improvements.
* README generation.

## What I Implemented and Understood

* React Native project setup with Expo.
* Navigation between screens.
* OTP validation logic.
* Attempt tracking.
* Expiry handling.
* Session timer behavior.
* AsyncStorage integration for logging.

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Start the project

```bash
npm start
```

### 3. Run the app

* Press **a** for Android emulator
* Or scan QR using **Expo Go**

---

## Testing the OTP

Since no backend is used:

1. Enter email.
2. Tap **Send OTP**.
3. OTP appears in alert or console.
4. Enter OTP within 60 seconds.

---

## Submission

* GitHub repository link
* App runs with minimal setup
* README included
