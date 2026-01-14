import { useReducer, useEffect, useContext, useState  } from "react"
import reducer from "../reducer"
import initialState from "../store"  
import axios, { axiosPrivate } from "../app/api/axios"
import AuthContext from "../context/authProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes, faPlus, faTrash, faSave } from "@fortawesome/free-solid-svg-icons"
import { type } from "@testing-library/user-event/dist/type"



const EditItem = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {items, picUrl, measurements} = useContext(AuthContext)
    const [item, setItem] = useState({})
    const [picArray, setPicArray] = useState([])
   const [firstName, setFirstName] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [id, setId] = useState()
    const [file, setFile] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [index, setIndex] = useState()
    const [success, setSuccess] = useState(false)
    const [initialPic, setInitialPic] = useState()
      const {afa, unitMeasure, ole} = state
       const now = new Date()



            let fiveArray = []


    const instantHandleFile =  () => {
        console.log('ihF')
    }
    
    const hanldePreviousFileName = (name) => {
        console.log(name)

    }
    const handleDeletePic = async (pic, id, index) => {

        try {
             const getPic = picArray.find((pic) => pic.id === id)
        console.log(getPic.name)
        setInitialPic(getPic.name)
    
        console.log(getPic)
       const currentPics = picArray.map((pic) => {
        if (pic.id === id){
            return {...pic, name: 'no image'}
        }
        return pic
       })
       setPicArray(currentPics)
       const response = await axiosPrivate.delete(`/delete-pic/${getPic.name}?name=${item.name}&id=${item._id}`)
       if (response){
            dispatch({type: 'errMsg', payload: response.data})
            setSuccess(false)
    }
    } catch (error) {
            dispatch({type: 'errMsg', payload: error.message})
            
        }
       
    }

    const getItem = () => {
        const currentItem = items.find((item) => item._id === localStorage.getItem('memId'))
        setFirstName(currentItem.name)
        if (currentItem){
         dispatch({type: 'unitMeasure', payload: currentItem.unitMeasure})
            setPrice(currentItem.price)
            dispatch({type: 'ole', payload: currentItem.price})
            dispatch({type: 'afa', payload: currentItem.name})
            setQuantity(currentItem.qty)
            setDescription(currentItem.description)
         setPicArray(currentItem.img)
            
            setItem(currentItem)
        }
    }

    const options = measurements.map((measurement) => {
        return (
            <option
            className="update-form-unit-measure"
            >{measurement}</option>
        )
    })

       const hanldeImageId = (ide) => {
        setId(ide)
        console.log(ide)
        setSuccess(false)
      
      }
    //      const instantHandleFile = (e, id) => {
    //     setInstantFile(e.target.files[0])
    //     console.log(e.target.files[0])
    //      setInstantId(id)
    // }


    const onUnitMeasureChange = (e) => {
        console.log(e.target.value)
        dispatch({type: 'unitMeasure', payload: e.target.value})
        // setUnitMeasure(e.target.value)
    }

     const handleFile = (e, ide) => {
        setFile(e.target.files[0])
        const newArray= picArray.map((pic)=>{
            if (pic.id === ide){
                return {...pic, name: e.target.files[0].name}
            }
            return pic
        })
        if (file){
            setSuccess(true)
            setId(ide)
        }
        setPicArray(newArray)
     
        setId(ide)
        console.log(e.target.files[0])
      }
// to add a single image to a particular canvas
      const handleUpload = async (id) => {
          const formData = new FormData()
        try {
             const imgObj =  {id, name: file.name}
    formData.append('image', file)
    console.log(item.img)
          
             item.img.map((item, i) => {
    fiveArray.splice(item.id -1, 1, item)
  })
             fiveArray.splice(id - 1, 1, imgObj) 
             console.log(fiveArray)
             const response = await axios.patch(`/items/pic/${item.name}?fiveArray=${JSON.stringify(fiveArray)}&initialPic=${initialPic}&id=${item._id}`, formData)
             if(response){
                 setSuccess(true)                                 
                 dispatch({type: 'errMsg', payload: response.data})
                 
                }
                setFile('')
        } catch (error) {
            dispatch({type: 'errMsg', payload: error.message})
        }
 
             
      }
      


