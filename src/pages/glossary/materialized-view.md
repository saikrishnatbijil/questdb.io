---
index_title: Materialized View
title: What Is a Materialized View?
wrapperClassName: career
---

import Screenshot from "@theme/Screenshot"

# What Is a Materialized View?

A materialized view is a database object that stores results from a pre-computed
query. It is often used when the results of complex queries are accessed
frequently. By pre-computing and storing this data, users can more quickly
access this data rather than re-computing potentially expensive queries on the
fly. Materialized views are refreshed periodically or triggered by updates to
the underlying data to keep the resulting view up to date.

<Screenshot
  alt="Diagram representing how a materialized view is created"
  height={342}
  src="/img/glossary/materialized-view/materialized-view.webp"
  width={770}
  title="A materialized view is a database object that stores results from a pre-computed
query."
/>

## Materialized views vs. traditional views

Materialized views differ from traditional views in that they are physically
stored in the database. Traditional views are virtual in nature and executed on
the fly when they are accessed. Materialized views are pre-computed and
physically stored. Therefore, when querying against the materialized view, the
database does not need to re-run the associated query every time. Essentially,
materialized view trades storage for query performance.

## Refresh strategies

There are several strategies for refreshing materialized views depending on the
database implementation:

- **Incremental/delta refresh**: Incremental (or delta) refresh updates the
  materialized view with only the changes made to the underlying data since the
  last query. The system must keep track of some metadata (e.g., timestamp,
  transaction log) to determine the delta and only update the changes.
- **Complete refresh**: Materialized views are completely recalculated by
  re-issuing the underlying query. Complete refresh ensures that the view is
  always up to date, but is slower and more resource intensive compared to
  incremental refresh.
- **Manual/on-demand refresh**: Manual or on-demand refresh only triggers
  updates to the materialized view when a user or a system explicitly invokes
  the refresh command. This is useful when the view does not need to update
  frequently.
- **Automatic refresh**: Materialized views can also be refreshed automatically
  based on some triggers or a predefined schedule via some trigger or predefined
  schedule.

## Benefits and limitations

Materialized views provide a cost-efficient way to pre-compute and store
resource-intensive operations that are frequently accessed. For example, you may
be collecting sensor data from your IoT system. If you need to calculate the
average data point (e.g., average temperature, cost) over a time period,
creating a materialized view will return the results much faster than computing
them on demand. Also, since materialized views update periodically or on some
triggers, it can be more resource efficient than computing these every time.

On the other hand, since material views are physically stored, it will incur a
bit more storage than simply utilizing views or running queries on demand. If
the query is not accessed frequently, the storage-to-performance tradeoff may
not be favorable. Lastly, materialized views are read-only, so it is not
recommended when the results may need some modifications.

## Database that supports materialized views

- [Oracle](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/CREATE-MATERIALIZED-VIEW.html)
- [PostgreSQL](https://www.postgresql.org/docs/current/rules-materializedviews.html)
- [Microsoft SQL Server](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-materialized-view-as-select-transact-sql?view=azure-sqldw-latest)
- [Apache Hive](https://cwiki.apache.org/confluence/display/Hive/Materialized+views)
- [Google BigQuery](https://cloud.google.com/bigquery/docs/materialized-views-intro)
