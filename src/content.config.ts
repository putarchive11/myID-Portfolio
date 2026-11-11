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
    logo: z.string().optional()
  })
})

export const collections = { 'case-studies': caseStudies }
