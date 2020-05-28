
// The store is a file (component/service) that sets the actions into motion, here the actions are 
// dispatched. There can be multiple stores, an action can be dispatched from multiple files, and state 
// files can also dispatch actions belonging to other states.

// Actions can be looked at as commenads that trigger something to HTMLAppletElement, or resulting events of
// something that has happened
export class CurrentRoleChanged {
	static readonly type = '[CurrentUser] CurrentRoleChanged';
	constructor(public readonly roleId: string) {}
}
// [CurrentUser] shows where the comand came from, which state the action belongs to
// The rest of the name should contain the entity we are acting upon and a verb that describes what is being
// done to that entity 


// The states can listen to actions using @Action. After an action is carried through, thatever is in the 
// state method listening to the action will be executed. It is typically here the store is updated, or
// the data is modified before it is passed to the application using setState or patchState. 

@State<User>({
	name: 'currentuser',
})

export class CurrentUserState {
	@Action(CurrentUserChanged)
	public currentUserChanged(ctx: StateContext<User>, action: CurrentUserChanged) {
		ctx.patchState(action.user);
	}

	@Action(CurrentRoleChanged)
	public currentRoleChanged(ctx: StateContext<User>, action: CurrentRoleChanged) {
		let user = ctx.getState();
		for (let item of user.roles) {
			if (item.id === action.roleId) {
				item.selected = true;
			} else {
				item.selected = false;
			}
		}
		ctx.patchState(user);
	}
}

// Select, hmm 
// Select smaller portions of information from the store


// Child states
// It is possible for one state to be a parent to other states, this is done like so

@State<IpCaseSearchStateModel>({
	name: 'ipcasesearch',
	children: [IpCaseQueryState, IpCaseFilterState, IpCasePaginatorState, CurrentUserState]
})
export class IpCaseSearchState {}

// An action can belong to a parent state instead of its imidiate state, this way state files belonging to other child states can 
// listen to common actions. This is done by naming the parent state as the origin of the action
export class PageChanged {
	static readonly type = '[IpCaseSearch] PageChanged'; //IpCaseSearch is the name of the parent state in this example
	constructor(public event: PageEvent) {}
}
// IpCaseQueryState, IpFilterState, IpCasePaginatorState and CurrentUserState can listen to this action using @Action(PageChanged)


// State with default values assigned
const defaultModel = {
	activeAggregations: {
		domainCode: false,
		opi: false,
		domain: true,
		natureMark: false,
		applicationType: true,
		highLevelStatus: false,
		highLevelStatusCode: true
	},
	filters: []
};
@State<IpCaseSearchFilterStateModel>({
	name: 'ipcasefilter',
	defaults: defaultModel
})



ctx.patchState
ctx.getState
ctx.setState
this.store/ctx.dispatch()