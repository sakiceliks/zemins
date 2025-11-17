import type { Metadata } from "next"

const DEFAULT_SITE_NAME = "Zemin Ustası"
const DEFAULT_SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://zeminustasi.com.tr").replace(/\/$/, "")
const DEFAULT_OG_IMAGE = `${DEFAULT_SITE_URL}/logo.png`

export const siteUrl = DEFAULT_SITE_URL

export function absoluteUrl(path: string = "/"): string {
  if (!path) return siteUrl
  if (/^https?:\/\//.test(path)) {
    return path
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${siteUrl}${normalizedPath}`
}

type OpenGraphType = NonNullable<Metadata["openGraph"]>["type"]

interface BuildSeoMetadataInput {
  title: string
  description: string
  path?: string
  keywords?: string | string[]
  images?: string | string[]
  type?: OpenGraphType
  section?: string
  tags?: string[]
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  robots?: Metadata["robots"]
}

export function buildSeoMetadata({
  title,
  description,
  path = "/",
  keywords,
  images,
  type = "website",
  section,
  tags,
  publishedTime,
  modifiedTime,
  authors,
  robots,
}: BuildSeoMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(path)
  const normalizedImages = Array.isArray(images)
    ? images.length > 0
      ? images
      : undefined
    : images
    ? [images]
    : undefined

  const ogImages = normalizedImages ?? [DEFAULT_OG_IMAGE]

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: robots ?? {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type,
      siteName: DEFAULT_SITE_NAME,
      locale: "tr_TR",
      images: ogImages,
      section,
      tags,
      publishedTime,
      modifiedTime,
      authors,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    },
  }
}

