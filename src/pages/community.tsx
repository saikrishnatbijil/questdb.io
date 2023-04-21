import React from "react"
import clsx from "clsx"
import Layout from "../theme/Layout"
import Subscribe from "../components/Subscribe"
import seCss from "../css/section.module.css"
import paCss from "../css/community/page.module.css"
import customFields from "../config/customFields"
import { Section } from "../components/Section"

type Contribute = {
  alt: string
  image: string
  title: string
  url: string
}

const contribution: Contribute[] = [
  {
    image: "/img/pages/community/plugin.svg",
    title: "Help build a new feature",
    url: "https://github.com/questdb/questdb",
    alt: "A plugin icon",
  },
  {
    image: "/img/pages/community/bug.svg",
    title: "Report an issue",
    url: "https://github.com/questdb/questdb/issues",
    alt: "A bug icon",
  },
  {
    image: "/img/pages/community/docs.svg",
    title: "Improve the docs",
    url: "https://github.com/questdb/questdb.io",
    alt: "A document icon",
  },
]

const Community = () => (
  <Layout
    canonical="/community"
    description="Get involved with the developer community that's building the fastest open-source time series database."
    title="QuestDB developer community"
  >
    <Section>
      <Section.Title level={1} center>
        An open-source project that{" "}
        <span className={paCss.accent}>thrives</span> on collaboration and
        quality
      </Section.Title>
    </Section>

    <Section className={paCss.flex}>
      <div>
        <img
          src="/img/pages/community/slack.png"
          alt="A collage showing conversation from the QuestDB community Slack workspace with QuestDB stickers that participants receive"
          className={paCss.section_image}
          width={500}
          height={500}
        />
      </div>

      <div>
        <h2 className={paCss.section__title}>
          We’re super proud of the QuestDB community and everything our
          contributors do
        </h2>

        <p className={clsx(seCss.section__subtitle, paCss.section__subtitle)}>
          As a way of saying thank you for being part of the journey, we want to
          offer contributors awesome QuestDB t-shirts!
        </p>

        <div className={paCss.newsletter}>
          <p>Stay up to date with all things QuestDB</p>
          <Subscribe submitButtonVariant="primary" provider="newsletter" />
        </div>

        <div className={paCss.joinSlack}>
          <span>
            Join our growing community on{" "}
            <a className={paCss.link} href={customFields.slackUrl}>
              QuestDB’s Slack
            </a>
          </span>

          <a href={customFields.slackUrl}>
            <img
              src="/img/pages/community/slack-logo.svg"
              alt="Logo of Slack chat client"
              width={50}
              height={50}
            />
          </a>
        </div>
      </div>
    </Section>

    <Section odd fullWidth>
      <Section.Title size="small" center>
        Get your hands on QuestDB swag
      </Section.Title>

      <div className={paCss.flex}>
        <div className={paCss.shirtImage}>
          <img
            src="/img/pages/community/questdb-shirt.png"
            alt="A black t-shirt with the QuestDB logo printed on the front"
            className={paCss.section_image}
            width={400}
            height={400}
          />

          <div className={paCss.reward}>Get a QuestDB T-shirt!</div>
        </div>

        <div>
          <h3 className={paCss.section__title}>Show the love</h3>

          <ul className={paCss.list}>
            <li>
              Star our{" "}
              <a className={paCss.link} href={customFields.githubUrl}>
                GitHub repository
              </a>
            </li>

            <li>
              Submit a bugfix, feature or any other meaningful contribution via{" "}
              <a
                className={paCss.link}
                href="https://github.com/questdb/questdb"
              >
                bug report or pull request
              </a>{" "}
              with a reproducer
            </li>
          </ul>

          <div className={paCss.howToContribute}>
            <p>How to contribute?</p>

            <ul>
              {contribution.map((item: Contribute, index: number) => (
                <li key={index}>
                  <img src={item.image} alt={item.alt} width={18} height={18} />

                  <a href={item.url}>{item.title}</a>

                  <a className={paCss.contribution_link} href={item.url}>
                    <img
                      src="/img/pages/community/arrow.svg"
                      alt="An arrow icon"
                      width={8}
                      height={11}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>

    <Section>
      <div className={paCss.card} style={{ margin: "auto" }}>
        <h3>How can you claim swag?</h3>

        <p>
          Fill out the{" "}
          <a className={paCss.link} href="https://forms.gle/pXyKsQxtuMPNMGRC7">
            swag request form
          </a>
        </p>

        <p>Our team will review and validate your requests.</p>
      </div>
    </Section>
  </Layout>
)

export default Community
