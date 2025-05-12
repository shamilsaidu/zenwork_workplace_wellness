import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from 'axios';
import { toast } from "react-toastify";
import {AppContent} from '../context/AppContext';
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {

  axios.defaults.withCredentials = true;

  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent)

  const navigate = useNavigate()

  const inputRefs = React.useRef([])

  const handleInput = (e, index)=>{
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index)=>{
    if(e.key === 'Backspace' && e.target.value === '' && index>0){
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) =>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index)=>{
      if(inputRefs.current[index])
        inputRefs.current[index].value = char;
    })
  }

  const onSubmitHandler = async (e) =>{
    try{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})

      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    } catch(error){
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin, userData])

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute 
          left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <form onSubmit = {onSubmitHandler} className="bg-[#2a4192] p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Verify Your Email
        </h1>
        <p className="text-center mb-6 text-white">
          Enter the 6-digit verification code sent to your email.
        </p>
        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#3a52b3] text-white text-center text-xl rounded-md"
                ref={e => inputRefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e)=> handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full text-white py-3 rounded-full bg-gradient-to-r from-[#1a2f7a] to-[#2a4192]">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;