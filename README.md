# cloudraptor-node-pg-test

Minimal Express + PostgreSQL app used to test CloudRaptor's Node.js deploys with a managed database.

- `DATABASE_URL` is provided by the platform.
- Release command: `npm run migrate`
- Start command: `npm start`; health check `/healthz`.
