https://medium.com/@AikoPath/testing-angular-components-with-input-3bd6c07cfaf6

# Testing components with a @Input element

```js
@Component({
    selector: 'component-under-test',
    template: '<div>{{ input }}</div>'
  })
  export class ComponentUnderTestComponent{
  
    @Input() input;

    ngOnInit(){
        this.processInput();
    }
  
    processInput(): void {
      this.input = this.input.toUpperCase();
    }
  }

//test
  it('should show TEST INPUT', () => {
    component.input = 'test input';
    component.processInput();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').innerText).toEqual('TEST INPUT');
  });
```
  
  When calling this test on the `ComponentUnderTestComponent` it results in an error, "input is undefined". Because `ngOnInit` is called before we set the `component.input` value. In the actual program this is not a problem, as the input value is set from the parent component and is therefore defined when ngOnInit is called. 
  
  To test the component properly, we implement a parent component.


These tests check the content of the html tag component-under-test in the `TestHostComponent`. This equals checking the div tag in the childcomponent.\
To be able to check multiple @Input values, we have a setter in the TestHostComponent that changes the input value passed to the ComponentUnderTestComponent. This is alright for one @Input value, but quite cumbersome if we want to test multiple inputs.
```js
  describe('ComponentUnderTestComponent', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ComponentUnderTestComponent, TestHostComponent]
      })
        .compileComponents();
    }));
  
    beforeEach(() => {
      //notice that we create the TestBed and fixture
      testHostFixture = TestBed.createComponent(TestHostComponent);         
      //for the PARENT component!
      testHostComponent = testHostFixture.componentInstance;                
    });

    it('should show TEST INPUT', () => {
        testHostComponent.setInput('test input');
        testHostFixture.detectChanges();
        expect(testHostFixture.nativeElement.querySelector('div').innerText).toEqual('TEST INPUT');
      });
    
    it('should show DIFFERENT TEST INPUT', () => {
      testHostComponent.setInput('different test input');
      testHostFixture.detectChanges();
      expect(testHostFixture.nativeElement.querySelector('div').innerText).toEqual('DIFFERENT TEST INPUT');
    });
  
    @Component({
      selector: `host-component`,
      template: `<component-under-test input="test input"></component-under-test>`
    })
    class TestHostComponent {
        private input: string;

        setInput(newInput: string) {
          this.input = newInput;
        }
    }
  });
```

Instead of using a setter and an input in the html to reference the child component, we get the reference from the host component and pass it into the test. This allows for setting the value of any input in the child component by using the method in the test shown above.

```js
it('should show DIFFERENT TEST INPUT', () => {
    testHostComponent.componentUnderTestComponent.input = 'different test input';    //sets the value directly instead of calling a setter
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('div').innerText).toEqual('DIFFERENT TEST INPUT');
  });

  @Component({
    selector: `host-component`,
    template: `<component-under-test></component-under-test>`       //no input binding
  })
  class TestHostComponent {
    @ViewChild(ComponentUnderTestComponent)
    public componentUnderTestComponent: ComponentUnderTestComponent;
  }
```

## Testing component usinga child with @Input
When testing a component that has a child component that takes input values in the html, the child component will be a part of the component you are testing.

Therefore we also need to declare the child component in the testbed.

```js
beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataExplorerDateComponent, DatePickerComponent],
      providers: [{ provide: IDateIntervalDefinitionServiceToken, useValue: fakeDatePickerService }]
    })
      .compileComponents();
  }));
```

Where in the DataExplorerDateComponent html we have.
```html
<mir-date-picker [defaultFromDate]="defaultFromDate" [defaultToDate]="defaultToDate" (fromDate)="setFromDate($event)" (toDate)="setToDate($event)"></mir-date-picker>
```