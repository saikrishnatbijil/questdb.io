---
title: Time Partitions
sidebar_label: Partitions
description:
  Overview of QuestDB's partition system for time-series. This is an important
  feature that will help you craft more efficient queries.
---

[Database partitioning](/glossary/database-partitioning/) is the technique that
splits data in a large database into smaller chunks in order to improve the
performance and scalability of the database system.

QuestDB offers the option to partition tables by intervals of time. Data for
each interval is stored in separate sets of files.

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Diagram of data column files and how they are partitioned to form a table"
  height={373}
  src="/img/docs/concepts/partitionModel.svg"
  width={745}
/>

## Properties

- Partitioning is only possible on tables with a
  [designated timestamp](/docs/concept/designated-timestamp/).
- Available partition intervals are `NONE`, `YEAR`, `MONTH`, `WEEK`, `DAY`, and `HOUR`.
- Default behavior is`PARTITION BY NONE` when using
  [CREATE TABLE](/docs/reference/sql/create-table/).
- Default behavior is `PARTITION BY DAY` via
  [ILP ingestion](/docs/reference/api/ilp/overview/). This is set by `line.default.partition.by`.
- Partitions are defined at table creation. For more information, refer to the
  [CREATE TABLE section](/docs/reference/sql/create-table/).
- The naming convention for partition directories is as follows:

| Table Partition | Partition format |
| --------------- | ---------------- |
| `HOUR`          | `YYYY-MM-DD-HH`  |
| `DAY`           | `YYYY-MM-DD`     |
| `WEEK`          | `YYYY-Www`       |
| `MONTH`         | `YYYY-MM`        |
| `YEAR`          | `YYYY`           |

## Advantages of adding time partitions

We recommend adding time partition to table to benefit from the following
advantages:

- Reducing disk IO for timestamp interval searches. This is because our SQL
  optimizer leverages partitioning.
- Significantly improving calculations and seek times. This is achieved by
  leveraging the chronology and relative immutability of data for previous
  partitions.
- Separating data files physically. This makes it easily to implement file
  retention policies or extract certain intervals.

## Checking time partition information

The following SQL keyword and function are implemented to present the partition
information of a table:

- The SQL keyword [SHOW PARTITIONS](/docs/reference/sql/show/#show-partitions)
  returns general partition information for the selected table.
- The function [table_partitions('tableName')](/docs/reference/function/meta/)
  returns the same information as `SHOW PARTITIONS` and can be used in a
  `SELECT` statement to support more complicated queries such as `WHERE`,
  `JOIN`, and `UNION`.

## Storage example

Each partition effectively is a directory on the host machine corresponding to
the partitioning interval. In the example below, we assume a table `trips` that
has been partitioned using `PARTITION BY MONTH`.

```
[quest-user trips]$ dir
2017-03     2017-10   2018-05     2019-02
2017-04     2017-11   2018-06     2019-03
2017-05     2017-12   2018-07     2019-04
2017-06     2018-01   2018-08   2019-05
2017-07     2018-02   2018-09   2019-06
2017-08     2018-03   2018-10
2017-09     2018-04   2018-11
```

Each partition on the disk contains the column data files of the corresponding
timestamp interval.

```
[quest-user 2019-06]$ dir
_archive    cab_type.v              dropoff_latitude.d     ehail_fee.d
cab_type.d  congestion_surcharge.d  dropoff_location_id.d  extra.d
cab_type.k  dropoff_datetime.d      dropoff_longitude.d    fare_amount.d
```
