---
index_title: Stream Processing
title: What Is Stream Processing?
wrapperClassName: career
---

import Screenshot from "@theme/Screenshot"

# What Is Stream Processing?

Stream processing, or complex event processing (CEP), is a data processing technique that collects, transforms, and analyzes streams of data in real time. Stream processing systems are designed to handle large amounts of high-velocity events (e.g., IoT sensor readings, financial market data, server usage metrics) and provide real-time insights. 

<Screenshot
  alt="Stream processing visualization"
  height={342}
  src="/img/glossary/stream-processing/stream-processing.webp"
  width={770}
  title="Stream processing processes transaction in real time."
/>

## Stream vs. batch processing

Traditional data pipelines use batch processing where data is analyzed in batches. This incurs latency penalty due to the lag between the event taking place and the data being processed.

<Screenshot
  alt="Batch processing visualization"
  height={342}
  src="/img/glossary/stream-processing/batch-processing.webp"
  width={770}
  title="Batch processing collects events and processes them in batch."
/>

Contrary to batch processing, stream processing analyzes data on the fly. This means that analysis occurs as soon as data is ingested, and therefore stream processing systems enable use cases where real-time decision-making is useful. Examples include anomaly detection, fraud prevention, and predictive analytics. 

Popular stream processing systems include:

- Messaging systems: [Apache Kafka](/docs/third-party-tools/kafka/overview/), [Redpanda](/docs/third-party-tools/redpanda/)
- Stream processing platforms: [Apache Flink](/docs/third-party-tools/flink/), [Apache Spark](/docs/third-party-tools/spark/)
- Commercial offerings from hyperscalers: AWS Kinesis, Azure Stream Analytics, Google Dataflow

## Types of stream processing

There are two major types of stream processing:

- **Stateful**: Stateful stream processing models take historical information into account when making decisions or operating on the data. These types of models are useful when historical context or temporal relationships are important. For example, an e-commerce website may give discounts or different offers to returning customers versus new users when processing user sessions on their checkout process.  
- **Stateless**: Stateless systems, on the other hand, process data as is without historical context. IoT monitoring systems that are monitoring the state of their sensors may opt for a stateless stream processing model for real-time detection of faults or failures (e.g., the temperature is too high). The data may be analyzed later for forecasting purposes further downstream. 

In general, stateful stream processing systems are more complex as they must [handle state updates and failures gracefully](https://arxiv.org/pdf/1506.08603.pdf). 

However, in use cases where historical context is important, stateful stream processing systems can provide more advanced insights. 

## Use cases

As the need for real-time analytics grows, stream processing is growing more popular across many industries:

- Financial markets: credit fraud monitoring, real-time trading engines
- IoT: supply chain metrics, smart grids, smart homes, predictive maintenance
- Telecommunications: networking monitoring, traffic analysis
Application metrics: personalized recommendations, inventory management

## Additional Resources

- [Integrate Apache Spark and QuestDB for Time-Series Analytics](/blog/integrate-apache-spark-questdb-time-series-analytics/)
- [How to build a real-time crypto tracker with Redpanda and QuestDB](https://redpanda.com/blog/real-time-crypto-tracker-questdb-redpanda)
- [Realtime crypto tracker with QuestDB Kafka Connector](/blog/realtime-crypto-tracker-with-questdb-kafka-connector/)
- [Ingesting Financial Tick Data Using a Time-Series Database](/blog/ingesting-financial-tick-data-using-time-series-database/)