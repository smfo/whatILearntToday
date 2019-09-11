https://medium.com/frontend-fun/angular-unit-testing-jasmine-karma-step-by-step-e3376d110ab4
Want to create a mocked version of the service for testing



let fakeUserService = {
    currentUser: new BehaviorSubject(null),     //mocked value
    setCurrentRole: (id: string) => {           //mocked method
        return of(null)
    }
}

beforeEach(async(() => {
    TestBed.conficureTestionModule({
        declarations: [ComponentClass],
            imports: [],
            providers:[
                {
                    provide: UserService,
                    useValue: fakeUserService   //use this whenever UserService is required
                }
            ]
        }).compileComponents();
}))