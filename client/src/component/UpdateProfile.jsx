import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button, Spinner } from "react-bootstrap";
import { useStore } from "../config/store";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function UpdateProfile() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [imgPic, setImgPic] = useState(""); //send to cloudinary
    const [imgLink, setImgLink] = useState(""); //get cloudinary 
    const [loading, setLoading] = useState(false)
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm()

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <div className="inputRegBox mx-auto">
        <h1 className="text-center">UpdateProfile</h1>
      </div>
      <form className="d-flex flex-column align-items-center w-100">
        <div className="mb-3 inputRegBox">
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            className="w-100 mb-0 inputReg"
            autoFocus
            {...register("username")}
          />
        </div>
        <div className="mb-3 inputRegBox">
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            className="w-100 mb-0 inputReg"
            {...register("email")}
          />
        </div>
        <div className="mb-3 inputRegBox position-relative">
          <input
            type={passwordShown ? "text" : "password"}
            placeholder="password"
            name="password"
            id="password"
            className="w-100 mb-0 inputReg"
            {...register("password")}
          />
          {passwordShown ? (
            <AiFillEye
              className="position-absolute end-0 translate-middle"
              style={{ top: "50%", cursor: "pointer" }}
              onClick={togglePassword}
            />
          ) : (
            <AiFillEyeInvisible
              className="position-absolute end-0 translate-middle"
              style={{ top: "50%", cursor: "pointer" }}
              onClick={togglePassword}
            />
          )}
        </div>
        <div className="my-3 inputRegBox">
          <label htmlFor="profilepic">Update profile image</label>
          <input
            type="file"
            name="profilepic"
            accept="imgage/png, image/jpeg, image/jpg, image/webp"
            id="profilepic"
            className="border p-2 w-100 mb-0"
            onChange={(e) => setImgPic(e.target.files[0])}
          />
        </div>
        <div className="mb-3 inputRegBox">
            <Button type="submit" variant="dark" className="w-100 rounded-0">
                {loading ? <Spinner animation="border" size="sm"/> : "Update"}
            </Button>

        </div>
      </form>
    </>
  );
}
