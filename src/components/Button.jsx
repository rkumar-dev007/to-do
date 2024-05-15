function Button({ btnText, onClick, ...props }) {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white min-h-9 px-2 rounded mx-1'
      onClick={onClick}
      {...props}
    >
      {btnText}
    </button>

  );
}

export default Button;
