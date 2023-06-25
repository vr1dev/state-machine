import { ICascadeStore } from "./ICascadeStore";
import { MainStore } from "./MainStore";

export interface HistoryItem<TState> {
    state: TState;
    reduction: string;
    parameters: string;
}

export class StateHistory<TState> implements ICascadeStore<TState> {
    public history: HistoryItem<TState>[] = [];
    constructor(private store: MainStore<TState>, initial?: TState) {
        if (initial != null) {
            const init = () => initial;
            this.cascade(init, init, []);
        }
    }


    public get state(): TState { return this.store.state; }
    public set state(state: TState) {
        function manualTransit(): TState { return state; }
        this.cascade(manualTransit, manualTransit, []);
    }

    public cascade(transit: (p: TState) => TState, reduction: Function, parameters: any[]): void {
        this.store.cascade(transit);
        this.history.push({
            state: this.state,
            reduction: reduction?.toString(),
            parameters: JSON.stringify(parameters)
        });
    }

    public back(): void {
        const index = this.getCurrentIndex();
        if (index < 1) { return; }
        this.store.state = this.history[index - 1].state;
    }

    public forward(): void {
        const index = this.getCurrentIndex();
        if (index === this.history.length - 1 || index === -1) { return; }
        this.store.state = this.history[index + 1].state;
    }

    private getCurrentIndex(): number {
        let index = -1;
        this.history.forEach((item, i) => { if (item.state === this.state) { index = i; } });
        return index;
    }
}
