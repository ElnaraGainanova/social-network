import React from "react"
import profileReducer, {setStatus} from "./profileReducer"

let state = {
    profile: {},
    status: null,
    isLoading: false
};

test('status changes correctly', () => {
    const action = setStatus('new status')
    let newState = profileReducer(state, action)
    expect(newState.status).toBe('new status')
})

test('profile changes correctly', () => {
    const action = setStatus('new profile')
    let newState = profileReducer(state, action)
    expect(newState.profile).toBe('new status')
})