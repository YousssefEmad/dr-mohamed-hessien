# Dr. Mohamed Hessien Clinics — Next.js

Production-ready Next.js (App Router) rebuild of the clinic website.

## Stack

- Next.js 14 (App Router, JavaScript / JSX only)
- Bootstrap + original theme CSS (no Tailwind)
- Arabic default + English (Context API, localStorage, no reload)
- Data files ready to swap for Sanity.io via `lib/api/*`

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build (Hostinger static)

```bash
npm run build
```

Upload the contents of the `out/` folder to your Hostinger `public_html`.

## Contact form (email to doctor)

The form posts to `public/sendmail.php` (copied into `out/` on build).

1. Set the inbox in `data/site.js` → `contactEmail`
2. After `npm run build`, upload the full `out/` folder (including `sendmail.php`) to Hostinger
3. Ensure PHP mail is enabled on the hosting plan

Default recipient: `info@drmohamedhessien.com`


## Services (8)

1. Retina surgery  
2. Corneal transplant  
3. Intravitreal injection & laser  
4. Laser vision correction  
5. Cataract  
6. Lens implant (ICL)  
7. Strabismus  
8. Eyelid cosmetic surgery  
