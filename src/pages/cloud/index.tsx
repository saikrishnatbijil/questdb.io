import React from "react"
import Layout from "../../theme/Layout"
import { Section } from "../../components/Section"
import { ActionFooter } from "../../components/ActionFooter"
import { CompareFeatures } from "../../modules/cloud/CompareFeatures"
import { Top } from "../../modules/cloud/Top"
import Button from "@theme/Button"
import { useCloudUrl } from "../../utils/cloud-url"
import { StructuredData } from "../../components/StructuredData"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

const meta = {
  name: "Cloud",
  description:
    "The fastest open source time-series database fully managed on the cloud, now available on AWS",
  image: "/img/pages/cloud/screens-thumb.png",
}

const CloudPage = () => {
  const { siteConfig } = useDocusaurusContext()
  const cloudUrl = useCloudUrl()
  return (
    <>
      <StructuredData>
        {{
          "@graph": [
            {
              "@type": "BreadcrumbList",
              name: meta.name,
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
                  name: meta.name,
                  item: `${siteConfig.url}/cloud/`,
                },
              ],
            },
            {
              "@type": "SoftwareApplication",
              applicationCategory: "DeveloperApplication",
              name: meta.name,
              image: meta.image,
              description: meta.description,
              offers: {
                "@type": "Offer",
                price: "0.345", // lowest available hourly price
                priceCurrency: "USD",
              },
              brand: {
                "@type": "Brand",
                name: meta.name,
              },
            },
          ],
        }}
      </StructuredData>
      <Layout
        canonical="/cloud"
        description={meta.description}
        title={meta.name}
        image={meta.image}
      >
        <Top />
        <CompareFeatures />
        <Section fullWidth>
          <Section.Title center>Ready to get started?</Section.Title>

          <Section noGap center>
            <Button variant="primary" to={cloudUrl} newTab={false}>
              Start building now
            </Button>
          </Section>
        </Section>
        <Section>
          <ActionFooter />
        </Section>
      </Layout>
    </>
  )
}

export default CloudPage
