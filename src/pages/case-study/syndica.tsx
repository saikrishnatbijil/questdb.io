import clsx from "clsx"
import React from "react"

import Button from "@theme/Button"
import Layout from "../../theme/Layout"
import CodeBlock from "@theme/CodeBlock"
import { Image } from "../../components/Image"

import caCss from "../../css/case-study/card.module.css"
import juCss from "../../css/case-study/jumbotron.module.css"
import ouCss from "../../css/case-study/outcome.module.css"
import seCss from "../../css/section.module.css"
import { logos } from "../../assets/logos"

const syndicaHomepage = "https://syndica.io/?utm_source=questdb"

const queries = [
  `SELECT
  start_time AS ts,
  count(*)
FROM
  request_logs
WHERE
  timestamp > dateadd(‘ d ’, -30, now())
  AND kind = ‘ RPC ’ SAMPLE BY 1s FILL(NULL) ALIGN TO CALENDAR TIME ZONE 'UTC'`,

  `SELECT
  sum(bytes_transferred)
FROM
  request_logs
WHERE
  start_time < '%s'
  AND start_time >= '%s'
  AND account_uuid = '%s'`,

  `SELECT
  avg(duration)
FROM
  request_logs
WHERE
  start_time < '%s'
  AND start_time >= '%s'
  AND account_uuid = '%s'
  AND kind = 'RPC'`,

  `SELECT
  COUNT(*)
FROM
  request_logs
WHERE
  start_time < '%s'
  AND start_time >= '%s'
  AND account_uuid = '%s'`,

  `SELECT
  distinct ip,
  ip_lat,
  ip_long
FROM
  request_logs
WHERE
  (
    project_uuid = '%s'
    and stack_uuid = '%s'
  )
  AND start_time > '%s'
LIMIT
  10000`,
]

const values = [
  {
    description: "Use case: Application metrics, analytics, dashboards",
    icon: {
      alt: "Breafcase icon",
      src: "/img/pages/case-study/icons/briefcase.svg",
    },
  },
  {
    description: "Industry: Web3",
    icon: {
      alt: "Globe icon",
      src: "/img/pages/case-study/icons/globe.svg",
    },
  },
  {
    description: "Deployment: QuestDB Cloud",
    icon: {
      alt: "Flag icon",
      src: "/img/pages/case-study/icons/flag.svg",
    },
  },
]

