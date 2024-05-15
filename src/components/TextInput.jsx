
function TextInput({ value, onChange, ...props }) {
   return (
      <input
         type="text"
         value={value}
         onChange={onChange}
         placeholder="Enter your to-do"
         className='h-9 w-full pl-2 border-solid border border-slate-300  rounded'
         {...props}
      />
   );
}

export default TextInput;
