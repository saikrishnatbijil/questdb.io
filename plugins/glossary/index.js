const fs = require("fs")
const path = require("path")
const docUtils = require("@docusaurus/utils")

const titleFromFilename = (filename) =>
  filename
    .replace(/\.mdx?$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

function readMarkdownFiles(directory) {
  const files = fs.readdirSync(directory)
  const glossaryData = []

  files.forEach((file) => {
    const filePath = path.join(directory, file)
    const parsedFile = docUtils.parseFrontMatter(
      fs.readFileSync(filePath, "utf-8"),
    )

    const title = parsedFile.frontMatter.index_title ?? titleFromFilename(file)

    if (title) {
      glossaryData.push({ urlFragment: file.replace(/\.mdx?$/, ""), title })
    } else {
      console.warn(`No title found in ${file}. Skipping...`)
    }
  })

  return glossaryData
}

module.exports = (context) => ({
  name: "glossary",
  async loadContent() {
    const { siteDir } = context
    const glossaryDir = path.join(siteDir, "src", "pages", "glossary")
    const content = readMarkdownFiles(glossaryDir)
    return content
  },
  async contentLoaded({ content, actions }) {
    const { setGlobalData } = actions
    setGlobalData({ glossaryData: content })
  },
})
