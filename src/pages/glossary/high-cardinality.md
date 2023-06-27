---
index_title: High Cardinality
title: What Is High Cardinality?
wrapperClassName: career
---

import Screenshot from "@theme/Screenshot"

# What Is High Cardinality?

Cardinality is a data attribute that captures how many distinct values make up a
set. In turn, having high cardinality data means that there is a large number of
unique values in the dataset.

In the context of databases, cardinality often refers to the number of distinct
elements in a single column. For example, in a database storing e-commerce data,
a column might store `customerId` whereas others may store `productId` or
`productCategory`. `customerId` and `productId` are high-cardinality attributes
with potentially unbounded distinct values. On the other hand, `productCategory`
may be a low-cardinality attribute in comparison with a smaller set of values.

When discussing the cardinality of the entire dataset, to calculate the total
number of unique combinations, the cardinality of each of the columns of
interest is multiplied. Taking our e-commerce example, let’s say we had 10
customers, 20 products, and 2 product categories. In this case, the cardinality
of the dataset would be 10 \* 20 \* 2 = 400.

## High cardinality in time-series data

Time-series data tends to have high cardinality since each row will usually have
many columns that act as tags. For example, in industrial IoT systems, a
[time-series database](/glossary/time-series-database/) may track device types,
firmware versions, locations, as well as various sensor readings. Since
cardinality is multiplicative, simply adding a new field such as a new firmware
version will lead to exponential growth in cardinality. Time-series data in
other verticals display similar characteristics: financial data and network
monitoring all have many columns with high cardinality such as stock ticker, IP,
port, protocol, and other metadata fields.

<Screenshot
  alt="This network analytics table has high cardinality because the combination of unique values for Source IP, Source Port, and Protocol is very large.
"
  height={342}
  src="/img/glossary/high-cardinality/high-cardinality.webp"
  width={770}
  title="This network analytics table has high cardinality because the combination of unique values for Source IP, Source Port, and Protocol is very large.
"
/>

## Challenges for databases with high cardinality datasets

High-cardinality data can present challenges for databases in terms of
performance. Depending on the underlying data model used, storing and indexing
datasets with high cardinality can significantly impact performance negatively.
As cardinality grows, the amount of data to be processed explodes, thus leading
to degraded write and query performance.

Underneath the hood, the challenge stems from the way databases store and
process data. For example, in InfluxDB and some other time-series databases,
each time series is stored separately in its own group of files. When storing
thousands or millions of time series in the same table, write and full-scan
query performance drops significantly. The reason is that disk writes and reads
have much fewer sequential patterns in these high-cardinality scenarios. As a
result, memory requirements grow exponentially with the number of unique time
series.

Other symptoms of databases struggling with high-cardinality data include:

- High memory usage
- Slow query performance
- Back pressure
- High CPU usage

## Dealing with high cardinality in QuestDB

QuestDB uses a dense, [column-based storage model](/docs/concept/storage-model/)
where each column is stored separately in its own native format. All the rows
are sorted by time and split into
[time-based partitions](/docs/concept/partitions/) to preserve sequential
patterns. This allows QuestDB to maintain a good level of performance in all
scenarios, including high cardinality.

## Additional resources

- [How databases handle 10 million devices in high-cardinality benchmarks](/blog/2021/06/16/high-cardinality-time-series-data-performance)
