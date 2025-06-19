"use client";
 
import { useFormContext } from "react-hook-form";
import { IInput } from "../../types";
 
import { Input } from "@nextui-org/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface IProps extends IInput {}

export default function PHInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors ? (errors[name]?.message as string) : ""; // Get the error message for the specific field
  const isInvalid = !!errorMessage; // Check if there's an error

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  // Handler for toggling password visibility
  const handleToggle = () => setShowPassword((prev) => !prev);

  return (
    <Input
      {...register(name)}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      placeholder={label}
      required={required}
      size={size}
      type={isPassword ? (showPassword ? "text" : "password") : type}
      variant={variant}
      className="border rounded-xl px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-accent transition-all duration-300 text-base md:text-lg bg-white/90"
      endContent={
        isPassword && (
          <motion.div
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.15, color: '#7edad2' }}
            style={{ minWidth: 36, minHeight: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <button
              type="button"
              tabIndex={-1}
              onClick={handleToggle}
              className="focus:outline-none text-gray-400 hover:text-accent transition-colors duration-200 rounded-full p-1 md:p-2 bg-white/70 shadow-sm border border-transparent hover:border-accent focus:ring-2 focus:ring-accent"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </motion.div>
        )
      }
    />
  );
}
