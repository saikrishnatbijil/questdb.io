import React from "react"
import { Section } from "../../../components/Section"
import SvgImage from "../../../components/SvgImage"
import AwsLogo from "../../../assets/img/aws.svg"
import AzureLogo from "../../../assets/img/azure.svg"
import GoogleCloudLogo from "../../../assets/img/gc.svg"

import styles from "./styles.module.css"

const logos = [
  { image: <AwsLogo width="46" height="28" />, title: "AWS logo" },
  {
    image: <GoogleCloudLogo width="168" height="25" />,
    title: "Google Cloud logo",
  },
  { image: <AzureLogo width="87" height="25" />, title: "Azure logo" },
]

export const Providers = () => (
  <Section noGap center className={styles.root}>
    <Section.Subtitle center>Available on</Section.Subtitle>
    <div className={styles.logos}>
      {logos.map((logo, i) => (
        <div className={styles.logo} key={i}>
          <SvgImage image={logo.image} title={logo.title} />
        </div>
      ))}
    </div>
  </Section>
)
