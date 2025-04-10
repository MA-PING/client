import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://ma-ping.com/',
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: 'https://ma-ping.com/my-character',
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ]
}