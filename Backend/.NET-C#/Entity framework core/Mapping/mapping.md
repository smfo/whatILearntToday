
# Mapping to db

EF builds a model based on the shape of the domain classes.

Code-first allows for the domain to create classes rather than designing the db first and then create classes
that match the db design.\
The development workflow in the code-first approach would be: Create or modify domain classes -> configure these domain 
classes using Fluent-API or data annotation attributes -> Create or update the database schema using automated migration or code-based migration

There are three parts: conceptual model, storage model and the mapping between these (context class).

Entity classes
```C#
public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
}

public class Course
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
}
```

The DbContext file represents a session with the database which can be used to query and save instances of entities to db.
```C#
public class SchoolContext: DbContext 
{
    public SchoolDBContext(): base() 
    {
    }

    // default schema for the tables in the db
    public DbSet<Student> Students { get; set; }
    public DbSet<Standard> Standards { get; set; }
        
    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        //Configure default schema
        // Default schema: all the db objects will be created under this unless otherwise is specified
        // if undefined all schemas will be defined in the dbo schema by default
        modelBuilder.HasDefaultSchema("Admin");

        // Map entity to table
        // The student entity is mapped to the studentinfo table
        // ToTable(tableName, schema) no specify schema will default to admin
        modelBuilder.Entity<Student>().ToTable("StudentInfo");
        modelBuilder.Entity<Standard>().ToTable("StandardInfo","dbo");
    }
}
```