export const enum ErrorCodes {
    DuplicateKey = 11000,
    notFound = 404,
    invalidId = 400,
    internalError = 500,
    unauthorized = 401,
}

export interface NotFoundResponse {
    message: string,
    statusCode: ErrorCodes.notFound,
    errors: {
        notFound?: string[],
        noStock?: { id: string, stock: number}[],
    },
};