import React from "react"
import { Section } from "../../../components/Section"
import { Col, Row } from "../../../components/FeatureTable/types"
import { FeatureTable } from "../../../components/FeatureTable"

import styles from "./styles.module.css"
import Button from "@theme/Button"

const cols: Col[] = [
  {
    title: "Enterprise",
    width: "180px",
  },
  {
    title: "Enterprise Pro",
    width: "180px",
  },
  {
    title: "Enterprise Ultimate",
    width: "180px",
  },
]

const rows: Row[] = [
  {
    title: "Licence",
    values: ["Commercial", "Commercial", "Commercial"],
  },
  {
    title: "Max supported CPUs",
    values: ["Up to 4", "Up to 16", "Unlimited"],
  },
  {
    title: "Compression",
    description:
      "Significantly reduces storage costs, while reduced disk IO can lead to performance gains. Compression ratios vary depending on the data layout.",
    values: ["available", "available", "available"],
  },
  {
    title: "Role-based access control",
    description:
      "Column level, fine grained permission model that includes on-the-fly permission and account changes, secure secret storage, and an unlimited number of accounts.",
    values: ["available", "available", "available"],
  },
  {
    title: "Point-in-time data recovery",
    description:
      "Capability to recover data from a precise time in the past. Safely recover dropped tables, columns and partitions. Provides continuous data protection at a very low storage cost.",
    values: ["available", "available", "available"],
  },
  {
    title: "High availability",
    description:
      "Hot, cold and on-demand read replicas. Cross availability zone (AZ) setup.",
    values: ["available", "available", "available"],
  },
  {
    title: "TLS",
    description: "High-performance TLS Encryption for all network endpoints.",
    values: ["available", "available", "available"],
  },
  {
    title: "Kubernetes Operator",
    description:
      "Deploy QuestDB on your servers via our native Kubernetes Enterprise operator.",
    values: ["unavailable", "Optional", "available"],
  },
  {
    title: "Cold Storage Integration",
    values: ["unavailable", "Optional", "available"],
    description:
      "The QuestDB query engine seamlessly integrates with petabyte-scale and low-cost storage, allowing your SQL queries to span across storage tiers. Ingest data at industry-leading speed with QuestDB and access it with tools such as Spark or Hadoop.",
  },
  {
    title: "Support SLA: Response time",
    values: ["Up to 8 hours", "Up to 4 hours", " Up to 1 hour"],
  },
  {
    title: "Priority releases",
    values: ["unavailable", "Optional", "available"],
  },
]

export const CompareFeatures = () => (
  <Section center fullWidth>
    <Section.Title center size="small">
      Enterprise Products
    </Section.Title>
    <Section noGap className={styles.root}>
      <FeatureTable rows={rows} cols={cols} firstColWidth="200px" />
    </Section>
    <Section noGap center>
      <Button
        variant="primary"
        to="/enterprise/contact/"
        size="normal"
        uppercase={false}
        className={styles.cta}
      >
        Custom configurations available
      </Button>
    </Section>
  </Section>
)
