---
index_title: Change Data Capture (CDC)
title: What Is Change Data Capture (CDC)?
wrapperClassName: career
---

import Screenshot from "@theme/Screenshot"

# What Is Change Data Capture (CDC)?

Change data capture (CDC) is a data integration technique used to track changes
to a data source and deliver those changes to destination systems in real time.

Most commonly, change data capture is used to monitor changes to a source
database and propagate those changes to a database, data warehouse, data lake,
or event streaming platform.

CDC is useful in situations where data consistency across various systems is
important. For example, change data capture systems are heavily utilized for
data replication, data migration, and data processing pipelines. Because CDC
systems track changes in real time, it preserves data integrity across systems
better than solutions that use batch processing.

<Screenshot
  alt="High level diagram of how CDC is used in a system in relation to source database, a message systems, and the target systems"
  height={342}
  src="/img/glossary/change-data-capture/dataflow.webp"
  width={770}
  title="CDC dataflow"
/>

## Use cases and benefits

Unlike batch processing systems that rely on periodic bulk uploads, CDC system’s
ability to track changes and sync data in real-time unlocks several use cases:

- **Real-time data integration**: CDC enables near real-time synchronization of
  data that can be used for data replication to scale workloads (e.g., adding
  data replicas) or to increase system availability (e.g., cross-region
  replication).
- **Zero-downtime migration**: CDC can support zero-downtime migration between
  databases, whether it involves moving data from on-prem service to the cloud
  or from legacy systems to new database versions. CDC can continuously
  synchronize data during the migration without having to take snapshots or
  restart the database during upgrades.
- **Real-time analytics**: CDC is often an integral part of a stream processing
  pipeline as it can propagate data to multiple destination systems in
  real-time. The changes in data can then be analyzed in real time for anomaly
  detection or forecasting models.
- **Reliable data exchange**: When there is a need to broadcast an update to
  multiple data stores (e.g., updating a record in a database and also sending
  it to a messaging system), sending those requests independently can lead to
  data inconsistencies when one of the systems encounters a failure. CDC
  prevents this
  “[dual-write](https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/)”
  issue by enabling the
  [transactional outbox pattern](https://microservices.io/patterns/data/transactional-outbox.html)
  to trigger updates once writes to one data store have been completed.
- **Auditing**: Since CDC captures database actions (e.g., insert, update,
  delete), it has a built-in record of data changes. This can be useful for
  creating auditing reports for compliance or security purposes.

## CDC methods

Underneath the hood, CDC systems implement different strategies
to track and capture changes:

- **Audit-column-based**: CDC system can monitor an audit column (usually a
  timestamped field such as `Last Updated Time` or `Modified Timestamp`) to
  retrieve rows that have been added or updated since the last processing time.
  This is a simple system to implement, but cannot handle hard delete
  operations.
- **Trigger-based**: Most databases support a trigger function where a stored
  procedure will automatically run when a data manipulation event (e.g., insert,
  update, or delete) occurs. Using a trigger-based system could simplify the CDC
  architecture as trigger functions are natively built into the database.
  However, trigger functions often incur a performance cost and can lead to a
  management burden as the data format changes.
- **Log-based**: The most popular approach to implementing CDC inspects
  transaction logs that databases utilize for crash recovery or replication
  means. By parsing these logs, CDC systems can relay these changes to
  downstream systems. The primary benefit of using a log-based system is that it
  does not add computational overhead to the source database. It can record all
  database changes including schema updates from the application, by decoding
  the logs. However, decoding the transaction log may be complex and requires
  additional system components outside the database.

    <Screenshot
    alt="Log-based CDC system: Diagram of how data manipulation is captured to a log and then used to update the table"
    height={342}
    src="/img/glossary/change-data-capture/log-based.webp"
    width={770}
    title="Log-based CDC is the most popular CDC method"
    />

## Popular tools for CDC

There are many change data capture solutions, ranging from open source to commercial services:

- Open-source:
    - [Debezium](https://github.com/debezium)
    - [Apache Nifi](https://github.com/apache/nifi)
- Open-source with managed offerings:
    - [Estuary Flow](https://github.com/estuary/flow)
    - [Confluent Cloud](https://www.confluent.io/confluent-cloud/)
    - [Materialized](https://github.com/MaterializeInc/materialize)
- Commercial:
    - [Striim](https://www.striim.com)
    - [StreamKap](https://streamkap.com)
    - [StreamSets](https://streamsets.com)

## Additional resources

- [Change Data Capture with QuestDB and Debezium](/blog/2023/01/03/change-data-capture-with-questdb-and-debezium/)
- [QuestDB Kafka connector](/docs/third-party-tools/kafka/questdb-kafka/)