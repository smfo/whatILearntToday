
# Testing

As a frontend library React components should generally not contain logic, and are therefore not that relevant to test.

Create react app uses Jest for testing.

```javascript
describe("When setting up testing", () => {
    it("should fail", () => {
        expect(1 + 1).toBe(3);
    })
})
```

Run with `npm test`;


#### Component test

```javascript
import React from "react";

function Hello(props){
    return <h1>Hello at {props.now}<h1/>;
}

const moment = new Date(1588946400000000);

describe("When testing directly", () => {

    let results

    // setup function
    beforeAll(() => {
        result = Hello({now: moment.toISOString()});
    });

    it("return a value", () => {
        expect(result).not.toBeNull();
    });

    it("is a h1", () => {
        expect(result.type).toBe("h1");    
    });

    it("has children", () => {
        expect(result.props.children).toBeTruthy();
    });
});

import ReactDOM from "react-dom";

describe("When testing with ReactDom", () => {
    it("render without creaching", () => {
        const div = document.creteElement("div");
        ReactDom.render(<Hello now={moment.toISOString()} />, div);
    })
})

```

#### Enzyme

Library created by AirBnb.\
`npm i --save-dev enzyme enzyme-adapter-react-16`

```javascript
import Enzyme, { shallow } from "enzyme";
import Adapter from "enxyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("When testing with Enzyme", () =>{
    it("renders a h1", () =>{
        const wrapper = shallow(<Hello now={moment.toISOString()} />);
        expect(wrapper.find("h1").length).toBe(2);
    });

    it("contains Hello at 2020-05-08T14:00:00.00Z", () => {
        const wrapper = shallow(<Hello now={moment.toISOString()} />);
        expect(wrapper.contains(<h1>Hello at 2020-05-08T14:00:00.00Z</h1>)).toBe(true);
    });
})

```