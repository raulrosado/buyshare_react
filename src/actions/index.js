import { SET_USER,SEL_EVENT,SEL_LIST } from "./type";

export const setUser = (payload) =>({
    type:SET_USER,
    payload,
})
export const setEvent = (payload) =>({
    type:SEL_EVENT,
    payload,
})
export const setList = (payload) =>({
    type:SEL_LIST,
    payload,
})