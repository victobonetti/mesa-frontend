type AsyncFunction<T> = (...args: any[]) => Promise<T>;

export class ServiceRequest {
    static async call<T>(fn: AsyncFunction<T>, ...args: any[]): Promise<T | null> {
        try {
            return await fn(...args);
        } catch (error) {
            return null;  
        }
    }
}
