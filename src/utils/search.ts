/**
 * 简单的客户端全文搜索工具
 * 对所有可搜索条目进行标题+描述的模糊匹配
 */

export interface Searchable {
  id: string
  title: string
  description?: string
  [key: string]: unknown
}

export function simpleSearch<T extends Searchable>(
  items: T[],
  query: string,
): T[] {
  if (!query.trim()) return items
  const q = query.toLowerCase().trim()
  return items.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q))
    )
  })
}
