import { useReducer, useEffect, useContext, useState  } from "react"
import reducer from "../reducer"
import initialState from "../store"  
import axios, { axiosPrivate } from "../app/api/axios"
import AuthContext from "../context/authProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes, faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons"



const EditItem = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {items, picUrl, measurements} = useContext(AuthContext)
    const [item, setItem] = useState({})
    const [picArray, setPicArray] = useState([])
    const [unitMeasure, setUnitMeasure] = useState()
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [id, setId] = useState()
    const [file, setFile] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [index, setIndex] = useState()
    const [success, setSuccess] = useState(false)
    const [initialPic, setInitialPic] = useState()



            let fiveArray = []
    let i = 0;
    while (i < 5){
        fiveArray.push({id: i + 1, name: 'no image'})
        i++
    }

    const instantHandleFile =  () => {
        console.log('ihF')
    }
    
    const hanldePreviousFileName = (name) => {
        console.log(name)

    }
    const handleDeletePic = async (pic, id, index) => {
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
       fiveArray = currentPics
       const response = await axiosPrivate.delete(`/delete-pic/${getPic.name}?name=${item.name}&id=${item._id}`)
       console.log(fiveArray)

    }

    const getItem = () => {
        const currentItem = items.find((item) => item._id === localStorage.getItem('memId'))
   
        if (currentItem){
            setUnitMeasure(currentItem.unitMeasure)
            setPrice(currentItem.price)
            dispatch({type: 'ole', payload: currentItem.price})
            dispatch({type: 'afa', payload: currentItem.name})
            setQuantity(currentItem.qty)
            setDescription(currentItem.description)
           currentItem.img.map((pic, i) => {
                // return pic
                fiveArray.splice(i, 1, pic)
            })
            // console.log(fiveArray)
         setPicArray(fiveArray)
            
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
        // setPicArray(fiveArray)
        // setSuccess(false)
      
      }

    //      const instantHandleFile = (e, id) => {
    //     setInstantFile(e.target.files[0])
    //     console.log(e.target.files[0])
    //      setInstantId(id)
    // }


    const onUnitMeasureChange = (e) => {
        console.log(e.target.value)
        setUnitMeasure(e.target.value)
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

      const handleUpload = async (id) => {
        console.log('after shfit')
              const formData = new FormData()
  const imgObj =  {id, name: file.name}
    formData.append('image', file)
    console.log(file)
            // const newItem = {
            //     name: state.afa && state.afa,
            //     price: state.ole && state.ole,
            //     qty: quantity && quantity,
            //     unitMeasure: unitMeasure && unitMeasure,
            //     img: imgObj,
            //     description: description && description
            // }

             item.img.map((item, i) => {
    fiveArray.splice(item.id -1, 1, item)
  })
             fiveArray.splice(id - 1, 1, imgObj) 
             console.log(fiveArray)
             const response = await axios.patch(`/items/pic/${item.name}?fiveArray=${JSON.stringify(fiveArray)}&initialPic=${initialPic}&id=${item._id}`, formData)
             if (fiveArray){

                 setPicArray(fiveArray)
             } 
             
      }
      

    const handleEdit = async (ide) => {
        console.log(fiveArray)
        setId(ide)
        console.log(item.name)
        // console.log(unitMeasure)
        // console.log(description)
        // console.log((state.ole))
        // console.log(id)
           console.log(file)
        try {

             console.log(fiveArray)
            // console.log(newItem)
           
             const response2 = await axios.post(`/items/pic/${item.name}?id=${item._id}&fiveArray=${JSON.stringify(fiveArray)}&index=${id}`)
        } catch (error) {
            
        }
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
                //  console.log(pic)
                //  console.log(id)
                //  console.log(file)
         return (
            <div className="edit-item-image" key={pic.id}>
                   {isLoading && pic.name === file && file.name ?  <p className="loading">Loading...</p> : ''}
       
                {pic.name === 'no image' ?  '':   <div className="the-icons"><label 
        className="edit-icon-inner"
        htmlFor="myFile"
        ><input type="file"  className="input-for-edit" 
        name="myFile"
        onChange={(e) => instantHandleFile(e, pic.id)}
        onClick={() => hanldePreviousFileName(pic.name)}
        /></label><label
     
        onClick={() => handleDeletePic(pic, pic.id, index)}
        > <FontAwesomeIcon
           className="del-icon-inner"
        icon={faTimes} /> </label></div>}
                
          {pic.name === 'no image' ? <div className="input-icon">{id === pic.id && file ? <p
  className="pic-name"
  >{ file ? file.name : '' }</p> : ''}<br/> {id !== pic.id || !file  ? <label  className="plus"
    htmlFor="addImage"
  ><FontAwesomeIcon icon={faPlus}/></label> : ''}
  <input type="file"
   className={'add-pic-edit'}  
   onChange={(e) => handleFile(e, pic.id)}  
   onClick={() => hanldeImageId(pic.id)}
   htmlFor="addImage"
   />
 </div> : 
 <img className="edit-item-image" src={`${picUrl}/images/${item.name}/${pic.name}`} alt={pic.name}/>}
         {file && <button className={id === pic.id && !success ? 'show-button': 'hide-button'} onClick={() => handleUpload(pic.id,)}
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
                maxLength={300}
                value={description}
                onChange={(e) => handleDescription(e)}
                ></textarea>
              
                <button 
                id="update-button"
                onClick={handleEdit}
                type="submit">Done</button>
                <h2>{state.success}</h2>
            </form>
        </div>
    )
}

export default EditItem
