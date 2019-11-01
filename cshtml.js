
// cshtml is html that also contains server code 
// instead of being completly processed my the client, the cshtml contain C# code that 
// is compiled on the server prior to the page being rendered to the browser
// the server rund the server code first. By running on the server, the code can performe 
// more complex tasks and the server code can dynamically create client content

// Razor syntax is based on ASP.NET, which is based on the microsoft .NET framework

// Razor syntax 
// 1) code is added to the page by using @ 
// @ starts inline expressions, single statement blocks and multi-statement blocks

// <!-- Single statement blocks  -->
@{ var total = 7; }
@{ var myMessage = "Hello World"; }

// <!-- Inline expressions -->
<p>The value of your account is: @total </p>
<p>The value of myMessage is: @myMessage</p>

// <!-- Multi-statement block -->
@{
    var greeting = "Welcome to our site!";
    var weekDay = DateTime.Now.DayOfWeek;
    var greetingMessage = greeting + " Today is: " + weekDay;
}
<p>The greeting is: @greetingMessage</p>        //inline expression, so no semicolon

// 2) code blocks are enclosed in braces 
// a code block includes one or more code statements, see ablove for examples

// 3) inside a block, each statement is ended with a semicolon
// inline expressions (html) doesnt end with semocolon, examples above

// 4) variables are used to store values
// variables are created using the var keyword. variables can be inserted directly in a page 
// by using @ (similary to angulars {{ variable }})

// 5) Enclose literal string values in double quotation marks
@{ var myString = "This is a string literal"; }

// to use special characters in the string, create a verbatim string literal.
// these are prefixed with the @ operator

// <!-- Embedding a backslash in a string -->
@{ var myFilePath = @"C:\MyFolder\"; }
<p>The path is: @myFilePath</p>

// Embed double quotation marks in a string by using a verbatim string literal and 2 quotation marks
@{ var myQuote = @"The person said: ""Hello, today is Monday."""; }
<p>@myQuote</p>

// 6) the code is case sensitive
// 7) much of the coding involves objects

// 8) the code can make decisions

@{
    var result = "";
    if(IsPost)
    {
       result = "This page was posted using the Submit button.";
    }
    else
    {
       result = "This was the first request for this page.";
    }
 }
 
 <!DOCTYPE html>
 <html>
     <head>
         <title></title>
     </head>
 <body>
 <form method="POST" action="" >            //this is the value evaluated in the if(IsPost) condition
   <input type="Submit" name="Submit" value="Submit"/>
   <p>@result</p>
 </form>
 </body>
 </html>



// Examples
// combine text, markup and code in code blocks
@if(IsPost) {
    <text>
    The time is: <br /> @DateTime.Now
    <br/>
    @DateTime.Now is the <em>current</em> time.
    </text>
}

@{
    var minTemp = 75;
    <text>It is the month of @DateTime.Now.ToString("MMMM"), and
    it's a <em>great</em> day! <br /><p>You can go swimming if it's at
    least @minTemp degrees. </p></text>
}

// comments start with @* and ends with *@
@{
    @* This is a comment. *@
    var theVar = 17;
}
// regular C# syntax can also be used
@{
    // This is a comment.
    var myVar = 17;
    /* This is a multi-line comment
    that uses C# commenting syntax. */
}