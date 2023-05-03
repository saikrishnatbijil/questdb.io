import React from "react"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import BlogListPaginator from "@theme/BlogListPaginator"
import type { FrontMatter as OriginalFrontMatter } from "@theme/BlogPostPage"
import type { Props } from "@theme/BlogListPage"
import type { Tag } from "@theme/BlogTagsListPage"
import { ThemeClassNames } from "@docusaurus/theme-common"

import styles from "./styles.module.css"
import { ListItem } from "./ListItem"
import { Categories } from "./Categories"
import type { Props as CategoriesProps } from "./Categories"
import { Chips } from "./Chips"
import type { Props as ChipProps } from "./Chips"
import { ensureTrailingSlash } from "../../utils"
import { StructuredData } from "../../components/StructuredData"

// convert readonly properties to writable
type Writable<T> = { -readonly [P in keyof T]: T[P] }

export type FrontMatter = OriginalFrontMatter & { permalink?: string }

const categories: CategoriesProps["categories"] = [
  {
    title: "Benchmarks",
    description: "Reproducible benchmarks",
    url: "/blog/tags/benchmark/",
  },
  {
    title: "Tutorials",
    description: "Step-by-step guides",
    url: "/blog/tags/tutorial/",
  },
  {
    title: "Demos",
    description: "Play with QuestDB",
    url: "/blog/tags/demo/",
  },
  {
    title: "User Stories",
    description: "Show & tell from QuestDB users",
    url: "/customers/",
  },
]

const prioritizedTags: ChipProps["items"] = [
  "sql",
  "grafana",
  "market data",
  "python",
  "kafka",
  "time-series",
  "telegraf",
  "release",
  "engineering",
  "prometheus",
  { label: "k8s", tag: "kubernetes" },
].map((item) => {
  const name = typeof item === "string" ? item : item.label
  const tag = typeof item === "string" ? item : item.tag

  return {
    name,
    permalink: `/blog/tags/${tag.replace(/ /g, "-")}`,
  }
})

const pinnedPostsTitle = (tag: string) => {
  const map: Record<string, string> = {
    tutorial: "Featured QuestDB tutorials",
  }

  return map[tag] ?? `Featured ${tag} posts`
}

const allPostsTitle = (tag: string) => {
  const map: Record<string, string> = {
    tutorial: "All QuestDB tutorials",
  }

  return map[tag] ?? `All ${tag} posts`
}

function BlogListPage(props: Props): JSX.Element {
  const { metadata, items } = props
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext()
  const { blogDescription, blogTitle, permalink } = metadata
  const isBlogOnlyMode = permalink === "/blog"
  const isTagsPage =
    typeof ((metadata as unknown) as Tag).allTagsPath !== "undefined"
  const currentTagName = isTagsPage ? ((metadata as unknown) as Tag).name : ""
  const isTutorialsPage = currentTagName === "tutorial"

  const tagsPageDescription = `Articles tagged with ${currentTagName}`

  const titles: Array<[boolean, string]> = [
    [isBlogOnlyMode, siteTitle],
    [isTagsPage, tagsPageDescription],
    [true, blogTitle],
  ]

  const descriptions: Array<[boolean, string]> = [
    [isBlogOnlyMode, blogDescription],
    [isTagsPage, tagsPageDescription],
    [true, "QuestDB Blog tags"],
  ]

  const { posts, pinnedPosts } = items.reduce(
    (
      acc: {
        posts: Writable<typeof items>
        pinnedPosts: Writable<typeof items>
      },
      item,
    ) => {
      if (
        isTagsPage &&
        isTutorialsPage &&
        (item.content.frontMatter.tags ?? []).includes("pinned")
      ) {
        acc.pinnedPosts.push(item)
      } else {
        acc.posts.push(item)
      }

      return acc
    },
    { posts: [], pinnedPosts: [] },
  )

  const hasPinnedPosts = isTagsPage && isTutorialsPage && pinnedPosts.length > 0

  const { siteConfig } = useDocusaurusContext()

  return (
    <>
      <StructuredData>
        {{
          "@graph": [
            {
              "@type": "Blog",
              name: siteConfig.title,
              url: siteConfig.url,
              description: siteConfig.customFields.description,
              blogPost: [
                items.map((item) => ({
                  "@type": "BlogPosting",
                  headline: item.content.frontMatter.title,
                  url: item.content.metadata.permalink,
                  datePublished: item.content.metadata.formattedDate,
                  image: item.content.frontMatter.image,
                  author: {
                    "@type": "Person",
                    name: item.content.frontMatter.author,
                    url:
                      item.content.frontMatter.author_url ??
                      item.content.frontMatter.authorURL,
                    image:
                      item.content.frontMatter.author_image_url ??
                      item.content.frontMatter.authorImageURL,
                  },
                })),
              ],
            },
            {
              "@type": "BreadcrumbList",
              name: "Blog posts list",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteConfig.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                },
              ],
            },
          ],
        }}
      </StructuredData>

      <Layout
        title={titles.find(([when]) => Boolean(when))?.[1] ?? ""}
        description={descriptions.find(([when]) => Boolean(when))?.[1] ?? ""}
        wrapperClassName={ThemeClassNames.wrapper.blogPages}
        pageClassName={ThemeClassNames.page.blogListPage}
        searchMetadatas={{
          // assign unique search tag to exclude this page from search results!
          tag: "blog_posts_list",
        }}
      >
        <main className={styles.root}>
          <h2>Popular topics</h2>

          <div className={styles.categories}>
            {/* BlogListPage component is used for `blog/` and also for `blog/tags/*`.
            When rendered for `blog/tags/*, then `metadata` includes tag, instead of blog data */}
            <Categories
              activeCategory={((metadata as unknown) as Tag).permalink}
              categories={categories}
            />

            <Chips
              activeChip={((metadata as unknown) as Tag).permalink}
              items={prioritizedTags}
            />
          </div>

          {hasPinnedPosts && (
            <div className={styles.pinnedPosts}>
              <h1>{pinnedPostsTitle(currentTagName)}</h1>
              <div className={styles.posts}>
                {pinnedPosts.map(({ content }, i) => (
                  <ListItem
                    key={content.metadata.permalink}
                    content={content}
                    belowFold={i > 5}
                    forcedTag={{
                      label: currentTagName,
                      permalink: ensureTrailingSlash(metadata.permalink),
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <h1>
            {isBlogOnlyMode ? "Blog Posts" : allPostsTitle(currentTagName)}
          </h1>

          <div className={styles.posts}>
            {posts.map(({ content }, i) => (
              <ListItem
                key={content.metadata.permalink}
                content={content}
                belowFold={i > 5}
                forcedTag={
                  isTagsPage
                    ? {
                        label: currentTagName,
                        permalink: ensureTrailingSlash(metadata.permalink),
                      }
                    : undefined
                }
              />
            ))}
          </div>

          <BlogListPaginator metadata={metadata} />
        </main>
      </Layout>
    </>
  )
}

export default BlogListPage
