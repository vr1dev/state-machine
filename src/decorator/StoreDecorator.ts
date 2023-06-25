export type StoreDecorator = (value: Function, context: {
  kind: "class"
  name: string | undefined
  addInitializer(initializer: () => void): void
}) => Function;

export const store: StoreDecorator = (value, context) => {
  return () => {
    return null;
  }
};