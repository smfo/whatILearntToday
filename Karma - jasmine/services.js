
// Want to create a mocked version of the service for testing, instead of using the real thing
// the mocked service can be created in the test file or be imported as a seperate file


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