// the purpose of this function is to make the image render once its uploaded
const imageFunc = async () => {
    const backendItems = await axiosPrivate.get('/items')
    const currentBackItem = backendItems.data.items.find((it) => it._id === item._id)
    if (currentBackItem){
        console.log(currentBackItem.img)
        setPicArray(currentBackItem.img)
    }
    
  try {
    
  } catch (error) {
    
  }
}

    const handleEdit = async (ide) => {
         
        console.log(fiveArray)
        setId(ide)
        console.log(state.afa)
        console.log(firstName)
        try {
               const newItem = {
                name: afa,
                price: ole,
                quantity,
                unitMeasure,
                description,
                // image: files,
                now
            }
             console.log(fiveArray)
            console.log(newItem)
           
             const response2 = await axiosPrivate.patch(`/items/texts/${JSON.stringify(newItem)}?id=${item._id}&firstName=${firstName}&index=${id}`)
            dispatch({type: 'success', payload: true})
            dispatch({type: 'errMsg', payload: response2.data.message})
        } catch (error) {
            dispatch({type: 'errMsg', payload: error.message})
        }
        finally {
            setTimeout(()=> {
                dispatch({type: 'success', payload: false})
                dispatch({type: 'errMsg', payload: ''})
            }, 3000 )
        }
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    useEffect(()=> {
        getItem()
    }, [])

    useEffect(()=> {
        imageFunc()
    }, [file])

 
    return (
        <div className="edit-an-item">
            <h2>Edit {item.name}</h2>
            <section className="edit-item-colage">
        {picArray && picArray.map((pic)=> {
                //  console.log(pic)
                //  console.log(id)
                //  console.log(file)
         return (
            <div className="edit-item-image" key={pic.id}>
                   {isLoading && pic.name === file && file.name ?  <p className="loading">Loading...</p> : ''}
       
                {pic.name === 'no image' ?  '':   <div className="the-icons"><label
     
        onClick={() => handleDeletePic(pic, pic.id, index)}
        > <FontAwesomeIcon
           className="del-icon-inner"
        icon={faTimes} /> </label></div>}
                
          {pic.name === 'no image' ? <div className="input-icon">{id === pic.id && file ? <p
  className="pic-name"
  >{ file ? file.name : '' }</p> : ''}<br/> {id !== pic.id || !file  ? <label  className="plus"
    htmlFor="addImage"
  ><FontAwesomeIcon icon={faPlus}/></label> : ''}
 {!file ? <input type="file"
   className={'add-pic-edit'}  
   onChange={(e) => handleFile(e, pic.id)}  
   onClick={() => hanldeImageId(pic.id)}
   htmlFor="addImage"
   /> : ''}
 </div> : 
 <img className="edit-item-image" src={`${picUrl}/images/${item.name}/${pic.name}`} alt={pic.name}/>}
         {file && <button className={id === pic.id && !success ? 'show-button': 'hide-button'} onClick={() => handleUpload(pic.id)}
//   
   >upload image</button>}
            </div>
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
                <label htmlFor="qty">in stock
                <input
                type="text" 
                className="update-form-quantity"
                id="ole"
                value={quantity}
                onChange={(e)=> setQuantity(e.target.value)}
                />
                </label>
                <label>unit measure
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
                <label>description:</label>
                <textarea className="item-description"
                maxLength={300}
                value={description}
                onChange={(e) => handleDescription(e)}
                ></textarea>
              
                <section className="edit-delete-text">
               <button  className="user-action"> <FontAwesomeIcon icon={faTrash}/></button>
                <button 
                className="user-action"
                onClick={handleEdit}
                type="submit"><FontAwesomeIcon icon={faSave}/></button>
                </section>
                {state.success ?<h2 className="err-msg">{state.errMsg}</h2> : ''}
            </form>
        </div>
    )
}

export default EditItem
