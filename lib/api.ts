const API_URL = process.env.WORDPRESS_API_URL!

async function fetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers = { "Content-Type": "application/json" }

  // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  //   headers[
  //     'Authorization'
  //   ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  // }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    //throw new Error('Failed to fetch API')
  }
  return json.data
}

export type manuItem = {
  key: string
  parentId: string | null
  title: string
  uri: string
  children: manuItem[]
}

export type Response = {
  status: "success" | "failure"
}

// Reference https://www.wpgraphql.com/docs/menus
// @ts-ignore
const flatListToHierarchical = (
  data = [],
  { idKey = "key", parentKey = "parentId", childrenKey = "children" } = {}
) => {
  const tree = [] as manuItem[]
  const childrenOf = {}
  data.forEach((item) => {
    // @ts-ignore
    const newItem = { ...item }
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
    // @ts-ignore
    childrenOf[id] = childrenOf[id] || []
    // @ts-ignore
    newItem[childrenKey] = childrenOf[id]
    parentId
      ? // @ts-ignore
        (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem)
  })
  return tree
}

// Reference https://www.wpgraphql.com/docs/menus
export async function getMainNavigationMenu() {
  const data = await fetchAPI(`
    {
      menuItems(where: {location: PRIMARY_NAVIGATION}, first: 50) {
        nodes {
          key: id
          parentId
          title: label
          uri
        }
      }
    }
  `)

  return flatListToHierarchical(data.menuItems.nodes)
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getContent(
  slug: string | string[]
): Promise<{ status: "success" | "failure"; data: any | null }> {
  const slugString = typeof slug === "object" ? slug.join("/") : slug

  const data = await fetchAPI(`
    {
      contentNode(id: "${slugString}", idType: URI) {
        id
        uri
        date
        ... on Page {
          id
          title
          uri
          date
          content
          author {
            node {
              name
              description
            }
          }
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              title
              mediaDetails {
                width
                height
              }
            }
          }
        }
        ... on Post {
          id
          title
          uri
          date
          excerpt
          content
          categories {
            nodes {
              id
              slug
              uri
              name
            }
          }
          tags {
            nodes {
              id
              slug
              name
              uri
            }
          }
          author {
            node {
              name
              description
            }
          }
          featuredImage {
            node {
              sourceUrl(size: LARGE)
              title
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
  `)

  if (data.contentNode) return { status: "success", data }
  return { status: "failure", data: null }

  // if (data === null || data.post === null)
  //   return { status: 'failure', data: null }
  // return { status: 'success', data }
}

export async function getRecentPosts(): Promise<{
  status: "success" | "failure"
  data: any | null
}> {
  const data = await fetchAPI(`
    {
      posts(first: 8, where: {orderby: {field: DATE, order: DESC}}) {
        edges {
          node {
            id
            uri
            date
            title
            excerpt
            categories {
              nodes {
                id
                slug
                uri
                name
              }
            }
            tags {
              nodes {
                id
                slug
                name
                uri
              }
            }
            author {
              node {
                name
                description
              }
            }
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                title
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `)

  if (data === null || data.posts === null)
    return { status: "failure", data: null }
  return { status: "success", data }
}

export async function getMoreRecentPosts(lastpost: any): Promise<{
  status: "success" | "failure"
  data: any | null
}> {
  const data = await fetchAPI(`
    {
      posts(first: 6, where: {orderby: {field: DATE, order: DESC}}, after: "${lastpost}") {
        edges {
          node {
            id
            uri
            date
            title
            excerpt
            categories {
              nodes {
                id
                slug
                uri
                name
              }
            }
            tags {
              nodes {
                id
                slug
                name
                uri
              }
            }
            author {
              node {
                name
                description
              }
            }
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                title
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `)

  if (data === null || data.posts === null)
    return { status: "failure", data: null }
  return { status: "success", data: data }
}

export async function getAllCategoryPostsSlug(slug: string | string[]) {
  const slugString = typeof slug === "object" ? slug.join("/") : slug
  const data = await fetchAPI(`
    {
      posts(first: 10000, where: {categoryName: "${slugString}"}) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getCategoryPosts(slug: string | string[]): Promise<{
  status: "success" | "failure"
  data: any | null
}> {
  const slugString = typeof slug === "object" ? slug.join("/") : slug

  const data = await fetchAPI(`
    {
      posts(first: 6, where: {categoryName: "${slugString}"}) {
        edges {
          node {
            id
            title
            uri
            date
            excerpt
            categories {
              nodes {
                id
                slug
                uri
                name
              }
            }
            tags {
              nodes {
                id
                slug
                name
                uri
              }
            }
            author {
              node {
                name
                description
              }
            }
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                title
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `)

  if (data === null || data.posts === null)
    return { status: "failure", data: null }
  return { status: "success", data }
}

export async function getAllTagPostsSlug(slug: string | string[]) {
  const slugString = typeof slug === "object" ? slug.join("/") : slug
  const data = await fetchAPI(`
    {
      posts(first: 10000, where: {tag: "${slugString}"}) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}

export async function getTagPosts(slug: string | string[]): Promise<{
  status: "success" | "failure"
  data: any | null
}> {
  const slugString = typeof slug === "object" ? slug.join("/") : slug

  const data = await fetchAPI(`
    {
      posts(first: 6, where: {tag: "${slugString}"}) {
        edges {
          node {
            id
            title
            uri
            date
            excerpt
            categories {
              nodes {
                id
                slug
                uri
                name
              }
            }
            tags {
              nodes {
                id
                slug
                name
                uri
              }
            }
            author {
              node {
                name
                description
              }
            }
            featuredImage {
              node {
                sourceUrl(size: LARGE)
                title
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `)

  if (data === null || data.posts === null)
    return { status: "failure", data: null }
  return { status: "success", data }
}
