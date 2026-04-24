# Implementation Plan - GembeEduPro Enhancements

## 1. Fix Sign-Up and Auth Flow
- **Goal**: Resolve the "sign up buttons not functioning" complaint.
- **Action**: 
    - Modify `src/pages/Auth.tsx` to include both Login and Register modes.
    - Add a "Create Account" link/button in the auth card.
    - Update `src/pages/LandingPage.tsx` buttons to pass a state/param to `AuthPage` if needed (or just ensure they land on the right page).

## 2. Payment & Subscription Integration
- **Goal**: Implement payment options as requested.
- **Action**:
    - Create `src/components/dashboard/PaymentManager.tsx` simulating a secure payment gateway (Stripe/Paystack style).
    - Add pricing cards to the landing page and the patient dashboard.
    - Integrate payment status in the user profile.

## 3. UI/UX "Catchy & Appealing" Overhaul
- **Goal**: Move from "amateur" to world-class UI.
- **Action**:
    - Apply `ui-ux-pro-max` healthcare palette (Emerald/Cyan/Slate).
    - Use `framer-motion` for smoother page transitions and entry animations.
    - Enhance typography using `Inter` and high-contrast headings.
    - Add 3D-like shadows and glassmorphism to cards.

## 4. Blockchain & Security
- **Goal**: Visible proof of secure data handling and blockchain integration.
- **Action**:
    - Create `src/components/dashboard/BlockchainLedger.tsx` to show "Real-time Blockchain Verification" of records.
    - Add security badges (ISO 27001, HIPAA) to footer and auth pages.
    - Enhance 2FA verification UI with modern OTP inputs.

## 5. Role-Based Access (Provider Portal)
- **Goal**: Define 'Super Admin' and other roles in the provider portal.
- **Action**:
    - Update `src/pages/ProviderDashboard.tsx` to check the `role` prop.
    - Super Admins get an "Organization Overview" and "Staff Management" view.
    - Standard Providers get the "Patient List" and "Consultations" view.

## 6. GembeEduPro Platform Dashboard
- **Goal**: Dedicated dashboard for the overarching platform.
- **Action**:
    - Create `src/pages/GembeEduProDashboard.tsx`.
    - Features: Global stats (total users, revenue, blockchain txns), Hospital onboarding, Content moderation.
    - Update `src/App.tsx` routing.

## 7. Final Polish & Validation
- **Action**: 
    - Ensure all buttons in `Navbar.tsx` and `LandingPage.tsx` work.
    - Run `validate_build` to ensure no TS errors.
