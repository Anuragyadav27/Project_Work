import React, { useState } from "react";
import {
  UpdateUserStarted,
  UpdateUserFail,
  UpdateUserSucces,
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess,
  signInStarted,
  signInFailure,
  signOutSuccess,
  signOutFail,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function ChangePassword() {
    // using our signing user using redux
  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ password: "" });
  const navigate = useNavigate();

  // Geting the data from the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(UpdateUserStarted());
      // sending data to server
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // checking error 
        dispatch(UpdateUserFail(data.message));
        return;
      }
      dispatch(UpdateUserSucces(data));
      // if password changed then navigate to profile page
      navigate("/");
    } catch (error) {
      dispatch(UpdateUserFail(error.message));
    }
  };

  const handleDelete = async () =>{
    try {
        dispatch(deleteUserStart());
        // posting request to the server
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
            method: 'DELETE',
        });
        const data = await res.json();
        if(data.success === false) {
          // checking error 
            dispatch(deleteUserFail(data.message));
            return ;
        }
         dispatch(deleteUserSuccess(data))
         // if user successfully deleted redirect to home page
         navigate('/');
    } catch (error) {
        dispatch(deleteUserFail(error.message  || 'Failed to delete user'));
    }
  }

  const handleSignOut = async() => {
    try {
        dispatch(signInStarted());
        // seending sign out request
        const res = await fetch('/api/auth/signout');
        const data = await res.json();
        if(data.success === false) {
          // checking error 
            dispatch(signInFailure(data.message))
            return
        }
        dispatch(signOutSuccess());
        navigate('/')
    }  
    catch (error) {
        dispatch(signOutFail(error.message));
    }
}

  return (
    <>
    <Header></Header>
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Change Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="New password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update Password
        </button>
      </form>
      <p className="mt-3">
        Last Password Update:{" "}
        {currentUser?.passwordUpdated
          ? new Date(currentUser.passwordUpdated).toLocaleString()
          : "Never"}
      </p>
      <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete account</span>
      <br />
      <span onClick={handleSignOut} className="text-red-700 cursor-pointer ">Sign out</span>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
    </>
  );
}
