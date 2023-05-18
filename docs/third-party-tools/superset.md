---
title: Superset
description: Guide for using Superset with QuestDB
---

[Apache Superset](https://superset.apache.org/) is a popular open-source
business intelligence web application that enables users to visualize and
explore data through customizable dashboards and reports.

QuestDB provides the [QuestDB
Connect](https://pypi.org/project/questdb-connect/) python module that
implements the SQLAlchemy and Superset engine, to integrate
Superset with QuestDB.

## Requirements

- Python from 3.8.x to 3.10.x
- Psycopg2 for connectivity
- SQLAlchemy for ORM and easy interaction
- [Superset](https://superset.apache.org/docs/installation/installing-superset-from-scratch/)
  installation and initialization
- QuestDB 7.1.2 or later

## Installing QuestDB Connect

Installing QuestDB Connect using pip:

```bash
pip install questdb-connect
```

## Connecting QuestDB

Once installed and initialized, Superset is accessible via `localhost:8088`.

From Superset UI, select Setting > Database Connections

Select `+Database` to add the following parameters:

- SUPPORTED DATABASES: Other
- DISPLAY NAME: QuestDB
- SQLALCHEMY URI: `questdb://admin:quest@host.docker.internal:8812/main`

Once connected, tables in QuestDB will be visible for creating Datasets in
Superset.

## Additional steps for Mac M1 users

Superset is not optimized for Apple M1 chip. As a result, the following steps
are required for Mac M1 users:

1. Clone the [Superset repo](https://github.com/apache/superset)
2. Amend the following files
   - Replace the `Dockerfile` with the
     [Dockerfile](https://github.com/questdb/questdb-connect/blob/main/superset_toolkit/Dockerfile)
     provided by the QuestDB Connect. This specifies the `arm64` option and uses `16.20-bullseye`.
   - Replace the `docker-compose.yaml` with the
     [docker-compose.yml](https://github.com/questdb/questdb-connect/blob/main/superset_toolkit/docker-compose.yml)
     provided by the QuestDB Connect. This uses the `16.20-bullseye`.
3. Create a file `docker/requirements-local.txt` with the content:

   ```txt
   questdb-connect==0.0.42
   ```

   The is the QuestDB Connect version. Check `pypi` for the latest release
   version number.

4. Build the image:

   ```bash
   docker build -t apache/superset:latest-dev .
   ```

5. Run Apache Superset:

   ```bash
   docker-compose up
   ```

   For more information, see
   [DEVELOPERS](https://github.com/questdb/questdb-connect/blob/main/DEVELOPERS.md)
   in the QuestDB Connect GitHub repo.

## See also

- The [QuestDB Connect](https://github.com/questdb/questdb-connect) GitHub repo
- The
  [superset_toolkit](https://github.com/questdb/questdb-connect/tree/main/superset_toolkit)
  directory with replacement M1 files for the Superset repository
- [QuestDB Connect Python module](https://pypi.org/project/questdb-connect/)
