import type { PageContent } from "@shared/schema";

export function getContentValue(content: PageContent[] | undefined, section: string, key: string, fallback: string = ""): string {
  if (!content) return fallback;
  
  const item = content.find(item => item.section === section && item.key === key);
  return item?.value || fallback;
}

export function getContentBySection(content: PageContent[] | undefined, section: string): Record<string, string> {
  if (!content) return {};
  
  return content
    .filter(item => item.section === section)
    .reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
}