import React from "react"
import Layout from "../../theme/Layout"
import HubspotContactForm from "../../components/HubspotContactForm"
import { Section } from "../../components/Section"
import styles from "./styles.module.css"

const Contact = () => {
  const title = "QuestDB Enterprise | Contact Us"
  const description =
    "The fastest open source time-series database for organizations, on premise or on the cloud."

  return (
    <Layout
      canonical="/enterprise/contact"
      description={description}
      title={title}
    >
      <Section noGap>
        <Section center className={styles.root}>
          <Section.Title level={1}>Contact Us</Section.Title>
          <HubspotContactForm
            region="na1"
            portalId="23633230"
            formId="7ac9eb8f-276f-4c9c-964f-1bb6b032a9e7"
            target="#enterprise-contact-us"
          />
        </Section>
      </Section>
    </Layout>
  )
}

export default Contact
