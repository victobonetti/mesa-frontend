export const handleResponse = (result: any, throwError: (msg?:string) => void) => {
	if (result.err) {
		if (result.errMsg) {
			throwError(result.errMsg);
		} else {
			throwError();
		}
	}
	return result.err
};