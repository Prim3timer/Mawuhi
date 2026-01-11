import { useReducer, useEffect, useContext, useState  } from "react"
import reducer from "../reducer"
import initialState from "../store"  
import axios from "../app/api/axios"
import AuthContext from "../context/authProvider"



const EditItem = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {items, picUrl, measurements} = useContext(AuthContext)
    const [item, setItem] = useState({})
    const [picArray, setPicArray] = useState([])
    const [unitMeasure, setUnitMeasure] = useState()
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')



            let fiveArray = []
    let i = 0;
    while (i < 5){
        fiveArray.push({id: i + 1, name: 'no image'})
        i++
    }
    const getItem = () => {
        const currentItem = items.find((item) => item._id === localStorage.getItem('memId'))
   
        if (currentItem){
            setUnitMeasure(currentItem.unitMeasure)
            setPrice(currentItem.price)
            dispatch({type: 'ole', payload: currentItem.price})
            dispatch({type: 'afa', payload: currentItem.name})
           currentItem.img.map((pic, i) => {
                // return pic
                fiveArray.splice(i, 1, pic)
            })
            console.log(fiveArray)
         setPicArray(fiveArray)
            
            setItem(currentItem)
        }
    }

    const options = measurements.map((measurement) => {
        return (
            <option
            className="update-form-unit-measuer"
            >{measurement}</option>
        )
    })


    const onUnitMeasureChange = (e) => {
        console.log(e.target.value)
        setUnitMeasure(e.target.value)
    }

    const handleEdit = () => {
        console.log(unitMeasure)
        console.log(description)
        console.log((state.ole))
        console.log((state.afa))
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    useEffect(()=> {
        getItem()
    }, [])

 
    return (
        <div className="edit-an-item">
            <h2>Edit Item</h2>
            <section className="edit-item-colage">
        {picArray && picArray.map((pic)=> {
                 console.log(pic)
         return (
            // <div></div>
             <img className="edit-item-image" src={`${picUrl}/images/${item.name}/${pic}`} alt={pic.name}/>
         )

        })}
        </section>
            <form onSubmit={(e)=> e.preventDefault()}
                className="item-update-form"  
                >
                <label htmlFor="name">name

                <input
                type="text"
                id="name"
                className="update-form-name"
                value={state.afa}
                onChange={(e)=> dispatch({type: 'afa', payload: e.target.value})}
                />
                </label>
                <label htmlFor="qty">quantity
                <input
                type="text" 
                className="update-form-quantity"
                id="ole"
                value={item.qty}
                onChange={(e)=> dispatch({type: 'ole', payload: e.target.value})}
                />
                </label>
                <label>Unit Measure
                 <select
                className="unit-measure-options"
                size={"1"}
                    value={unitMeasure}
                    onChange={(e)=> onUnitMeasureChange(e)}
                >
                 {options}
                </select>
                </label>
              
                <label htmlFor="qty">price
                <input
                type="text" 
                id="ole"
                value={state.ole}
                onChange={(e)=> dispatch({type: 'ole', payload: e.target.value})}
                />
                </label>
                <label>Description:</label>
                <textarea className="item-description"
                onChange={(e) => handleDescription(e)}
                ></textarea>
              
                <button 
                id="update-button"
                onClick={handleEdit}
                type="submit">Update</button>
                <h2>{state.success}</h2>
            </form>
        </div>
    )
}

export default EditItem
