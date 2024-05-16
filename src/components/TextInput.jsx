import { mergeCss } from 'src/helpers/tailwind.merge';

function TextInput({ value, onChange, className, ...props }) {
   return (
      <input
         type="text"
         value={value}
         onChange={onChange}
         placeholder="Enter your to-do"
         className={mergeCss('w-full pl-2 border border-solid rounded h-9 border-slate-300', className)}
         {...props}
      />
   );
}

export default TextInput;
