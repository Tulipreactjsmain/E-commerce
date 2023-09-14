import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button, Spinner } from "react-bootstrap";
import { useStore } from "../config/store";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [passwordShown, setpasswordShown] = useState(false);
  const togglePassword = () => {
    setpasswordShown(!passwordShown);
  };
  return (
    <>
      <div className="inputRegBox mx-auto">
        <h1 className="text-center">Update profile</h1>
      </div>
      <form className="d-flex flex-column align-items-center w-100" action="">
        <div className="mb-3 inputRegBox">
          <input
            type="text"
            placeholder="username"
            name="username"
            id="username"
            className="w-100 mb-0 inputReg"
            autoFocus
            {...register('username')}
          />
        </div>
        <div className="mb-3 inputRegBox">
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            className="w-100 mb-0 inputReg"
            {...register('email')}
          />
        </div>
        <div className="mb-3 inputRegBox position-relative">
          <input
            type={passwordShown ? 'text' : "password"}
            placeholder="Password"
            name="password"
            id="password"
            className="w-100 mb-0 inputReg"
            {...register('password')}
          />
        </div>
      </form>
    </>
  );
}
