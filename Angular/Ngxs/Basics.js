
// Ngxs is a state management pattern and library for Angular. it is the single source of truth for 
// the application's state and provides simple rules for predictable state mutations
// Ngxs lets the user take advantage of the benefits of Observables, bur in many cases treat them
// as an implementation detail of the library rather than a prerequsite
// Ngxs also gets rid of switch statements

// there are 4 majonr consepts:
// - Store: the global state CredentialsContainer, action dispatcher and selector
// - Actions: classes describing the action to take and its associated metadata 
// - State: Class definition of the state 
// - Selects: State slice selectors


// Component dispatching an action ->
// a store reacting to the action ->
// to component through a state select 

// component -> (dispatch) Action -> (mutate) Store -> (select) component
// backend and pluggins are commected to the action step


// store is the global state manager that dispatches actions the state containers listen 
// to and provides a way to selede data slices out from the global state


// action example, AddAnimal
export class AddAnimal {
    static readonly type = '[Zoo] Add Animal';
    constructor(public name: string) {}
  }

//   to dispatch actions we need to inject the store service into the component/service
//   and invoke the dispatch function with an action/array of actions to trigger

import { Store } from '@ngxs/store';
import { AddAnimal } from './animal.actions';

@Component({ ... })
export class ZooComponent {
  constructor(private store: Store) {} //the store service

  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name)); //triggering the AddAnimal action
  }
}

// array of actions triggered
this.store.dispatch([
    new AddAnimal('Panda'),
    new AddAnimal('Zebra')
  ]);

// the dispatch function returns an observable, therefore it is possible to subscribe to it
addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name)).subscribe(() => this.form.reset());
  }

// return the entire value of the store at that point in time
store.snapshot();
// reset the entire state without fiering any actions or life-cycle events
store.reset(myNewStateObject) // reset to the state of the passed argument



// actions can be thought of as commands which should trigger something to happen, or as 
// the resulting event of something that has already happened

// a simple action FeedAnimals
export class FeedAnimals {
    static readonly type = '[Zoo] Feed Animals'; //each action contains a type field
    constructor(public name: string, public hayAmount: number) {} //action metadata
}
// the type field is the actions unique identifier

// commands are actions that tell the app to do something, usually triggered by events 
// a command name contains 3 parts. for the example above
// - a context as to where the command came from [Zoo]
// - a verb decribing that the entity should do, Feed animals 
// - the entity that will be acted upon, FeedAnimals

// Events are actions that have already happened that needs to be reacted to,
// the naming should be in past tense
// [Project API] ProjectUpdateFailed
// [User Details Page] PasswordChanged
// [Project Stars Component] StarsUpdated

// Export a namespace instead of suffixing all the seperat classes
export namespace Todo {

  export class Add {
    static readonly type = '[Todo] Add';
    constructor(public payload: any) { }
  }

  export class Edit {
    static readonly type = '[Todo] Edit';
    constructor(public payload: any) { }
  }

  export class FetchAll {
    static readonly type = '[Todo] Fetch All'
  }

  export class Delete {
    static readonly type = '[Todo] Delete';
    constructor(public id: number) { }
  }
}



// states are classes that define a state container
// they contain decoretors to describe metadata and action mappings
import { State } from '@ngxs/store';

@State<string[]>({
  name: 'animals',  //name is a required, unique, parameter
  defaults: []
})
export class AnimalsState {}

// the state listens to actions with the @Action decorator, this accepts an action 
// class or an array of actions

//this example has a state that listenes to the FeedAnimals action
import { State, Action, StateContext } from '@ngxs/store';

export class FeedAnimals {
  static readonly type = '[Zoo] FeedAnimals';
}

export interface ZooStateModel {
  feed: boolean;
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    feed: false
  }
})
export class ZooState {
  @Action(FeedAnimals)
  feedAnimals(ctx: StateContext<ZooStateModel>) {
    const state = ctx.getState();  
    //getState will always return the freshest state slice from the global store each time it is accessed
    ctx.setState({
      ...state,
      feed: !state.feed
    });
  }
}



import { State, Action, StateContext } from '@ngxs/store';

// This is an interface that is part of your domain model
export interface ZebraFood {
  name: string;
  hay: number;
  carrots: number;
}

// naming your action metadata explicitly makes it easier to understand what the action
// is for and makes debugging easier.
export class FeedZebra {
  static readonly type = '[Zoo] FeedZebra';
  constructor(public zebraToFeed: ZebraFood) {}
}

export interface ZooStateModel {
  zebraFood: ZebraFood[];
}

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    zebraFood: []
  }
})
export class ZooState {
  @Action(FeedZebra)
  feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      zebraFood: [
        ...state.zebraFood,
        // this is the new ZebraFood instance that we add to the state
        action.zebraToFeed,
      ]
    });
  }
}






// selects are functions that slice a specific portion of state from the global state container