import { Field } from 'formik';
import { mergeCss } from 'src/helpers/tailwind.merge';

function FormField({ value, onChange, className, ...props }) {
   return (
      <Field
         type="text"
         value={value}
         onChange={onChange}
         className={mergeCss('w-3/4 h-9 p-1 border border-solid rounded border-slate-300', className)}
         {...props}
      />
   );
}

export default FormField;
