# State machine

Used to model code that follows a clearly structured lifecycle.\
You have an initial state and x number of states that are possible to reach. Only the machine is able to set new states. It contains the rules set for how states can change based on events the user wants to execute.

An object cannot have multiple states at the same time. You can however have multiple statemachines.

History of events can be saved.