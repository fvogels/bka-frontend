export type Success<T> = {
    success: true;
    value: T;
};

export type Failure<E> = {
    success: false;
    error: E;
};

export type Result<T, E> = Success<T> | Failure<E>;

export function success<T>(value: T): Success<T> {
    return { success: true, value };
}

export function failure<T>(error: T): Failure<T> {
    return { success: false, error };
}
