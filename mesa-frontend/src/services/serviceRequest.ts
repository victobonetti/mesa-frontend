type AsyncFunction<T> = (...args: any[]) => Promise<T>;

export class ServiceRequest {
    static async call<T>(fn: AsyncFunction<T>, ...args: any[]): Promise<{err: boolean, result: T | null, errMsg: string | null}> {
        try {
            let result = {err: false, result: await fn(...args), errMsg: null};
            console.log(result)
            return result
        } catch (error:any) {
            try {
                let result = {err: true, result: null, errMsg: error['response']['data']['error']};
                return result
            }
            catch {
                let result = {err: true, result: null, errMsg: null};  
                return result
            }
        }
    }
}
