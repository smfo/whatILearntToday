
# React basics

React consists of reusable components and elements\
Components are used to tell React what we want to see on the screen, when data
changes React will update the components to keep the view up to date

```javascript
class ShoppingList extends React.Component {
    render() {
      return (
        <div className="shopping-list">
          <h1>Shopping List for {this.props.name}</h1>
          <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Oculus</li>
          </ul>
        </div>
      );
    }
  }
```
  
Example usage: `<ShoppingList name="Mark" />`

React component: ShoppingList\
A components takes in properties and returns a hierarchy of views. 
The views are displayed via the render method, this returns a description of what to view on the screen. 
Render returns a React Element, a lightweight description of what to render.

### Start a new project
There are multiple ways to start new projects with React

#### Create-react-app
`npx create-react-app my-app`
Run the command with the desired project name.

Creates a ready project with all the files needed to run an application. The downside is that 
create-react-app does not support server-side rendering.

#### Next.js
Next creates server-rendered websites with Node.js, and require a installed version of node.

In the desired folder for the project, type:
```
npm init-y
npm install --save react react-dom next
mkdir pages
```

The input these commands in pacages.json:
```javascript
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1", //this will already be in the project
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

Next does not come with any of the basic setup create-react-app does. 
The files created in the packages folder will be assigned their own url in the application.
Equivalent to their name. Files in other folders will not be a root for a url.

# Strengths and weaknesses
JS library for building user interfaces, small and not a complete solution, unlike Angular\
Respresent dynamic data\
Conceptual simplicity\
Simple model for server-side rendering

As a library it has a limited scope\
Complex tooling