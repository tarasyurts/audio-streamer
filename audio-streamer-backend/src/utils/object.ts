function omit<T extends object, F extends keyof T>(obj: T, fields: F[]) {
    const result = { ...obj };
    fields.forEach((field) => delete result[field]);
    return result;
}

function clone<T extends object>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export { omit, clone };
