/* eslint-disable @typescript-eslint/no-explicit-any */
import posthogJS, { PostHog, PostHogConfig } from "posthog-js";

export const PERSON_PROCESSING_MODE: "always" | "identified_only" | "never" =
  (process.env.NEXT_PUBLIC_POSTHOG_PERSON_PROCESSING_MODE as any) ||
  "identified_only";

export const SKIP_CONSENT_HANDLING = false;

export const posthog: PostHog = posthogJS;

export type ConsentState = "granted" | "denied" | "pending" | undefined;

export function cookieConsentGiven(): ConsentState {
  if (typeof window === "undefined") return undefined;
  return posthog.get_explicit_consent_status();
}

export const configForConsent = (): Partial<PostHogConfig> => {
  if (SKIP_CONSENT_HANDLING) {
    return {
      disable_surveys: false,
      autocapture: true,
      disable_session_recording: false,
      cookieless_mode: undefined,
    };
  }

  const consentGiven = cookieConsentGiven();

  return {
    disable_surveys: consentGiven !== "granted",
    autocapture: consentGiven === "granted",
    disable_session_recording: consentGiven !== "granted",
  };
};

export const updatePostHogConsent = (consentGiven: ConsentState) => {
  if (SKIP_CONSENT_HANDLING) {
    return;
  }

  if (consentGiven !== undefined) {
    if (consentGiven === "granted") {
      posthog.opt_in_capturing();
    } else if (consentGiven === "denied") {
      posthog.opt_out_capturing();
    } else if (consentGiven === "pending") {
      posthog.clear_opt_in_out_capturing();
      posthog.reset();
    }
  }

  posthog.set_config(configForConsent());
};

export function initPostHog() {
  if (typeof window !== "undefined" && !posthog.__loaded) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
      person_profiles:
        PERSON_PROCESSING_MODE === "never"
          ? "identified_only"
          : PERSON_PROCESSING_MODE,
      capture_pageview: false, // We capture pageviews manually
      persistence: "localStorage+cookie",
      ...configForConsent(),
    });
    (window as any).posthog = posthog;
  }
}

export const posthogHelpers = {
  onLogin: (user: any) => {
    if (PERSON_PROCESSING_MODE === "never") {
      posthogHelpers.setUser(user);
    } else {
      posthog.identify(user.email, user);
    }
    posthog.capture("Logged in");
  },
  onLogout: () => {
    posthog.capture("Logged out");
    posthog.reset();
  },
  setUser: (user: any) => {
    if (PERSON_PROCESSING_MODE === "never") {
      const eventProperties = {
        person_id: user.email,
        person_email: user.email,
        person_name: user.name,
        team_id: user.team?.id,
        team_name: user.team?.name,
      };
      posthog.register(eventProperties);
      posthog.setPersonPropertiesForFlags(user);
    } else {
      if (user.team) {
        posthog.group("team", user.team.id, user.team);
      }
    }
  },
};
