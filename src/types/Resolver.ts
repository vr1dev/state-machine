import { IStore } from "./Store";

export interface Resolver {
    getStore<TState>(stateName?: string, stateId?: number): IStore<TState>;
}
