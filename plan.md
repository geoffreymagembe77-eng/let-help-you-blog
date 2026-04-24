# Restoration and Functional Upgrade Plan - GembeEduPro

The goal is to restore and verify all previously implemented features while maintaining the existing "Professional & Secure" design. No visual changes will be made, only functional enhancements.

## 1. Component Refactoring & Organization
- Move inline components from `src/pages/Dashboard.tsx` to dedicated files in `src/components/dashboard/`:
    - `EducationHub.tsx`
    - `AIEducator.tsx`
    - `HealthTrends.tsx`
- Move `ProviderPatients` from `src/pages/Dashboard.tsx` to `src/components/dashboard/ProviderPatients.tsx`.
- This ensures all features are modular and "functional" as standalone components.

## 2. Feature Restoration & Functional Upgrades
### AI Educator (`src/components/dashboard/AIEducator.tsx`)
- Implement real integration with Supabase Edge Function `ai-educator`.
- Add proper loading states and error handling for AI responses.
- Maintain the current "Nurse Amara" UI.

### Education Hub (`src/components/dashboard/EducationHub.tsx`)
- Add a fetch mechanism for lessons (from a proposed `education_content` table or local JSON if DB is not ready).
- Implement category filtering and "Start Learning" functionality that tracks progress.

### Health Trends (`src/components/dashboard/HealthTrends.tsx`)
- Implement fetching of health metrics (e.g., heart rate, blood pressure, glucose).
- Use dynamic data for the bar charts instead of hardcoded arrays.

### Consultancy Hub (`src/components/dashboard/ConsultancyHub.tsx`)
- Enhance "Select for Review" to actually create a record in a `consultancy_requests` table.
- Add search and filter functionality.

### Virtual Care Hub (`src/components/dashboard/VirtualHub.tsx`)
- Ensure "Start Instant Hub" and "Wellness Check-in" have functional triggers.
- Fetch real appointments from the `appointments` table.

### AI Analytics (`src/components/dashboard/AIAnalytics.tsx`)
- Ensure it correctly displays scores, risk levels, and analysis notes from the `ai_predictions` table.

## 3. Dashboard Integration
### Patient Dashboard (`src/pages/Dashboard.tsx`)
- Clean up the page by importing the newly refactored components.
- Ensure all sidebar items correctly switch between these components.

### Provider Dashboard (`src/pages/ProviderDashboard.tsx`)
- Integrate `VirtualHub` and `AIAnalytics` into the provider view for "Telemedicine" and "Population Health".
- Ensure role-based access to tabs is strictly enforced.

### GembeEduPro Dashboard (`src/pages/GembeEduProDashboard.tsx`)
- Add functional triggers for "Onboard New Institution" and "Generate Global Report".
- Ensure the overview stats are dynamic or at least fetched.

## 4. Verification & Testing
- **Auth Flow**: Verify login, signup, and 2FA across all roles.
- **Payments**: Verify the simulation works from start to finish.
- **Blockchain**: Verify the ledger syncing and transaction display.
- **CMS**: Verify content updates via `ContentManager`.
- **Multilingual**: Ensure translations are applied correctly in all restored components.

## 5. Final Polish (Non-Visual)
- Ensure all buttons have proper `onClick` handlers.
- Add toast notifications for all major actions.
- Ensure 100% type safety across all components.
