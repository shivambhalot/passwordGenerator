import { useState  , useCallback , useEffect , useRef} from 'react'
import './App.css'

function App() {
  const [length , setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback( () =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) {
      str += "0123456789"
    }
    if(charAllowed) {
      str += "!@#%^&$*(){}[]_+-=~`"
    }

    for (let i=1; i<=length;i++) {
      let ch = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(ch)
    }

    setPassword(pass)

  } , [ length ,numberAllowed , charAllowed ])

  const copyPassToClipBoard = () => { 
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }
 

  useEffect(() => {
    passwordGenerator()
  } , [length , numberAllowed ,charAllowed , passwordGenerator])

  return (
    <div 
    className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
        backgroundImage: `url('https://img.freepik.com/premium-vector/fingerprint-with-padlock-icon-made-with-binary-code-personal-data-protection-cyber-security-private-secure-safety-biometrics-identification-matrix-background-with-digits-10-vector-illustration_127544-2685.jpg?w=1060')`,
    }}
    >
      <div className='w-full max-w-lg min-h-48 mx-auto shadow-md  rounded-lg px-6 my-20 text-black backdrop-blur-sm bg-white/30'>

        <h1 className='text-black font-extrabold text-3xl text-center my-5'>SecureKeyGen</h1>

        <div className='flex shadow rounded-lg my-8'>
            <input
                type="text" 
                value={password}
                id="myinput"
                className='outline-none w-full py-1 px-3'
                placeholder='password'
                readOnly
                ref = {passwordRef}
            />
            <button
            onClick = {copyPassToClipBoard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>

        <div className='flex text-sm gap-x-4 mt-3'>
          <div className='flex items-center gap-x-1'>
            <input 
                type="range"
                min = {6}
                max = {100}
                value = {length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}}
            />
            <label className='text-lg font-semibold'>_Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                    setNumberAllowed((prev) => !prev);
                }}
            />
            <label htmlFor="numberInput" className='text-lg font-semibold'>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                    setCharAllowed((prev) => !prev )
                }}
            />
            <label htmlFor="characterInput" className='text-lg font-semibold'>Characters</label>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
