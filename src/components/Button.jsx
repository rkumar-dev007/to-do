import { mergeCss } from 'src/helpers/tailwind.merge';

function Button({ btnText, className, onClick, ...props }) {
  return (
    <button
      className={mergeCss('bg-blue-500 hover:bg-blue-700 text-white min-h-9 px-2 rounded mx-1', className)}
      onClick={onClick}
      {...props}
    >
      {btnText}
    </button>

  );
}

export default Button;
