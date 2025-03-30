import { act } from "react"

const reducer = (state, action)=> {

    switch (action.type){
        case 'items':
            return {...state, items: action.payload}
            
            case 'sales': 
      return {...state, sales: action.payload}

      case 'search':
        return {...state, search: action.payload}

        case 'inventory': 
        return {...state, inventory: action.payload}
       case 'name': 
       return {...state, name: action.payload}
       case 'price': 
       return {...state, price: action.payload}
       case 'unitMeasure': 
       return {...state, unitMeasure: action.payload}
       case 'piecesUnit': 
       return {...state, piecesUnit: action.payload}
       case 'isMatched': 
        return {...state, isMatched: action.payload}
       case 'user': 
        return {...state, user: action.payload}
       case 'validName': 
        return {...state, validName: action.payload}
       case 'userFocus': 
        return {...state, userFocus: action.payload}
       case 'pwd': 
        return {...state, pwd: action.payload}
       case 'validPwd': 
        return {...state, validPwd: action.payload}
       case 'pwdFocus': 
        return {...state, pwdFocus: action.payload}
       case 'matchPwd': 
        return {...state, matchPwd: action.payload}
       case 'validMatch': 
        return {...state, validMatch: action.payload}
       case 'matchFocus': 
        return {...state, matchFocus: action.payload}
       case 'errMsg': 
        return {...state, errMsg: action.payload}
       case 'success': 
        return {...state, success: action.payload}
       case 'qty': 
     return {...state, qty: action.payload}
    //   case 'auth': 
       //  return {...state, auth: action.payload}
        case 'getNames':
          return {...state, getNames: action.payload}
        
        case 'marker':
          return {...state, marker: action.payload}
        case 'isEdit':
          return {...state, isEdit: action.payload}
        case 'inItem':
          return {...state, inItem: action.payload}
        case 'outItem':
          return {...state, outItem: action.payload}
        case 'afa':
          return {...state, afa: action.payload}
        case 'ole':
          return {...state, ole: action.payload}
        case 'transArray':
          return {...state, transArray: action.payload}
        case 'cartItem':
          return {...state, cart: action.payload}
        case 'total':
          return {...state, total: action.payload}
        // case 'auth':
        //   return {...state, total: action.payload}
           case 'inventEdit':
                return {...state, outItem: action.payload}
        case 'amount':
            return {...state, amount: action.payload}
            case 'qtyArray':
                return {...state, qtyArray: action.payload}
        case 'clear':
          return {...state, transArray: []}


          case 'INCREMENT': 
          const tempCart = state.transArray.map((item)=> {
              if ( item._id === action.payload){
                const curretnQty = item.qty + 1
                  return {...item, qty: item.qty + 1, total: (item.price * curretnQty)}
              }
              return item
          })
          return {...state, transArray: tempCart}

          case 'DECREMENT':
            const tempCart2 = state.transArray.map((item)=> {
                if ( item._id === action.payload){
                    return {...item, qty: item.qty - 1, total: item.total - item.price}
                }
                return item
            }).filter((item)=> item.qty !== 0)
            return {...state, transArray: tempCart2}


                case 'FIELDCHANGE':
                  const tempCart3 = state.transArray.map((item)=> {
                  //  state.qty = action.payload
                  if (item._id === action.id){
                    return {...item, qty: action.payload, total: (item.price * action.payload)}
                    
                  }
                  return item
                 })
                 return {...state, transArray: tempCart3}
                 case 'blank': 
                 const tempCart4 = state.transArray.map((item)=> {
                  if (item._id === action.id){
                    return {...item, qty: action.payload, total: 0}
                    
                  }
                  return item
                 })
                 return {...state, transArray: tempCart4}
            case 'remove':
              return {...state, transArray: state.transArray.filter((item)=> item._id !== action.payload)
              }
              case 'getTotal': 
              const {amount, total} = state.transArray.reduce((cartTotal, cartItem)=> {
                const {price, qty} = cartItem
                cartTotal.total += price * qty
                cartTotal.amount += qty
                return cartTotal
        },
    {
        amount: 0,
        total: 0
    })

   
    return {...state, amount, total}

    case 'cartItem': 
    return {...state, cartItem: action.payload}

    case 'cancel':
        return {...state, cancel: action.payload}

        case 'backendUser':
          return {...state, backendUser: action.payload}

        case 'paidAmount': 
        return {...state, paidAmount: action.payload}
        case 'balance':
          return {...state, balance: action.payload }
          case 'difference':
            state.paidAmount = action.payload
          const newBalance = state.paidAmount - state.total
          return {...state, balance: newBalance}
          case 'id':
            return {...state, id: action.payload}
 
              default:
                throw new Error()
              }
            }
  export default reducer    