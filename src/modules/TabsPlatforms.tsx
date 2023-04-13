import React from "react"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import { usePluginData } from "@docusaurus/useGlobalData"
import { getAssets } from "../utils/get-assets"
import type { Release, Asset } from "../utils/get-assets"

type Props = {
  platforms: Array<{
    label: string
    value: string
  }>
  render: (asset: Asset) => JSX.Element
}

export const TabsPlatforms = ({ render, platforms }: Props) => {
  const { release } = usePluginData<{ release: Release }>(
    "fetch-latest-release",
  )
  const assets = getAssets(release)

  const tabs = platforms
    .map((platform) => {
      const href = assets[platform.value].href
      if (typeof href !== "string") {
        return null
      }

      return { ...platform, href }
    })
    .filter(Boolean) as Props["platforms"]

  return (
    <Tabs defaultValue={platforms[0].value} values={tabs}>
      {tabs.map((tab) => (
        <TabItem key={tab.value} value={tab.value}>
          {render(assets[tab.value])}
        </TabItem>
      ))}
    </Tabs>
  )
}
