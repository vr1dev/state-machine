export interface ICascadeStore<TState> {
    get state(): TState;
    cascade(transit: (p: TState) => TState, reduction: Function, parameters: any[]): void;
}
