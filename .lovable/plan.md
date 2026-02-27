

## Enable Google OAuth for Sign-In

### Current Problem
The auth logs show **"provider is not enabled"** when trying to sign in with Google. The current code uses `supabase.auth.signInWithOAuth()` directly, but Lovable Cloud requires using the managed `lovable.auth.signInWithOAuth()` approach.

### What Needs to Happen

**Step 1: Configure Social Login (tool call)**
Use the Configure Social Login tool to enable Google OAuth in Lovable Cloud. This will:
- Enable the Google provider in the backend
- Auto-generate `src/integrations/lovable/` module with the `@lovable.dev/cloud-auth-js` package

**Step 2: Update Landing.tsx**
Replace the direct Supabase auth call with the Lovable managed auth:

```typescript
// Before:
import { supabase } from "@/integrations/supabase/client";
await supabase.auth.signInWithOAuth({
  provider: "google",
  options: { redirectTo: `${window.location.origin}/assessment` },
});

// After:
import { lovable } from "@/integrations/lovable/index";
await lovable.auth.signInWithOAuth("google", {
  redirect_uri: window.location.origin,
});
```

The redirect after login is already handled by the `useEffect` in `Landing.tsx` which navigates to `/assessment` when a user session is detected.

### Files to Edit

| Action | File |
|--------|------|
| Auto-generated | `src/integrations/lovable/` (by configure tool) |
| Edit | `src/pages/Landing.tsx` (switch to lovable auth) |

### What Stays the Same
- `AuthContext.tsx` -- still uses `supabase.auth.onAuthStateChange` which works with both approaches
- `Assessment.tsx` -- no changes needed
- `Footer.tsx` -- no changes needed

