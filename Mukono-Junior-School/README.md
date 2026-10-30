# Mukono Junior School Website

## Student admissions

The online application form saves student and guardian details to the Neon
`admissions` table through Drizzle and then sends a school notification and a
parent confirmation through Resend.

Configure these server-side environment variables before accepting applications:

- `DATABASE_URL` — the Neon PostgreSQL connection string.
- `RESEND_API_KEY` — the Resend API key used to send notifications.
- `RESEND_FROM_EMAIL` — a sender address verified in the Resend account.
- `ADMISSIONS_OFFICE_EMAIL` — optional admissions inbox; falls back to
  `ADMIN_EMAIL`, then the school's published email address.

Apply the schema with `pnpm db:push`. The application is stored before email
delivery; if a notification cannot be sent, the form clearly tells the family
that the school office should be contacted to confirm the saved application.
