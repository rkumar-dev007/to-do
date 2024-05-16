import { mergeCss } from 'src/helpers/tailwind.merge';

function TextInput({ value, onChange, className, ...props }) {
   return (
      <textarea
         type="text"
         value={value}
         rows="3"
         onChange={onChange}
         placeholder="Enter your to-do"
         className={mergeCss('w-full pl-2 border border-solid rounded border-slate-300', className)}
         {...props}
      />
   );
}

export default TextInput;
