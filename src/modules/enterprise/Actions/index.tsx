import React from "react"
import { Section } from "../../../components/Section"
import Button from "@theme/Button"
import Link from "@docusaurus/Link"

import styles from "./styles.module.css"

export const Actions = () => (
  <Section className={styles.root}>
    <Section.Subtitle center>
      Get in touch with us to discuss your needs
    </Section.Subtitle>

    <div className={styles.actionButtons}>
      <Link to="/enterprise/contact">
        <Button variant="primary">Contact us</Button>
      </Link>{" "}
      or{" "}
      <Link to="/cloud/book-a-demo">
        <Button variant="secondary">Book a demo</Button>
      </Link>
    </div>
  </Section>
)
