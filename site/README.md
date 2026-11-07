# Oklahoma Physical Therapy — website redesign

Prototype rebuild of [oklahomaphysicaltherapy.com](https://oklahomaphysicaltherapy.com/) focused on patient conversion:

1. **Live booking wizard** by clinic / reason / clinician / time slot  
2. **Insurance & cash-pay clarity** above the fold and on `/insurance`  
3. **Condition landing pages** (pelvic, spine, sports/golf) with therapist + review CTAs  
4. Per-location pages with hours, maps, and staff  

## Run locally

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

Next.js (App Router) · Tailwind CSS · `next/font` (Bricolage Grotesque + Figtree)

Clinic content is adapted from the public marketing site for this redesign demo. The booking calendar is a front-end prototype (not wired to a live EMR).
