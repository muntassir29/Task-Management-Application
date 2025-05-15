import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    
    <div>
  <label className='text-[13px] text-slate-800'>{label}</label>

  <div className='relative w-full justify-between gap-3 text-sm text-black bg-slate-100/50 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 outline-none'>
    <input
      type={
        type === "password" ? (showPassword ? "text" : "password") : type
      }
      placeholder={placeholder}
      className='w-full bg-transparent outline-none pr-10'
      // 👆 pr-10 pour l'espace de l’icône
      value={value}
      onChange={(e) => onChange(e)}
    />

    {type === "password" && (
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-blue-500"
      >
        {showPassword ? (
          <FaRegEye size={20} />
        ) : (
          <FaRegEyeSlash size={20} />
        )}
      </button>
    )}
  </div>
</div>


  );
};



export default Input;