const Page = () => {
  const title = "Syndica"
  const description =
    "QuestDB is the database for real-time analytics and time-series dashboards at Syndica."

  return (
    <Layout
      canonical="/case-study/syndica"
      description={description}
      title={title}
      image="/img/pages/case-study/syndica/header.png"
    >
      <section
        className={clsx(
          seCss.section,
          seCss["section--center"],
          juCss.jumbotron,
        )}
      >
        <div className={juCss.jumbotron__summary}>
          <div className={juCss.jumbotron__header}>
            <Button href={syndicaHomepage} variant="plain">
              <img
                alt="Syndica logo"
                className={juCss.jumbotron__logo}
                height={45}
                src={logos.syndica.src}
                width={100}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>Syndica</h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              juCss.jumbotron__description,
            )}
          >
            {description}
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <Image
            description="Syndica powers the Web3 infrastructure"
            src="/img/pages/case-study/syndica/header.png"
            width={764}
            height={452}
          />
        </div>
      </section>

      <section className={clsx(seCss.section, seCss["section--odd"])}>
        <div className={clsx(seCss["section--inner"], ouCss.outcome__wrapper)}>
          {values.map(({ icon, description }, index) => (
            <p key={index} className={ouCss.outcome}>
              <img
                alt={icon.alt}
                className={ouCss.outcome__icon}
                src={icon.src}
              />
              {description}
            </p>
          ))}
        </div>
      </section>

      <section className={seCss.section}>
        <div
          className={clsx(
            "markdown",
            seCss["section--inner"],
            seCss["section--column"],
          )}
        >
          <h3>Introduction to Syndica</h3>
          <p className="font-size--large">
            <a href={syndicaHomepage}>Syndica</a> provides highly scalable
            infrastructure for decentralized applications built on top of
            blockchains.
          </p>

          <p className="font-size--large">
            The company brings tools and services to the Solana dApp development
            community. It aims to bridge the gap between dApp development
            platforms and Web 2.0 developer tools, widely used to develop modern
            web apps. Syndica brings these two worlds together in a single,
            easy-to-use platform which reduces development time, improves dApp
            performance, and increases overall observability in the
            decentralized applications.
          </p>

          <p className="font-size--large">
            The offering includes a scalable RPC node infrastructure, with
            either elastic or dedicated nodes. Their custom-built API gateway
            routes requests across nodes to ensure network resiliency and high
            availability. Syndica also provides observability into each dApp,
            tracking metrics such as the number of users and their demographics,
            the number of RPC requests over time, average RPC response time,
            bytes transferred, as well as detailed logging for each RPC call. In
            addition, their service offers searchable logs to help assist in
            various stages of development.
          </p>

          <Image
            alt="Graph describing Fault-Tolerant Network of Syndica"
            src="/img/pages/case-study/syndica/fault-tolerant-network.png"
            width={818}
            height={518}
          />

          <p className="font-size--large">
            In this case study, Ahmad Abbasi, Co-founder and CEO of Syndica,
            shares how QuestDB is at the core of their powerful offering.
          </p>

          <h3>
            Why do time series databases matter for Web3 infrastructure and
            real-time dashboards?
          </h3>

          <p className="font-size--large">
            We offer user-facing analytics and real-time dashboards for
            companies building protocols and decentralized applications. To
            provide fast analytics to our users, we first need to collect a vast
            amount of time series data from the node infrastructure and API
            gateway that we provide to our users. Each observability and
            analytics request triggers real-time queries to our database to
            power dashboards tracking metrics such as RPC calls over time. We
            had to find a database that could handle a high throughput ingestion
            rate combined with fast querying capabilities simultaneously,
            without breaking down.
          </p>

          <p className="font-size--large">
            Traditional databases simply cannot handle the ingestion rate we
            require. They also cannot query the data fast enough for reactive
            dashboards; their aggregation and downsampling functionality tends
            to be slow, so we cannot rely on them to deliver snappy analytics to
            our users.
          </p>

          <p className="font-size--large">
            By contrast, time-series databases (“TSDBs”) are purpose-built for
            storing large amounts of timestamped data, making them more
            efficient for storage and querying. Their storage engines and data
            layouts are built to easily retrieve timestamped data efficiently
            and track specific metrics over time. Built-in analytical
            capabilities with languages such as SQL are often available out of
            the box.
          </p>

          <p className="font-size--large">
            At Syndica, we collect timestamped application metrics from dApps,
            such as RPC calls. The sheer volume of data that has to be collected
            and processed, as well as our visualizations needs with real-time
            dashboards, led us toward time-series databases.
          </p>

          <p className="font-size--large">
            Similarly, we use TSDBs for our internal infrastructure monitoring,
            as they can promptly alert us of issues within our systems. For
            instance, we can be notified if latencies are increasing in our
            response time, or if any errors are propagating to our clients. We
            wanted to pick one solution for all our time-series data needs.
          </p>

          <h3>Picking QuestDB for our time-series database</h3>

          <p className="font-size--large">
            Our requirements were straightforward to start with: we were looking
            for a time series database that was easy to use, with excellent
            ingestion throughput as well as superior query performance to power
            our analytics and dashboards. At the same time, we were looking for
            simplicity and a straightforward querying language that we know such
            as SQL.
          </p>

          <p className="font-size--large">
            We have tried almost everything the market offers: ClickHouse,
            TimescaleDB, PostgreSQL, Amazon Timestream, and InfluxDB.
          </p>

          <p className="font-size--large">
            None of them met all of our requirements except QuestDB. For
            instance, TimescaleDB is not performant enough; the ingestion speed
            was lacking. ClickHouse is not a time series database and does not
            provide out-of-the-box SQL extensions for time series manipulation.
            InfluxDB is not developer friendly due to its query language, Flux,
            and the database soon hit high cardinality limitations.
          </p>

          <p className="font-size--large">
            After some research and testing, we concluded that QuestDB is the
            best candidate because of the following reasons:
          </p>

          <p className="font-size--large">
            <ul>
              <li>
                High throughput ingestion via line protocol with out-of-order
                capabilities: we ingest non-stop ~300k rows per second on a
                single beefy instance.
              </li>
              <li>Ease of use with the SQL language to query the data.</li>
              <li>
                Time series extensions such as <code>SAMPLE BY</code> to power
                live dashboards (customer facing) that are responsive.
              </li>
              <li>
                Fast queries for time interval searches. We can easily query
                vast amounts of data concurrently.
              </li>
            </ul>
            We built our product with QuestDB at the core before we launched.
          </p>

          <h3>Architecture</h3>

          <p className="font-size--large">
            We have two QuestDB instances with applications communicating with
            them via InfluxDB line protocol (&quot;ILP&quot;) for ingestion and
            PGWire for queries. To chart our infrastructure metrics, we plot the
            results on dashboards via Grafana. We leverage the integration with
            QuestDB through the Postgres plugin.
          </p>

          <Image
            src="/img/pages/case-study/syndica/architecture.png"
            width={702}
            height={392}
            alt="A High-level architecture preview of Syndica."
          />

          <h3>SQL queries to power time-series dashboards</h3>

          <p className="font-size--large">
            We build reactive user-facing time-series dashboards to measure the
            number of RPC calls per user over time. We also calculate the total
            number of RPC requests over time, the average RPC response time and
            the total bytes transferred.
          </p>

          <Image
            src="/img/pages/case-study/syndica/syndica-dashboard2.png"
            width={766}
            height={340}
            alt="A High-level architecture preview of Syndica."
          />

          <p className="font-size--large">
            QuestDB uses SQL and features native extensions, such as{" "}
            <code>SAMPLE BY</code>. This is useful for downsampling the data by
            time intervals. As such, it is a good way to build a dashboard that
            tracks a metric over time.
          </p>

          <p className="font-size--large">
            To calculate the time-series dashboard with RPC requests for the
            last 30 days, the following is computed:
          </p>

          <CodeBlock>{queries[0]}</CodeBlock>

          <p className="font-size--large">
            <code>dateadd</code> is a time-series-specific function to choose a
            time interval spanning the last number of days, hours or seconds. In
            this case, 30 days.
          </p>

          <p className="font-size--large">
            The data is then sampled in 1-second intervals. This is the time
            resolution chosen for the chart above.
          </p>

          <p className="font-size--large">
            If no data is shown for a given 1-second time interval, we will fill
            it with <code>NULL</code>.
          </p>

          <p className="font-size--large">
            &quot;Bytes Transferred&quot; is calculated via the following query:
          </p>

          <CodeBlock>{queries[1]}</CodeBlock>

          <p className="font-size--large">
            &quot;Avg RPC response&quot; is calculated via the following query:
          </p>

          <CodeBlock>{queries[2]}</CodeBlock>

          <p className="font-size--large">
            We also provide structured searchable logs for the Syndica RPC
            network thanks to this mechanism. Users can filter and drill down to
            very detailed time slices (milliseconds) of logging data to gain
            ultimate visibility and observability of the running application.
          </p>

          <Image
            src="/img/pages/case-study/syndica/syndica-dashboard.png"
            width={793}
            height={520}
            alt="A High-level architecture preview of Syndica."
          />

          <p className="font-size--large">
            Examples of queries for the logs are:
          </p>

          <p className="font-size--large">
            Counting the number of logs for a given UUID account, over a defined
            time interval:
          </p>

          <CodeBlock>{queries[3]}</CodeBlock>

          <p className="font-size--large">
            Showing logs for specific IP addresses:
          </p>

          <CodeBlock>{queries[4]}</CodeBlock>

          <p className="font-size--large">
            By storing repetitive strings as <code>symbols</code>, and unique
            identifiers as <code>UUID</code> we can benefit from improved
            storage efficiency.
          </p>

          <h3>QuestDB Cloud for operational simplicity</h3>

          <p className="font-size--large">
            Our infrastructure is fully managed by QuestDB Cloud. The main
            advantages are:
            <ul>
              <li>
                Enhanced security with all our endpoints encrypted via TLS and
                auth for the web console.
              </li>
              <li>
                Ease of use: endpoints for InfluxDB Line Protocol, PostgreSQL
                and Rest API are provided, alongside client libraries for your
                programing language.
                <Image
                  src="/img/pages/case-study/syndica/questdb-cloud.png"
                  width={568}
                  height={358}
                />
              </li>
              <li>
                We get the benefit of dashboards to track the usage of the
                instance and the storage and quickly see if something went wrong
                and when.
                <Image
                  src="/img/pages/case-study/syndica/questdb-cloud2.png"
                  width={658}
                  height={495}
                />
              </li>
              <li>
                Daily scheduled snapshots are included; it is easy to start from
                a previous snapshot, either spinning a new instance or from the
                same one.
              </li>
            </ul>
          </p>

          <h3>What&apos;s next for Syndica?</h3>

          <p className="font-size--large">
            We look forward to seeing the cold storage integration for QuestDB
            Cloud as the amount of data we have stored in QuestDB is edging
            toward the 16TB limit for a single instance. The ability to offload
            older and less valuable data to cold storage seamlessly and have the
            ability to retrieve it at any time will be a game changer for us.
          </p>

          <div
            className={clsx(
              "markdown",
              seCss["section--inner"],
              seCss["section--column"],
            )}
          >
            <p className={caCss.card__title}>
              <span className={caCss.card__quote}>&ldquo;</span>
              QuestDB outperforms every database we have tested and delivered a
              10x improvement in querying speed. It has become a critical piece
              of our infrastructure.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>
            <p className={caCss.card__title}>
              <b>Ahmad Abbasi, Co-founder and CEO at Syndica</b>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Page
