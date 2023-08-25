console.log(Redux);
console.log(ReduxThunk);

const WITHDRAW_MONEY="WITHDRAW_MONEY";
const DEPOSITE_MONEY="DEPOSITE_MONEY";
const ADD_PRODUCTS="ADD_PRODUCTS";
const GET_PRODUCTS="GET_PRODUCTS";

//action creator for bankreducer
const withdraw=(amount)=>{

  return{
  type:WITHDRAW_MONEY,
  payload:amount
  }

}

const deposite=(amount)=>{

  return{
  type:DEPOSITE_MONEY,
  payload:amount
}

}

//action creator for productsreducer
const addproducts=(product)=>{

  return{
  type:ADD_PRODUCTS,
  payload:product
}

}

const getproducts=(products)=>{
  return{
    type:GET_PRODUCTS,
    payload:products
  }
}

const fethcProducts=()=>{

  return async(dispatch)=>{
    const res=await fetch('https://fakestoreapi.com/products');
    const data=await res.json();
    console.log(data);
    dispatch(getproducts(data))
  
  }

}



//reducer 1 for bank
const bankReducer=(state=1000,action)=>{
  switch(action.type){
    case WITHDRAW_MONEY:
    return state-action.payload;
    case DEPOSITE_MONEY:
      return state+action.payload;
  
    default:
      return state;
  }

}

//reducer2
const productsReducer=(state=[],action)=>{
  switch(action.type){

    case GET_PRODUCTS:
      return [...action.payload];

    case ADD_PRODUCTS:
       return [...state,action.payload];
  
    default:
      return state;
  }

}


const appreducer=Redux.combineReducers({
  bank:bankReducer,
  products:productsReducer
})                                              
                                            //    بستدعي الثانك وير ف الستور//
const store=Redux.createStore(appreducer,Redux.applyMiddleware(ReduxThunk));

store.dispatch(withdraw(100));
store.dispatch(deposite(200));
store.dispatch(withdraw(100));
store.dispatch(addproducts({id:1,title:'polo'}));

console.log(store.getState());

//subscribeR تغني عن console.log store.getState

store.subscribe(()=>{

  console.log("current state is:" ,store.getState())
})