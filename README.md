# Putra Rayhan Assidiqi - Portfolio

Personal portfolio website of **Putra Rayhan Assidiqi S.Pd**, Creative Designer.

Built with [Astro](https://astro.build), React and Tailwind CSS, based on the free
[Zolt portfolio template](https://shadcnstudio.com/templates/zolt-portfolio-template-free) by shadcn/studio (MIT License).

## Run locally

Requires Node.js 22.12 or newer and pnpm.

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # production build in dist/
```

## Where to edit

| What | File |
| --- | --- |
| Name, title, summary, WhatsApp, email | `src/consts.ts` |
| Hero section | `src/components/home/hero/hero.astro` |
| Education card | `src/components/home/about/education-card.tsx` |
| Experience timeline | `src/components/home/experience/experience.tsx` |
| Services / skills | `src/components/shared/services/services.tsx` |
| Work pages (projects & events) | `src/content/case-studies/*.mdx` |
| Photos and work images | `public/images/putra/` |
| Downloadable portfolio PDF | `public/portofolio-putra-rayhan-assidiqi.pdf` |

## Bahasa

Website ditampilkan dalam **bahasa Inggris**. Teks ditulis berpasangan, misalnya `<T id='Tentang saya' en='About me' />` atau `{ id: '…', en: '…' }`, dan yang tampil hanya versi `en`. Versi Indonesia disimpan sebagai cadangan di kode.

- **Cerita proyek**: versi Inggris yang tampil ada di `src/content/case-studies-en/` (slug sama dengan `src/content/case-studies/`). Bila file Inggris belum ada, versi Indonesia yang dipakai.
- Pengaturannya ada di `src/lib/i18n.ts` dan `src/components/i18n/`.
