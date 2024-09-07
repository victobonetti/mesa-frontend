type AsyncFunction<T> = (...args: any[]) => Promise<T>;

export class ServiceRequest {
    static async call<T>(fn: AsyncFunction<T>, ...args: any[]): Promise<{err: boolean, result: T | null, errMsg: string | null}> {
        try {
            return {err: false, result: await fn(...args), errMsg: null};
        } catch (error:any) {
            try {
                console.log(error)
                return {err: true, result: null, errMsg: error['response']['data']['error']};
            }
            catch {
                return {err: true, result: null, errMsg: null};  
            }
        }
    }
}
