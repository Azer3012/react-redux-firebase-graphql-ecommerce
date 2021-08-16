import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Buttons from '../../components/Forms/Buttons'
import { auth } from '../../firebase/utils'
import './styles.scss'

function Recovery() {
    const [reset,setReset]=useState({
        email:'',
        error:false,
        errorMessage:''
    })

    let history=useHistory()

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const {email}=reset

            const config={
                url:'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email,config)
            .then(()=>{
                console.log('password reset');
                history.push("/login")
            })
            .catch(()=>{
              const err='Email not Found!'
              setReset({...reset,error:true,errorMessage:err})
            })
        } 
        catch (error) {
            console.log(error);
        }
        
    }
    const {error,errorMessage}=reset
    return (
        <div className="recovery">
            <h2>Change password</h2>
            {error &&(
                <span>{errorMessage}</span>
            )}
            <form onSubmit={handleSubmit}>
                <input value={reset.value} type="email" placeholder="your email" onChange={e=>setReset({email:e.target.value})} />
                <Buttons >
                    Send
                </Buttons>
            </form>
            
        </div>
    )
}

export default Recovery
