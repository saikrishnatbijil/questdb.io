import React from "react"
import { Section } from "../../../components/Section"

import styles from "./styles.module.css"

import { logos as logosManifest } from "../../../assets/logos"
import Button from "@theme/Button"
import clsx from "clsx"

const caseStudies = [
  {
    company: "Copenhagen Atomics",
    title: "Copenhagen Atomics",
    excerpt:
      "Copenhagen Atomics, manufacturer of next generation molten salt reactors, uses QuestDB to monitor their thorium reactors in real time.",
    link: "/case-study/copenhagen-atomics/",
    logo: { ...logosManifest["copenhagen-atomics"], height: 40 },
    image: "/img/pages/case-study/copenhagen-atomics/banner.png",
    imageAlt: "A photo of the Copenhagen Atomics truck on the road",
  },
  {
    company: "Central Group",
    title: "Central Group",
    excerpt:
      "QuestDB is the core engine driving real-time analytics data for Central Group, the largest retail company in Asia.",
    link: "/case-study/central-group/",
    logo: logosManifest["central-group"],
    image: "/img/pages/case-study/central-group/header.jpg",
    imageAlt: "A photo of the Central Group shopping mall",
  },
  {
    company: "Syndica",
    title: "Syndica",
    excerpt:
      "QuestDB is the database for real-time analytics and time-series dashboards at Syndica.",
    link: "/case-study/syndica/",
    logo: logosManifest.syndica,
    image: "/img/pages/case-study/syndica/preview.png",
    imageAlt: "An illustration with Syndica company statistics",
  },
]

export const CaseStudies = () => {
  const [activeItem, setActiveItem] = React.useState(0)

  return (
    <Section center>
      <Section.Title size="small">Powering Enterprise Success</Section.Title>
      <div className={styles.root}>
        <div className={styles.nav}>
          {caseStudies.map(({ company, logo }, index) => (
            <div
              key={company}
              className={clsx(styles.company, {
                [styles.active]: index === activeItem,
              })}
              onClick={() => setActiveItem(index)}
            >
              <img
                alt={logo.alt}
                src={logo.src}
                width={logo.width}
                height={logo.height}
              />
            </div>
          ))}
        </div>

        <div className={styles.slide}>
          <div className={styles.slideContent}>
            <h3 className={styles.slideTitle}>
              {caseStudies[activeItem].title}
            </h3>
            <p>{caseStudies[activeItem].excerpt}</p>

            <Button
              variant="secondary"
              size="xsmall"
              uppercase={false}
              to={caseStudies[activeItem].link}
            >
              View full case study
            </Button>
          </div>

          <img
            src={caseStudies[activeItem].image}
            alt={caseStudies[activeItem].imageAlt}
            className={styles.slideImage}
          />
        </div>
      </div>
    </Section>
  )
}
