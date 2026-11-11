import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    organisation: z.string().optional(),
    role: z.string().optional(),
    duration: z.string().optional(),
    period: z.string().optional(),
    tools: z.array(z.string()).default([]),

    // Used only to order the works (newest first); not shown on the site
    publishedAt: z.string(),
    image: z.string().optional(),
    heroImage: z.string().optional(),
    logo: z.string().optional(),
    // 'web' = website/aplikasi, 'desain' = desain, kepanitiaan, seminar
    kategori: z.enum(['web', 'desain']).default('desain'),
    // Untuk slide karya web
    jenis: z.string().optional(),
    showcase: z.string().optional(),
    // Foto-foto untuk folder dan popup galeri
    galeri: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional(),
    github: z.string().url().optional()
  })
})

export const collections = { 'case-studies': caseStudies }
