import { ICascadeStore } from "./ICascadeStore";
import { Resolver } from "./Resolver";
import { IStore } from "./Store";

export class MainStore<TState> implements ICascadeStore<TState> {
    private _state: TState;
    constructor(public onStateChange?: (state: TState) => void, private resolver?: Resolver) { }

    public get state(): TState { return this._state; }
    public set state(state: TState) {
        this._state = state;
        this.onStateChange?.(this.state);
    }

    public cascade(transit: (p: TState) => TState): void {
        this.state = transit(this._state);
    }

    public resolve<TState1>(stateName?: string, stateId?: number): IStore<TState1> {
        return this.resolver?.getStore<TState1>(stateName, stateId);
    }

    public get rootStore(): IStore<TState> { return this.resolver?.getStore<TState>(); }
}
