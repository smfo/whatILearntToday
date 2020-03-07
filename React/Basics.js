

// React consists of reusable components and elements 
// Components are used to tell React what we want to see on the screen, when data 
// changes React will update the components to keep the view up to date

// example
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
  
  // Example usage: <ShoppingList name="Mark" />

//   React component: ShoppingList
//   a components takes in properties and returns a hierarchy of views
//   The views are displayed via the render method
// This returns a description of what to view on the screen
// Render returns a React Element, a lightweight description of what to render 



// Start a new project:
npx create-react-app my-app