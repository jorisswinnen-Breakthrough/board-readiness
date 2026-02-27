

## Landing Page with Google Login + Assessment Page Restructure

### Prerequisites

Before implementing, you need to **connect Supabase** to this project:

1. Go to **Project Settings** (gear icon) in the Lovable editor
2. Find the **Supabase** tab under Integrations
3. Click **Connect Supabase** and follow the prompts to link a Supabase project
4. Once connected, enable **Google** as an auth provider in your Supabase dashboard under **Authentication > Providers** (you'll need Google Cloud OAuth credentials -- Client ID and Secret)

Once Supabase is connected, we can proceed with the implementation below.

---

### Overview

Split the app into two pages:

1. **Landing Page** (`/`) -- Title "Board Readiness" with Google Sign-In button and branded footer
2. **Assessment Page** (`/assessment`) -- Protected route with header (logo + title) + info banner + the existing assessment form + branded footer

---

### Technical Plan

**1. Install Supabase client**
- Add `@supabase/supabase-js` dependency
- Create `src/integrations/supabase/client.ts` with Supabase config

**2. Create Landing Page: `src/pages/Landing.tsx`**
- Clean, centered layout with:
  - Logo (joris-logo.png) at top
  - Title "Board Readiness" in DM Serif Display
  - "Sign in with Google" button that calls `supabase.auth.signInWithOAuth({ provider: 'google' })`
- White footer with Joris logo + bold spaced contact info

**3. Create Auth context: `src/contexts/AuthContext.tsx`**
- Wrap app with auth provider
- `onAuthStateChange` listener to track session
- Provide `user`, `loading`, `signOut` values

**4. Create Assessment Page: `src/pages/Assessment.tsx`**
- Move existing Index page content here
- Add header bar with logo + page title
- Add teal info banner below header with the description text about the six dimensions and maturity model
- White footer with Joris logo + contact info
- Protected: redirects to `/` if not authenticated

**5. Create shared Footer component: `src/components/Footer.tsx`**
- White background
- Joris logo centered
- Bold, spaced contact info: **Joris@deltabase.be** / **+32494257825**
- Reused on both pages

**6. Update routing: `src/App.tsx`**
- `/` renders Landing page
- `/assessment` renders Assessment page (protected)
- Wrap with AuthProvider

**7. Update `src/pages/Index.tsx`**
- Redirect to Landing or remove, replaced by Landing.tsx

### Files to Create/Edit

| Action | File |
|--------|------|
| Create | `src/integrations/supabase/client.ts` |
| Create | `src/pages/Landing.tsx` |
| Create | `src/pages/Assessment.tsx` |
| Create | `src/components/Footer.tsx` |
| Create | `src/contexts/AuthContext.tsx` |
| Edit   | `src/App.tsx` (routing + auth provider) |
| Edit   | `src/pages/Index.tsx` (remove or redirect) |

