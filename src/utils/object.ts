interface AnyObject extends Object {
    [key: string]: any
}

export const getKeys = (obj: AnyObject, current: string[] = []): string[] => {
    const keys: string[] = []
    for(const key of Object.keys(obj)) {
        if(obj[key] instanceof Object)
            keys.push(...getKeys(obj[key], [...current, key]))
        else
            keys.push([...current, key].join("."))
    }
    return keys
}

export const getValues = (obj: AnyObject, current: string[] = []): any[] => {
    const values: any[] = []
    for(const key of Object.keys(obj)) {
        if(obj[key] instanceof Object) 
            values.push(...getValues(obj[key], [...current, key]))
        else 
            values.push(obj[key])
    }
    return values
}

export const getValue = (keys: string[], values: any[], key: string): any => {
    return values[keys.indexOf(key)]
}