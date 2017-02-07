/**
 * This is abstract class only because in current TS version generics don't support implementation of interfaces:
 * Valid: class Example<T extends Formula<N>>
 * Invalid: class Example<T implements Formula<N>>
 */
abstract class Formula<I, R> {
    public abstract calculateResults(input : Dictionary<I>) : Dictionary<R>;
}