
# EF Core Power Tools

https://github.com/ErikEJ/EFCorePowerTools/wiki \
Extension: https://marketplace.visualstudio.com/items?itemName=ErikEJ.EFCorePowerTools

To display in VS: Extensions -> Manage extensions

## Database schema as graph
Require Visual studio DGML editor
Open Visual Studio Installer, find the installed version and choose Modify.\
Individual components -> DGML editor

To the project containing DbContext, add netcoreapp3.0 as a target framework and reference
the Microsoft.EntityFrameworkCore.Design package.
```C#
// The project .csproj file
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
  //Multi target project
    <TargetFrameworks>netcoreapp3.0;netstandard2.0</TargetFrameworks>
  </PropertyGroup>

  <ItemGroup>
  // Package reference
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="3.1.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="3.1.5" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\EF.Domain\EF.Domain.csproj" />
  </ItemGroup>

</Project>
```
Right click on the project -> EF Core Power Tools -> Add DbContext Model Diagram