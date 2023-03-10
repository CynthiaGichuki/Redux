import { TransformStreamDefaultController } from "node:stream/web"
import { combineReducers, createStore } from "redux"

enum Actions{
    CREATE_POLICY='CREATE_POLICY',
    DELETE_POLICY='DELETE_POLICY',
    CREATE_CLAIM='CREATE_CLAIM'

}

interface Form{
    type:Actions,
    payload:{
        name:string
        money:number
    }
}
const createPolicyForm=(name:string, money:number):Form=>{
    return{
        type:Actions.CREATE_POLICY,
        payload:{
            name, 
            money
        }
    }
}
const deletePolicyForm=(name:string, money:number):Form=>{
    return{
        type:Actions.DELETE_POLICY,
        payload:{
            name, 
            money
        }
    }
}
const createClaimForm=(name:string, money:number):Form=>{
    return{
        type:Actions.CREATE_CLAIM,
        payload:{
            name, 
            money
        }
    }
}

//departments
const accounting=(money:number=0, form:Form)=>{
    if(form.type===Actions.CREATE_POLICY){
        return money+form.payload.money
    }
    else if(form.type===Actions.CREATE_CLAIM){
        return money-form.payload.money
    }
    else if(form.type===Actions.DELETE_POLICY){
        return money-form.payload.money
    }
    return money
}
const policies=(listofPolicies:string[]=[], form:Form)=>{
    if(form.type===Actions.CREATE_POLICY){
        return [...listofPolicies, form.payload.name]
    }
    else if(form.type===Actions.DELETE_POLICY){
        return listofPolicies.filter(names=>{
            return names !==form.payload.name
        })
    }
    return listofPolicies
}
const claims = (listofClaims:string[]=[], form:Form)=>{
    if(form.type===Actions.CREATE_CLAIM){
        return [...listofClaims, form.payload.name]
    }
    return listofClaims
}

const state=combineReducers({
    accounting,
    policies,
    claims,
})
const store = createStore(state)
store.dispatch(createPolicyForm('Piera',4000) as never)
store.dispatch(createPolicyForm('Cynthia', 4000)as never)
store.dispatch(createPolicyForm('Onan', 4000)as never)
store.dispatch(createPolicyForm('Ian', 4000)as never)

store.dispatch(createClaimForm('Cynthia', 4000)as never)
store.dispatch(createClaimForm('Onan', 7000)as never)
console.log(store.getState());
