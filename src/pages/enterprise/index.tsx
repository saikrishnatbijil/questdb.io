import React from "react"

import Layout from "../../theme/Layout"

import { Top } from "../../modules/enterprise/Top"
import { Providers } from "../../modules/enterprise/Providers"
import { CompareFeatures } from "../../modules/enterprise/CompareFeatures"
import { Actions } from "../../modules/enterprise/Actions"
import { CaseStudies } from "../../modules/enterprise/CaseStudies"
import { Description } from "../../modules/enterprise/description"

const title = "QuestDB Enterprise"
const description =
  "The fastest open source time-series database for organizations, on premise or on the cloud."

const Enterprise = () => (
  <Layout canonical="/enterprise" description={description} title={title}>
    <Top />
    <Description />
    <CompareFeatures />
    <Providers />
    <CaseStudies />
    <Actions />
  </Layout>
)

export default Enterprise
