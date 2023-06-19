import React, { useEffect, useState } from "react"
import { useExternalScript } from "../../utils/useExternalScript"

type Props = {
  region: string
  portalId: string
  formId: string
  target: string
}

const HubspotContactForm = ({ region, portalId, formId, target }: Props) => {
  const [formReady, setFormReady] = useState(false)
  const hubspotStatus = useExternalScript(
    "https://js.hsforms.net/forms/v2.js",
    {
      removeOnUnmount: false,
    },
  )

  useEffect(() => {
    if (hubspotStatus === "ready") {
      window.hbspt.forms.create({
        region,
        portalId,
        formId,
        target,
        css: "",
        onFormReady: () => {
          setFormReady(true)
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubspotStatus])

  const props = {
    [target.startsWith("#") ? "id" : "className"]: target.substr(1),
  }

  return (
    <>
      <div {...props} />
      {!formReady && <p>Loading form...</p>}
    </>
  )
}

export default HubspotContactForm
