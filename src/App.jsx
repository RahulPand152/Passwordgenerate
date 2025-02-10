import { useState, useCallback, useEffect,useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] =useState("")

  //ref hooks
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJLLMNOPQUSTUVWXYZabcdefghijklmnopqurstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="@#$%[]{}?/*+-!"

    for(let i=1;i<=length;i++){
     
    let char =  Math.floor(Math.random()*str.length+1)

    pass += str.charAt(char)
    }
    setpassword(pass)
    

  }, [length,numberAllowed,charAllowed, setpassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])


  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md 
     rounded-lg px-4 my-8 text-orange-500 bg-gray-500'>
      
    <h1 className='text-white text-centre my-3'>Password Generator</h1>
    <div className="flex  rounded-lg overflow-hidden mb-4 shadow">
      <input 
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}
      
       />
       <button
       onClick={copyPasswordToClipboard}
       className='outline-none bg-blue-700 px-3 py-0.5 shrink-0 text-white'>copy
       </button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-centre gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setlength(e.target.value)}}
        >
        </input>

        <label>length{length}</label>
        </div>
        <div className='flex items-centre gap-x'>

          <input
          type="checkbox"
          defaultChecked ={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setcharAllowed((prev) =>!prev);
          }}></input>
          <label>numberInput</label>
        </div>

        <div className='flex items-centre gap-x-1'>

          <input
          type="checkbox"
          defaultChecked ={charAllowed}
          id="characterInput"
          onChange={()=>{
            setcharAllowed((prev) =>!prev);
          }}></input>
          <label htmlFor="characterInput">Characters</label>
        </div>


    </div>
    </div>
    </>
  )
}

export default App
