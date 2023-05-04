import clsx from "clsx"
import { matchPath } from "@docusaurus/router"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React, { TransitionEvent, useCallback, useState } from "react"
import { renderRoutes } from "react-router-config"
import { MDXProvider } from "@mdx-js/react"
import customFields from "../../config/customFields"
import { StructuredData } from "../../components/StructuredData"

import type { Props } from "@theme/DocPage"
import DocSidebar from "@theme/DocSidebar"
import MDXComponents from "@theme/MDXComponents"
import NotFound from "@theme/NotFound"
import Layout from "@theme/Layout"

import styles from "./styles.module.css"
import { ensureTrailingSlash } from "../../utils/ensureTrailingSlash"

type Breadcrumb = {
  "@type": "ListItem"
  position: number
  name: string
  item: string
}

const capitalizeFirstChar = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

type Routes = Props["route"]["routes"]

const DocPage = ({
  location,
  route: { routes },
  versionMetadata,
  ...rest
}: Props) => {
  const { siteConfig, isClient } = useDocusaurusContext()
  const { permalinkToSidebar, docsSidebars } = versionMetadata ?? {}
  const docRoutes = (routes as unknown) as Routes[]
  const currentDocRoute = routes.find((docRoute) =>
    matchPath(location.pathname, docRoute),
  )

  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false)
  const [hiddenSidebar, setHiddenSidebar] = useState(false)
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false)
    }

    setHiddenSidebarContainer(!hiddenSidebarContainer)

    if (
      !hiddenSidebar &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setHiddenSidebar(true)
    }
  }, [
    hiddenSidebar,
    hiddenSidebarContainer,
    setHiddenSidebar,
    setHiddenSidebarContainer,
  ])

  const handleTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (!event.currentTarget.classList.contains(styles.docSidebarContainer)) {
        return
      }

      if (hiddenSidebarContainer) {
        setHiddenSidebar(true)
      }
    },
    [hiddenSidebarContainer, setHiddenSidebar],
  )

  if (currentDocRoute == null) {
    return <NotFound location={location} {...rest} />
  }

  const sidebarName = permalinkToSidebar[currentDocRoute.path] as
    | string
    | undefined
  const sidebar = sidebarName != null ? docsSidebars[sidebarName] : []

  const documentationBreadcrumbs = currentDocRoute.path
    .split("/")
    .slice(1)
    .reduce<{ acc: Breadcrumb[]; paths: string }>(
      ({ acc, paths }, path, index) => {
        const pathTrail =
          typeof paths === "undefined" ? path : `${paths}/${path}`

        const newItem: Breadcrumb = {
          "@type": "ListItem",
          position: index + 2,
          name: capitalizeFirstChar(path.replace(/-/g, " ")),
          item: `${siteConfig.url}${ensureTrailingSlash(pathTrail)}`,
        }

        return { acc: [...acc, newItem], paths: pathTrail }
      },
      { acc: [], paths: "" },
    ).acc

  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    ...documentationBreadcrumbs,
  ]

  return (
    <>
      <StructuredData>
        {{
          "@graph": [
            {
              "@type": "BreadcrumbList",
              name: "Documentation",
              itemListElement: breadcrumbs,
            },
          ],
        }}
      </StructuredData>
      <Layout
        description={customFields.description}
        key={isClient.toString()}
        title="Introduction"
        wrapperClassName={styles.doc}
      >
        {sidebarName != null && (
          <div
            className={clsx(styles.doc__sidebar, {
              [styles["doc__sidebar--hidden"]]: hiddenSidebarContainer,
            })}
            onTransitionEnd={handleTransitionEnd}
            role="complementary"
          >
            <DocSidebar
              key={
                // Reset sidebar state on sidebar changes
                // See https://github.com/facebook/docusaurus/issues/3414
                sidebarName
              }
              sidebar={sidebar}
              path={currentDocRoute.path}
              sidebarCollapsible={
                siteConfig.themeConfig?.sidebarCollapsible ?? true
              }
              onCollapse={toggleSidebar}
              isHidden={hiddenSidebar}
            />

            {hiddenSidebar && (
              <div
                className={styles.doc__expand}
                title="Expand sidebar"
                aria-label="Expand sidebar"
                tabIndex={0}
                role="button"
                onKeyDown={toggleSidebar}
                onClick={toggleSidebar}
              />
            )}
          </div>
        )}

        <main className={styles.doc__main}>
          <div
            className={clsx(
              "padding-vert--lg",
              "container",
              styles["doc__item-wrapper"],
              {
                [styles["doc__item-wrapper--enhanced"]]: hiddenSidebarContainer,
              },
            )}
          >
            <MDXProvider components={MDXComponents}>
              {renderRoutes(docRoutes)}
            </MDXProvider>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default DocPage
