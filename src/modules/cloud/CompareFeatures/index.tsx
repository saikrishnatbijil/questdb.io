import React from "react"
import style from "./styles.module.css"
import { Section } from "../../../components/Section"
import { Col, Row } from "../../../components/FeatureTable/types"
import { FeatureTable } from "../../../components/FeatureTable"

const cols: Col[] = [
  {
    title: "Open Source",
  },
  {
    title: "QuestDB Cloud",
  },
]

const coreFeaturesRows: Row[] = [
  {
    title: "High-throughput ingestion",
    values: ["available", "available"],
  },
  {
    title: "Out-of-order ingestion",
    values: ["available", "available"],
  },
  {
    title: "High-performance SQL",
    values: ["available", "available"],
  },
  {
    title: "Time-series-native SQL extensions",
    values: ["available", "available"],
  },
  {
    title: "High-performance data migration",
    values: ["available", "available"],
  },
  {
    title: "Geospatial data type",
    values: ["available", "available"],
  },
  {
    title: "Cloud-native backups",
    values: ["available", "available"],
  },
  {
    title: "Built-in web console",
    values: ["available", "available"],
  },
  {
    title: "Cold storage support",
    values: ["unavailable", "coming-soon"],
  },
  {
    title: "Data compression",
    values: ["unavailable", "coming-soon"],
  },
]

const securityFeaturesRows: Row[] = [
  {
    title: "Authentication",
    values: ["available", "available"],
  },
  {
    title: "SSO Authentication",
    values: ["not-applicable", "available-new"],
  },
  {
    title: "TLS encryption",
    values: ["not-applicable", "available"],
  },
  {
    title: "EBS volume encryption",
    values: ["not-applicable", "available"],
  },
  {
    title: "VPC peering",
    values: ["not-applicable", "coming-soon"],
  },
  {
    title: "Role-based authorization",
    values: ["unavailable", "coming-soon"],
  },
  {
    title: "Bring your own key encryption",
    values: ["not-applicable", "coming-soon"],
  },
  {
    title: "IP whitelisting",
    values: ["not-applicable", "available-new"],
  },
]

const highAvailabilityFeaturesRows: Row[] = [
  {
    title: "Cloud-native replication",
    values: ["coming-soon", "coming-soon"],
  },
  {
    title: "High-availability reads",
    values: ["coming-soon", "coming-soon"],
  },
  {
    title: "High-availability writes",
    values: ["unavailable", "coming-soon"],
  },
]

const managedInfrastructureRows: Row[] = [
  {
    title: "Scheduled backups",
    values: ["not-applicable", "available"],
  },
  {
    title: "Monitoring and alerting",
    values: ["not-applicable", "available"],
  },
  {
    title: "Start / Stop instance",
    values: ["not-applicable", "available-new"],
  },
  {
    title: "Auto scaling",
    values: ["not-applicable", "coming-soon"],
  },
  {
    title: "Zero-downtime upgrades",
    values: ["unavailable", "coming-soon"],
  },
]

const supportFeaturesRows: Row[] = [
  {
    title: "Community support",
    values: ["available", "available"],
  },
  {
    title: "Standard customer support",
    values: ["unavailable", "available"],
  },
  {
    title: "Customized SLA",
    values: ["unavailable", "contact-us"],
  },
]

const tableProps = {
  cols,
  firstColWidth: "50%",
}

export const CompareFeatures = () => {
  return (
    <Section odd fullWidth>
      <Section.Title center size="small">
        Features
      </Section.Title>

      <Section noGap>
        <div className={style.tables}>
          <FeatureTable
            title="Core features"
            rows={coreFeaturesRows}
            {...tableProps}
          />

          <FeatureTable
            title="Managed infrastructure"
            rows={managedInfrastructureRows}
            {...tableProps}
          />

          <FeatureTable
            title="Security"
            rows={securityFeaturesRows}
            {...tableProps}
          />

          <FeatureTable
            title="High availability"
            rows={highAvailabilityFeaturesRows}
            {...tableProps}
          />

          <FeatureTable
            title="Support"
            rows={supportFeaturesRows}
            {...tableProps}
          />
        </div>
      </Section>
    </Section>
  )
}
