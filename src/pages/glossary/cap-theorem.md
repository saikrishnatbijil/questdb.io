---
index_title: CAP Theorem
title: What Is the CAP Theorem?
wrapperClassName: career
---

import Screenshot from "@theme/Screenshot"

# What Is the CAP Theorem?

The CAP theorem, also known as Brewer’s theorem, is a principle in computer science that a distributed data store can provide a maximum of two of the following three properties: 

- Consistency (C)
- Availability (A)
- Partition tolerance (P) 

<Screenshot
  alt="Image showing how consistency, availability, and partition tolerance are overlapped"
  height={342}
  src="/img/glossary/cap-theorem/visualization.webp"
  width={770}
  title="Visualization of the CAP theorem "
/>

## Consistency

Consistency guarantees that every node in a distributed system will return the same (i.e., consistent) data. This means that every read request will return the latest state of the system from the most recent write or an error in the event of a timeout due to failure. 

## Availability

Availability, on the other hand, guarantees that every request will return a non-error response. However, the response may not reflect the state from the most recent write. 

## Partition tolerance

Partition tolerance means that the system as a whole will continue to operate despite network failures. 

## Implications of the CAP theorem

The limitations imposed by the CAP theorem drive the fundamental behaviors of distributed systems in the event of a network partition failure. In a failure scenario, distributed systems can choose either of the following:


- Be consistent and partition tolerant (CP) to return a consistent response, sacrificing temporary outages.
- Prioritize availability and partition tolerance (AP) to always respond to requests even if it means returning stale or conflicting responses. 

It is important to note that the CAP theorem does not dictate that a distributed system must always choose CP or AP at all times. The tradeoff only comes into play during a network partition where consistency or availability is favored. 

The [PACELC theorem](https://en.wikipedia.org/wiki/PACELC_theorem) is an extension of the CAP theorem which describes trade-offs when the system is running normally in the absence of partitions.

## Database designs

Due to the CAP theorem, most databases are designed to prioritize either consistency or availability depending on the use case. 

Relational databases such as MySQL, PostgreSQL, and MariaDB choose consistency over availability to provide ACID guarantees. On the other hand, NoSQL databases like MongoDB or Apache Cassandra favor availability to handle high write throughputs and rely on eventual consistency for reads. 

## Additional resources

- [The Inner Workings of Distributed Databases](https://questdb.io/blog/inner-workings-distributed-databases/)
- [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web](https://users.ece.cmu.edu/~adrian/731-sp04/readings/GL-cap.pdf)
- [A Critique of the CAP Theorem](https://www.cl.cam.ac.uk/research/dtg/www/files/publications/public/mk428/cap-critique.pdf)
- [The CAP FAQ](https://www.the-paper-trail.org/page/cap-faq/)