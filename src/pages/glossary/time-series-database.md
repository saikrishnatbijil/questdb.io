---
index_title: Time-Series Database
title: What Is a Time-Series Database?
wrapperClassName: career
---

# What Is a Time-Series Database?

A time-series database (TSDB) is a database designed to efficiently store and
process time-series data.

Time series data is a set of data points associated with a timestamp, typically
collected and recorded in chronological order. Examples include financial market
data, sensor readings, and application or infrastructure metrics.

Due to the continuous nature of time series data, traditional relational
databases are not optimized to store and query them. On the other hand,
time-series databases are purpose-built to handle the unique characteristics of
time-series data, allowing for fast ingestion and analysis.

## What makes time series data different?

Time series data is different from other types of data due to its temporal
nature. It is marked by the following characteristics:

- The order of the data is important. It captures temporal information such as
  seasonality and cyclicality.
- The volume of data is very large.
- The flow of data is often uninterrupted within a time window.
- The amount of data may vary widely depending on the time interval.
- The relevance of each data point diminishes over time.
- The data is often downsampled or aggregated over different time intervals.

Analyzing time series data involves identifying trends over time to create
forecasting models or detect anomalies. An example query might look at a weekly
average sensor reading over the last six months or track the maximum price of a
stock per hour over a week. Traditional databases often struggle with these
kinds of queries.

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Example of a chart that plots time-series data: Daily energy usage and forecast in Germany, in May 2018."
  height={342}
  src="/img/glossary/time-series-database/chart.webp"
  width={770}
  title="Example of a chart that plots time-series data: Daily energy usage and forecast in Germany, in May 2018."
/>

## How do time-series databases deal with time-series data?

Time-series databases make different design choices to optimize for time-series
data.

First, to capture a large amount of data and respond to them in near real-time,
time-series databases focus on ingestion speed over transactional guarantees
that SQL databases provide. Data is usually written in an append-only manner
instead of updating or deleting individual records. This allows time-series
databases to ingest data fast and expose the most recent data for analysis such
as anomaly detection.

Also, time-series databases use streaming protocols like the InfluxDB line
protocol (ILP) to more efficiently ingest data. ILP is a high-performance,
text-based line protocol that can represent data points compactly and support
schema-less ingestion. By utilizing protocols like ILP, time-series databases
can ingest changing data on the fly such as telemetry data from VMs or sensors
without needing to specify the schema upfront. It can also accommodate changes
to the schema, unlike SQL databases that require migrations.

Once ingested, data is then automatically indexed and partitioned by time for
fast retrieval of time-based queries.

Time-series databases also use data compression and retention techniques to
efficiently store and archive older data.

Finally, to support the analysis of time-series data, time-series databases also
come with built-in functions for downsampling, interpolating, and aggregating
time-series data. These functions enable efficient temporal analysis to identify
trends and insights from the data.

## Why are time-series databases popular?

The amount of data being collected is continually growing. And a lot of that
data is marked with a timestamp.

In financial markets, we have pricing information on stocks, commodities, and
cryptocurrencies being used by trading desks, fintechs, and traditional firms
such as banks more than ever.

With the rise of the Internet of Things (IoT), we are now collecting more sensor
data for asset tracking, remote monitoring, and personalized health platforms.

Finally, cloud computing has enabled more companies to easily run VMs in the
cloud, leading to an explosion of application and operational metrics.

While traditional relational or NoSQL databases can also store and process this
information, it does not perform well at scale compared to time-series
databases. Coupled with the nice built-in functions to analyze this data, it is
no secret why time-series databases are growing in popularity in more sectors:

- IoT: asset tracking, electric batteries monitoring, smart grids, supply chain
  optimization
- Finance: financial tick data, financial metrics, transaction logs, blockchain
  data
- Application metrics: user behavior, e-commerce order tracking, API monitoring
- Industrial: process control, production line monitoring, predictive
  maintenance
- Infrastructure metrics: server metrics, network data, log management
