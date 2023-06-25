import { ICascadeStore } from "./ICascadeStore";
import { State } from "./State";

type KeysOfType<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T];
type PickByType<T, U> = Pick<T, KeysOfType<T, U>>;

export type IStore<TState> = {
    byStateId(stateId: number): IStore<TState>;
    get state(): TState;
    transit<T extends any[]>(reduction: (s: TState, ...t: T) => TState, ...args: T): TState;
} & {
        [P in keyof PickByType<TState, State>]: IStore<TState[P]>;
    };

@store
export class Store<TState> {
    constructor(protected cascadeStore: ICascadeStore<TState>) { }

    public byStateId(stateId: number): IStore<TState> {
        return <any>this;
    }

    public get state(): TState { return this.cascadeStore.state; }

    public transit<T extends any[]>(reduce: (p: TState, ...a: T) => TState, ...args: T): TState {
        this.cascadeStore.cascade(state => reduce(state, ...args), reduce, args);
        return this.state;
    }
}
