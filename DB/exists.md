# Exists

Selects a row in the table to be included in the future query, if it satisfies the conditions in the `exists` statement.

Include row from p, if that row has an eid equal to a advisor row in s.

```sql
select eid, name
from professor as p
where exist(
	select *
	from student as s
	where s.advisor = p.eid and..)
```

## Vs. window functions

How does this differ from window functions?\
A lot, when I remembered how window functions work.

Exists is used to filter the rows used in the query, while not adding any new information from the table used to filter. It just happens to contain some relevant data the tables you actually want information from don't have.\
Window functions are used to create new columns using data from the included tables, but that work on different conditions and subsets than the rest of the columns in the resulting table.

About window functions
```
Used when you do not want all the rows to use the same information to calculate information, but you also want to keep the original row values available (therefore you cannot use group by).
```

## Another example

```sql
SELECT prove.FagFerdighet_Id, prove.TrinnFra as 'Trinn', count(*) as 'Elever levert'
FROM Pamelding.Elevpamelding as pamelding
left join [prover-prod].Pamelding.Provegruppe as gruppe on pamelding.Provegruppe_Id = gruppe.Id
left join [prover-prod].Prove.Prove as prove on gruppe.Prove_Id = prove.Id
WHERE EXISTS(
    SELECT * 
    FROM Elevgjennomforing.Gjennomforingsstatus s 
    WHERE s.Elevpamelding_Id = pamelding.Id AND s.Endret > @date AND s.Status = 'Levert')
group by prove.FagFerdighet_Id, prove.TrinnFra
order by TrinnFra
```