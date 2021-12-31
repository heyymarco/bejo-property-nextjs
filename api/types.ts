export type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T
    ;

export type Function = (...args: any) => any
export type ReturnPromiseType<T extends Function> = Unpacked<ReturnType<T>>

export type PropsType<T> = T extends { props: infer U } ? U : T

export type ReturnPromisePropsType<T extends Function> = PropsType<ReturnPromiseType<T>>
