const ssrTemplate = require("./src/internals/ssr.template")
const customFields = require("./src/config/customFields")
const markdownPlugins = require("./plugins/markdown-plugins")

const config = {
  title: "QuestDB",
  tagline: "QuestDB is the fastest open source time series database",
  url: `https://${customFields.domain}`,
  baseUrl: "/",
  baseUrlIssueBanner: false,
  favicon: "/img/favicon.png",
  organizationName: "QuestDB",
  projectName: "questdb",
  customFields,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  plugins: [
    require.resolve("./plugins/fetch-latest-release/index"),
    require.resolve("./plugins/fetch-repo/index"),
    require.resolve("./plugins/remote-repo-example/index"),
    require.resolve("./plugins/fetch-contributors-count/index"),
    require.resolve("./plugins/webpack-ts/index"),
    require.resolve("./plugins/optimize/index"),
    require.resolve("./plugins/manifest/index"),
    require.resolve("./plugins/delay-code-block-appearance"),
    require.resolve("./plugins/glossary"),
    [
      "@docusaurus/plugin-pwa",
      {
        pwaHead: [
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.webmanifest",
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "#21222c",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-status-bar-style",
            content: "#21222c",
          },
        ],
      },
    ],
    [
      require.resolve("./plugins/blog"),
      {
        ...markdownPlugins,
        blogSidebarCount: 10,
        feedOptions: {
          type: "all",
          copyright: customFields.copyright,
        },
        showReadingTime: true,
        postsPerPage: 1000,
        blogPostComponent: require.resolve(
          "./src/theme/BlogPostPage/index.tsx",
        ),
        blogTagsPostsComponent: require.resolve(
          "./src/theme/BlogListPage/index.tsx",
        ),
      },
    ],
    /**
     * ...[
     *   process.env.POSTHOG_API_KEY
     *     ? require.resolve("posthog-docusaurus/src/index.js")
     *     : null,
     * ],
     */

    ...[
      process.env.NODE_ENV === "development"
        ? require.resolve("./plugins/click-through-debug-iframe")
        : null,
    ],
  ].filter(Boolean),

  themeConfig: {
    /**
     * posthog: {
     *   apiKey: process.env.POSTHOG_API_KEY,
     * },
     */
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: "/img/og.gif",
    gtag: {
      trackingID: "GTM-PVR7M2G",
      anonymizeIP: true,
    },
    prism: {
      defaultLanguage: "questdb-sql",
      additionalLanguages: [
        "rust",
        "csharp",
        "julia",
        "cpp",
        "java",
        "ebnf",
        "ini",
        "toml",
        "ruby",
        "php",
      ],
      theme: require("./src/internals/prism-github"),
      darkTheme: require("./src/internals/prism-dracula"),
    },
    algolia: {
      appId: "QL9L2YL7AQ",
      apiKey: "2f67aeacbe73ad08a49efb9214ea27f3",
      indexName: "questdb",
    },
    navbar: {
      title: " ",
      logo: {
        alt: "QuestDB",
        src: "/img/navbar/questdb.svg",
      },
      items: [
        {
          label: "Product",
          position: "left",
          href: "#",
          items: [
            {
              label: "QuestDB Cloud",
              to: "/cloud/",
            },
            {
              label: "QuestDB Open Source",
              to: "/get-questdb/",
            },
            {
              label: "QuestDB Enterprise",
              to: "/enterprise/",
            },
            {
              label: "Use Cases",
              to: "/use-cases/",
            },
            {
              label: "Customers",
              to: "/customers/",
            },
            {
              label: "Roadmap",
              href: `https://github.com/orgs/questdb/projects/1/views/5`,
            },
          ],
        },
        {
          label: "Learn",
          position: "left",
          href: "#",
          items: [
            {
              label: "Blog",
              to: "/blog/",
              activeBaseRegex: "/blog/?$",
            },
            {
              label: "Tutorials",
              to: "/blog/tags/tutorial/",
              activeBaseRegex: "/blog/tags/tutorial/?$",
            },
            {
              label: "QuestDB Swag",
              to: "/community/",
            },
            {
              label: "Slack Community",
              to: customFields.slackUrl,
            },
          ],
        },
        {
          label: "Docs",
          to: "/docs/",
          position: "left",
        },
        {
          label: "Pricing",
          to: "/pricing/",
          position: "left",
        },
        {
          label: "Star us",
          href: "https://github.com/questdb/questdb",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "Product",
          items: [
            {
              label: "Cloud",
              to: "/cloud/",
            },
            {
              label: "Open Source",
              to: "/get-questdb/",
            },
            {
              label: "Enterprise",
              to: "/enterprise/",
            },
            {
              label: "Use Cases",
              to: "/use-cases/",
            },
            {
              label: "Customers",
              to: "/customers/",
            },
            {
              label: "Roadmap",
              href: "https://github.com/orgs/questdb/projects/1/views/5",
            },
            {
              label: "Pricing",
              to: "/pricing/",
            },
          ],
        },
        {
          title: "Learn",
          items: [
            {
              label: "Docs",
              to: "/docs/",
            },
            {
              label: "Blog",
              to: "/blog/",
            },
            {
              label: "Tutorials",
              to: "/blog/tags/tutorial/",
            },
            {
              label: "QuestDB Swag",
              to: "/community/",
            },
            {
              label: "Slack Community",
              to: customFields.slackUrl,
            },
            {
              label: "Glossary",
              to: "/glossary/",
            }
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "Twitter",
              href: customFields.twitterUrl,
            },
            {
              label: "GitHub",
              href: customFields.githubUrl,
            },
            {
              label: "StackOverflow",
              to: customFields.stackoverflowUrl,
            },
            {
              label: "Linkedin",
              href: customFields.linkedInUrl,
            },
            {
              label: "YouTube",
              to: customFields.videosUrl,
            },
            {
              label: "Reddit",
              href: customFields.redditUrl,
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About us",
              to: "/about-us/",
            },
            {
              label: "Careers",
              to: "/careers/",
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        // blog is enabled through a custom plugin, so we disable it from preset
        // ./plugins/blog/index.js
        blog: false,
        docs: {
          ...markdownPlugins,
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: ({ docPath }) =>
            `${customFields.websiteGithubUrl}/edit/master/docs/${docPath}`,
        },

        sitemap: {
          changefreq: "daily",
          priority: 0.7,
          trailingSlash: true,
        },
        theme: {
          customCss: [require.resolve("./src/css/_global.css")],
        },
      },
    ],
  ],
}

module.exports = {
  ...config,
  ssrTemplate: ssrTemplate(config),
}
