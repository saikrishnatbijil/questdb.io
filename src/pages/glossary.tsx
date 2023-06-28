import React from "react"
import Layout from "../theme/Layout"
import { usePluginData } from "@docusaurus/useGlobalData"
import { Section } from "../components/Section"
import glossaryCss from "../css/glossary/index.module.css"
import Link from "@docusaurus/Link"

type Term = {
  urlFragment: string
  title: string
}

const groupItemsByFirstLetter = (items: Term[]): { [key: string]: Term[] } => {
  const groupedItems: { [key: string]: Term[] } = {}

  for (const item of items) {
    const firstLetter = item.title.charAt(0).toUpperCase()
    if (groupedItems[firstLetter] !== undefined) {
      groupedItems[firstLetter].push(item)
    } else {
      groupedItems[firstLetter] = [item]
    }
  }

  return groupedItems
}

const GlossaryPage = () => {
  const { glossaryData } = usePluginData<{ glossaryData: Term[] }>("glossary")

  return (
    <Layout
      canonical="/glossary"
      description="Glossary of terms used in QuestDB"
      title="Glossary"
    >
      <Section>
        <Section.Title level={1} center>
          Glossary
        </Section.Title>
        <Section.Subtitle center>
          List of terms and concepts used in QuestDB
        </Section.Subtitle>
      </Section>

      {Object.entries(groupItemsByFirstLetter(glossaryData)).map(
        ([letter, terms]) => (
          <Section key={letter}>
            <Section.Title level={2} size="small">
              {letter}
            </Section.Title>
            <div className={glossaryCss.grid}>
              {terms.map((item) => (
                <Link
                  className={glossaryCss.link}
                  key={item.urlFragment}
                  to={`/glossary/${item.urlFragment}/`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </Section>
        ),
      )}
    </Layout>
  )
}

export default GlossaryPage
