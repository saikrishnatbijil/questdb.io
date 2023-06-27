import React from "react"
import { Section } from "../../../components/Section"
import Button from "@theme/Button"

import styles from "./styles.module.css"

export const Top = () => (
  <Section center className={styles.root}>
    <Section.Title level={1}>QuestDB Enterprise</Section.Title>
    <Section.Subtitle center className={styles.subtitle}>
      QuestDB Enterprise is deployed on your infrastructure and includes
      closed-source features to run QuestDB at any scale.
    </Section.Subtitle>

    <Button variant="primary" to="/enterprise/contact" className={styles.cta}>
      Get started
    </Button>
  </Section>
)
