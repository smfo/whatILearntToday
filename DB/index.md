# Indexes

The purpose of indexes is to optimize performance by minimizing the number of disk accesses required when a query is processed.

An index contains of a search key (a copy of the primary key or the chosen index value for the table. These are stored in sorted order) and a data reference/pointer to the disk block of the key value.

![DB index](./img/dbIndex.png "Index")

Index attributes:
- Access types: type of access (search, range etc.)
- Assess time: time needed to find data element
- Insertion time: time taken to find appropriate space and insert new data
- Deletion time: Time to find item and delete/update index structure
- Spave overhead: Additional space required by the index

## Ordered index files

Based on a sorted ordering of values. Fast and more traditional storing mechanism

### Dense index

There is an index record for every search key value in the data file. The record contains the search key and a reference to the first data record with that search key value.

![dense](./img/dense.png "Dense")

### Sparce index

The index only hold records for a few items in the data file, each pointing to a block. To locate a record we find the index record with the largest value, closest to our desired result (larg but smaller than the record or equal to the record). We start at the indexed record and process until we find the desired record.

![sparse](./img/sparse.png "Sparse")

## Hash file organization

Values are distributed in buckets according to a hash function.

### Clustered indexing

Records with similar characteristics are grouped together on disks and indexes are created for these groups.

Multiple records related to the same thing are stored in the same file. These files are ordered on non-key fields. Clusters may be created non-primary keys columns that do not have to be unique for each record. These will be grouped together and we will create an index on them.

![Cluster](./img/cluster.png "Cluster")

This is a way to store tha actual data in the table. Because of this you can only have one clustered index per table.

### Non-clustered/secondary indexing

This index tells you where the data lies using pointers/references to where the data is actually stored.

Unlike with a clustered index, the data is not physically stored in order of the index, this means we have to have dense ordering. As all records have to be represented.

![Secondary](./img/secondary.png "Secondary")

This index only contains the columns defined in the index, as well as a pointer to the actual data. For example the primary key to the clustered index.

Columns specified as `include` are stored in the leaf node of the nonclustered index.

If an index contains all columns necessary for the query, it is said to be `covering for a specific query`. In this case there is no need to look up the rows in the cluster as well, this can make the query significantly quicker. (This means everything in your `select` and have to be present. Columns in `where` can also be included as a part of the actual index).

```sql
CREATE NONCLUSTERED INDEX [ IX_ItemResult_EpsDeliveryId ] on [dbo].[ItemResult]
(
    [EpsDelivery] ASC
)
INCLUDE([ItemId], [Score], [MaxScore]) WITH (STATISTICS_NORECOMPUTS = OFF, DROP_EXISTING = FF, ONLINE)
GO
```

The index above is over the column EpsDelivery, and includes ItemId, Score and MaxScore.

### Multilevel indexing

With a lot of data, the index size also grows and might become to large to store in a single level. This index separates the index into smaller blocks which in turn point to the data blocks where the data is available.

![Multilevel](./img/multilevel.png "Multilevel")

## Traversing

There are multiple ways the db can look for data in the tables.

**Index seek**: using the index key to look up the specific rows in tha bale.

**Index scan**: scan the whole table, or cluster, to look for the desiered tables. With enough rows this will turn very expensive. With smaller tables a scan can be more beneficial than seek.