import React from "react"
import { Section } from "../../../components/Section"
import styles from "./styles.module.css"
import Shield from "../../../../static/img/icons/shield.svg"
import HddStack from "../../../../static/img/icons/hdd-stack.svg"
import LineGraph from "../../../../static/img/icons/line-graph.svg"
import SvgImage from "../../../components/SvgImage"

type Card = {
  title: string
  description: string
  icon: {
    component: JSX.Element
    alt: string
  }
}

const cards: Card[] = [
  {
    title: "Secure self-hosted environment",
    description:
      "QuestDB Enterprise is self-hosted on your infrastructure and aligns with your security requirements.",
    icon: {
      component: <Shield width="48" height="48" />,
      alt: "Shield icon",
    },
  },

  {
    title: "Works at any scale",
    description:
      "Handles petabytes of data reliably with horizontal scaling and a native cold storage integration.",
    icon: {
      component: <HddStack width="48" height="48" />,
      alt: "Disk drive stack icon",
    },
  },

  {
    title: "Storage costs under control",
    description:
      "Data compression and multiple storage tiers help you meet your storage needs and lower infrastructure costs.",
    icon: {
      component: <LineGraph width="48" height="48" />,
      alt: "Line graph icon",
    },
  },
]

export const Description = () => (
  <Section center className={styles.root}>
    <Section.Title level={2} size="small" center>
      Why use QuestDB Enterprise?
    </Section.Title>

    <div className={styles.cards}>
      {cards.map((card, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.cardIcon}>
            <SvgImage image={card.icon.component} title={card.icon.alt} />
          </div>
          <div className={styles.cardTitle}>{card.title}</div>
          <div className={styles.cardDescription}>{card.description}</div>
        </div>
      ))}
    </div>
  </Section>
)
