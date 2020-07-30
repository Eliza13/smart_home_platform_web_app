export const updateState = (oldState, propsToBeUpdated) => {
    return {
        ...oldState,
        ...propsToBeUpdated
    }
}