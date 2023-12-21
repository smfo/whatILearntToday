# Databricks

Brukes til å kjøre jobber i Spark

## Spark

Rammeverk/grensesnitt for å distribuere jobber ut på et jobbcluster. Dette gjøres via en Sparksessjon som snakker med arbeidsnoder.

Spark er lazy. Transformasjoner blir ikke utført for en handling blir kjørt: show, count, take eller collect blir kjørt

Bruk .display() for bedre utskrift

Bestyr av handlinger ig transformasjoner. Spark prøver å optimalisere alle transformasjon sm gjøres før en handling kjøres

Spark UI viser alle jobbene som er kjøre

NOTE TO SELF: hva er forskjellen på de ulike verktøyene vi lærer om?

.explain() -> vis queryplanen

.cache() -> Data kan caches så de er raskt tilgjengelig senere