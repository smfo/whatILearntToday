
// Ngxs is a state management pattern and library for Angular. it is the single source of truth for
// the application's state and provides simple rules for predictable state mutations
// Ngxs lets the user take advantage of the benefits of Observables, bur in many cases treat them
// as an implementation detail of the library rather than a prerequsite
// Ngxs also gets ride of switch statements

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
// to and provides a way to selece data slices out from the global state

// selects the data that are not to be changed (data slices)


// action example, AddAnimal
export class AddAnimal {
    static readonly type = '[Zoo] Add Animal';
    constructor(public name: string) {}
  }

//   to dispatch actions we need to inject the "Store" service into the component/service
//   and use this to call the "dispatch" function with an action/array of actions to trigger

import { Store } from '@ngxs/store';
import { AddAnimal } from './animal.actions';

@Component({ ... })
export class ZooComponent {
  constructor(private store: Store) {} //the store service

  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name)); //triggering the AddAnimal action
  }
}

// an array of actions can be passed to dispatch multiple actions at the same time
this.store.dispatch([
    new AddAnimal('Panda'),
    new AddAnimal('Zebra')
  ]);

// the dispatch function returns an observable, therefore it is possible to subscribe to it
// to do something after the action is dispatched
addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name)).subscribe(() => this.form.reset());
  }

// the dispatch method returns an observable with a void type, because there can be multiple states
// that listens to the same "@Action". Because of this it is not possible to return the state from these
// actions as we don't know the form of them
// To get the state after using dispatch use a "@Select"

import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { AddAnimal } from './animal.actions';

@Component({ ... })
export class ZooComponent {

  @Select(state => state.animals) animals$: Observable<any>;
  //create a state animals$ stat slices the portion state.animals from the global state container
  // .animals is the name of the state slice as defined my the "@State", see state decorator

  constructor(private store: Store) {}

  addAnimal(name: string) {
    this.store
      .dispatch(new AddAnimal(name))
      .pipe(withLatestFrom(this.animals$)) // get the lates animals value from the global state
      .subscribe(([_, animals]) => {
        // do something with animals
        this.form.reset();
      });
  }

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
// read "Store" for how to dispatch actions

// commands are actions that tell the app to do something, usually triggered by events
// a command name contains 3 parts. for the example above
// - a context as to where the command came from [Zoo]
// - a verb decribing that the entity should do, Feed animals
// - the entity that will be acted upon, Animals

// Events are actions that have already happened that needs to be reacted to,
// the naming should be in past tense
// [Project API] ProjectUpdateFailed
// [User Details Page] PasswordChanged
// [Project Stars Component] StarsUpdated


// Export a namespace instead of suffixing all the seperat classes
export namespace Todo {

  export class Add { // Instead of AddTodo
    static readonly type = '[Todo] Add';
    constructor(public payload: any) { }
  }

  export class Edit { // Instead of EditTodo
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
// a state container holds all the state of the application. it is not possible to change the state directly,
// changes have to be described by plain objects, actions.
// with the same actions in the same OverconstrainedError, the same state will be achived

// they contain decorators to describe metadata and action mappings
// the state decorator defines metadata about the state and may include
// name of the state slice (required and uniquie), a default set of objects or array for the state slice,
// child sub state associations
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

// Action decorator
export class FeedAnimals {
  static readonly type = '[Zoo] FeedAnimals';
}

export interface ZooStateModel {
  feed: boolean;
}

// State decorator
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

// actions can also pass along metadata related to the action. here the amount of hay and carrots are passed

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
    zebraFood: [] // metadata default value
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
        // the metadata passed to the state
        action.zebraToFeed,
      ]
    });
  }
}


// it is also possible to use patchState to only pass to the wanted properties in the state
@Action(FeedZebra)
feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
  const state = ctx.getState();
  ctx.patchState({ //patchState only passes the peoperties to the wanted state
    zebraFood: [
      ...state.zebraFood,
      action.zebraToFeed,
    ]
  });
}


// setState can either be called using a new constructed state value
@Action(MyAction)
public addValue(ctx: StateContext, { payload }: MyAction) {
  ctx.setState({ ...ctx.getState(), value: payload  });
}

// or with a function that takes a state and returns the new state value
@Action(MyAction)
public addValue(ctx: StateContext, { payload }: MyAction) {
  ctx.setState((state) => ({ ...state, value: payload }));
}







// selects are functions that slice a specific portion of state from the global state container
// this can either be done by calling "select" on the "Store" service og use the "@Select" decorator

// using "@Select"
import { Select } from '@ngxs/store';
import { ZooState, ZooStateModel } from './zoo.state';

@Component({ ... })
export class ZooComponent {
  // Reads the name of the state from the state class
  @Select(ZooState) animals$: Observable<string[]>;

  // Uses the pandas memoized selector to only return pandas
  @Select(ZooState.pandas) pandas$: Observable<string[]>;

  // Also accepts a function like our select method
  @Select(state => state.zoo.animals) animals$: Observable<string[]>;

  // Reads the name of the state from the parameter
  @Select() zoo$: Observable<ZooStateModel>;
}

// with the Store class
import { Store } from '@ngxs/store';

@Component({ ... })
export class ZooComponent {
  animals$: Observable<string[]>;

  constructor(private store: Store) {
    this.animals$ = this.store.select(state => state.zoo.animals);
  }
}


// Memorized selectors
// we can use the "@Selector" to choose even more specific slices of the state container

import { State, Selector } from '@ngxs/store';

@State<string[]>({
  name: 'animals',
  defaults: []
})
export class ZooState {
  @Selector()
  static pandas(state: string[]) {
    return state.filter(s => s.indexOf('panda') > -1);
  }
}

// ZooState.pandas will now only return animals that has panda in their name
@Component({...})
export class AppComponent {
  @Select(ZooState.pandas) pandas$: Observable<string[]>;
}