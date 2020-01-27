
// The table connections are declared in the entity classes (the classes used to define the table
// structure in the dbContext file, see connectToDb)

// Entity class
public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
}

// Declaring the standars table to contain Student objects (from dbContext)
public DbSet<Standard> Standards { get; set; }

public class Course
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
}

public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    // List that asks for a set of Course objects from the Course table
    public List<Course> Courses {get; set;}
}

// The name of the variable, here Courses, is not important. The thing that connects the two tables are
// that the course entity class is being used
// The program will then automatically look for a foreign key in the Course object that decides which student it belongs to
// The default is to look for a field what starts with the name of the entity class + id, so StudentId
// Here, there is no "StudentId" in Course so there will be an error "No StudentId found"

// "Ef makes a property the foreign key property when its name matches wit the primary key property of a related entity"
public class Student
{
    public int StudentID { get; set; }
    public string StudentName { get; set; }
        
    //Foreign key for Standard
    public int StandardId { get; set; }
    public Standard Standard { get; set; }
}

public class Standard
{
    public int StandardId { get; set; }
    public string StandardName { get; set; }
    
    public ICollection<Student> Students { get; set; }
}

// To override this behavior use the [ForeignKey(attributeName)] attribute to specify a
// foreign key that has a name that does not match the primaryKey+Id



// On the foreign key scalar property in the dependent entity
// use the attribute in the the target table to speficy the FK towards other tables
public class Student
{
    public int StudentID { get; set; }
    public string StudentName { get; set; }
        
    [ForeignKey("Standard")]
    public int StandardRefId { get; set; } // FK of Student towards "Standard"
    public Standard Standard { get; set; }
}

public class Standard
{
    public int StandardId { get; set; }
    public string StandardName { get; set; }
    
    public ICollection<Student> Students { get; set; }
}

// this will create the FK column "StandardRefId" in the Students table, preventing the generation
// of a StandardId column



// On the navigation property in the dependent entity
// The FK can be applied directly to the dependent entitys navigation property, skipping the FK scalar all together
public class Student
{
    public int StudentID { get; set; }
    public string StudentName { get; set; }
        
    public int StandardRefId { get; set; }
    
    [ForeignKey("StandardRefId")]
    public Standard Standard { get; set; }
}

public class Standard
{
    public int StandardId { get; set; }
    public string StandardName { get; set; }
    
    public ICollection<Student> Students { get; set; }
}

// The attribute is applied on the Standard navigation property and the name of the FK is specified
// to StandardRedIf
// this will create the FK column "StandardRefId" in the Students table, preventing the generation
// of a StandardId column



// On the navigation property in the principal entity
// The FK attribute can also be applied to the navigation property of the principal entity (main "table")
public class Student
{
    public int StudentID { get; set; }
    public string StudentName { get; set; }
        
    public int StandardRefId { get; set; }
    public Standard Standard { get; set; }
}

public class Standard
{
    public int StandardId { get; set; }
    public string StandardName { get; set; }
    
    [ForeignKey("StandardRefId")]
    public ICollection<Student> Students { get; set; }
}
// Usefull if multiple tables are to specify a FK agains the same target table using the same field
// this will create the FK column "StandardRefId" in the Students table, preventing the generation
// of a StandardId column