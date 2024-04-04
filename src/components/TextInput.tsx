import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput: React.FC<TextInputProps> = (props) => {
  const { type, placeholder, value, onChange, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div style={{ position: 'relative' }}>
      <input
        {...rest}
        style={{ paddingRight: '30px' }}
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div
        onClick={togglePassword}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%',
          cursor: 'pointer',
        }}
      >
        {type === 'password' && (showPassword ? <FaEyeSlash /> : <FaEye />)}
      </div>
    </div>
  );
};