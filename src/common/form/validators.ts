type ValidatorsType = (value:string) => string | undefined

export const required:ValidatorsType = value => {
    if(value) return undefined

    return 'Field is required'
}

export const emailValidation:ValidatorsType = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined

export default required