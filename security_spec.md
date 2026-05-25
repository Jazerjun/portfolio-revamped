# Security Specifications & Dirty Dozen Payload Analysis

This specifications file documents the security rules, access controls, data invariants, and defensive tests designed to secure Jazerjun Buenafe's multimedia portfolio website.

## 1. Data Invariants & Access Control Model

*   **Projects, Videos, and Testimonials Collection (`/projects`, `/videos`, `/testimonials`)**:
    *   **Reads**: Anyone (public access). Dynamic portfolio content must be freely visible to clients and the public.
    *   **Writes (Create/Update/Delete)**: Restrained solely to high-privilege Administrators (`isAdmin()`). Visitors cannot alter the portfolio.
    *   **Update-Gap Guards**: Fields like `id` and `createdAt` are immutable. Key validation restricts modification to exact schema definitions.

*   **Messages Collection (`/messages`)**:
    *   **Create**: Anyone (public access) so clients can submit contact entries.
    *   **Reads/Updates/Deletes**: Restricted exclusively to Administrators (`isAdmin()`). Visitors cannot scrape, read, or delete submitted client communications.
    *   **Boundary Guard**: Strict length constraints on text fields and size checks on inputs to prevent space-exhaustion attacks.

## 2. The "Dirty Dozen" Vulnerability Payloads

We design these twelve adversarial payloads to verify that the security rules return `PERMISSION_DENIED` for unauthorized operations.

### ID Poisoning & Identity Spoofing
1.  **Payload A1** (Create Project as Guest): Submit a standard Project document to `/projects` without authenticating.
2.  **Payload A2** (Create Project as Non-Admin): Sign in as a standard client, then attempt to write a project document.
3.  **Payload A3** (ID Poisoning on Project ID): Attempt to create a project doc with a malicious 2KB document ID like `project_id_123_aaaaaaaaaa..._junk`.

### Schema Breach & Ghost Fields (Shadow Updates)
4.  **Payload B1** (Shadow Field Injection): Add an undocumented ghost property (e.g., `{ isVerified: true, hasGhostAccess: true }`) to a `/projects` creation.
5.  **Payload B2** (Invalid Project Types): Write a project with a string field (e.g. `isFeatured`) set to an incorrect type, like a 10MB byte array.
6.  **Payload B3** (Update Immortals): Attempt to alter the `createdAt` value of an existing project after its creation.

### PII Scraping & Privilege Escalation
7.  **Payload C1** (Message Scraping): Issue a blanket list query or direct `get` on a Message doc `/messages/{msgId}` as an unauthenticated guest.
8.  **Payload C2** (Message Scraping as Member): Attempt to list all message entries under `/messages` as a logged-in non-admin user.
9.  **Payload C3** (Self-Promotion Privilege Escalation): Attempt to create an admin status document inside the `/admins` collection as a standard user.

### Relational Invariants & Denial of Wallet
10. **Payload D1** (Message Size Flooding): Submit a `/messages` document where the `message` body is a 2MB script payload.
11. **Payload D2** (Delete Sibling Project): Attempt to delete an existing project document as a guest or authenticated customer.
12. **Payload D3** (Spoofed Email Verification): Attempt to write client details relying on a spoofed Google auth credential where `email_verified` is falsified.

---

## 3. Recommended firestore.rules Test Suite Outline

A series of unit-style assertions validating these outcomes:

```typescript
// firestore.rules.test.ts
import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing';

describe('Portfolio Firestore Rules', () => {
  it('prevents guests from writing to projects (A1)', async () => {
    const db = getGuestDb();
    await assertFails(db.collection('projects').add({ title: 'New Art' }));
  });

  it('prevents guests from listing contact messages (C1)', async () => {
    const db = getGuestDb();
    await assertFails(db.collection('messages').get());
  });

  it('allows public users to submit contact messages', async () => {
    const db = getGuestDb();
    await assertSucceeds(db.collection('messages').add({
      name: 'John Client',
      email: 'john@example.com',
      message: 'Great work! Let us collaborate.',
      createdAt: getServerTimestamp()
    }));
  });
});
```
