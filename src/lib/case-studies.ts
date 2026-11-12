import { getCollection, type CollectionEntry } from 'astro:content'

import type { CaseStudyMetadata } from '@/lib/case-text'

export { caseText, caseTools } from '@/lib/case-text'
export type { CaseStudyMetadata, CaseStudyTranslation } from '@/lib/case-text'

export async function getEnglishEntry(slug: string): Promise<CollectionEntry<'case-studies-en'> | null> {
  const entries = await getCollection('case-studies-en')

  return entries.find(entry => entry.data.slug === slug) ?? null
}

export async function getAllCaseStudies(): Promise<CollectionEntry<'case-studies'>[]> {
  const caseStudies = await getCollection('case-studies')

  return caseStudies.sort((a, b) => new Date(b.data.publishedAt).valueOf() - new Date(a.data.publishedAt).valueOf())
}

export async function getCaseStudies(limit?: number): Promise<CaseStudyMetadata[]> {
  const caseStudies = await getAllCaseStudies()
  const english = await getCollection('case-studies-en')
  const bySlug = new Map(english.map(entry => [entry.data.slug, entry.data]))

  const metadata: CaseStudyMetadata[] = caseStudies.map(entry => {
    const translation = bySlug.get(entry.data.slug)

    if (!translation) return entry.data

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { slug, ...en } = translation

    return { ...entry.data, en }
  })

  return limit ? metadata.slice(0, limit) : metadata
}

export async function getCaseStudyBySlug(slug: string): Promise<CollectionEntry<'case-studies'> | null> {
  const caseStudies = await getAllCaseStudies()

  return caseStudies.find(entry => entry.data.slug === slug) ?? null
}
