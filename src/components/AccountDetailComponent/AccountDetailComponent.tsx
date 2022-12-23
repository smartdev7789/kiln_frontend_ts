import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPatchAccountItem } from "../../schemas";
import { DispatchContext } from "../../App";
import { API } from "../../api/API";
import { getToken } from "../../authentication/Authentication";
import { accountEarningsRangeStats } from "../../api/StatsAPI";
import { useLoaderOverlay } from "../../hooks/useLoaderOverlay";
import { useNotify } from "../../hooks/useNotify";
interface IFormInputs {
  name: string;
  whatsapp: string;
  position: string;
  skype: string;
  email: string;
  wechat: string;
  mobile: string;
}

const AccountDetailComponent = () => {
  const { state } = useContext(DispatchContext);
  const token: string | null = getToken();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const {notifySuccess, notifyError} = useNotify();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schemaPatchAccountItem()),
  });

  const getAccountDocument = async () => {
    setWaitingForResponse(true);
    const data: any = await API.getAccount(token, state.account?.id!);
    data &&
      reset({
        name: data.name,
        whatsapp: data.whatsapp,
        position: data.position,
        skype: data.skype,
        email: data.email,
        wechat: data.wechat,
        mobile: data.mobile,
      });
    setWaitingForResponse(false);
  };

  useEffect(() => {
    state.account?.id && getAccountDocument();
  }, [state.account, token]);

  const onSubmit = async (data: IFormInputs) => {
    setWaitingForResponse(true);
    const response = await API.updateAccount(
      token,
      { ...data, id: state.account!.id },
      state.account!._etag
    );
    if (response._status === "OK") {
      notifySuccess("Updated account successfully")
    } else {
      console.log(response._error?.message);
      notifyError(response._error?.message);
    }
    setWaitingForResponse(false);
  };

  useLoaderOverlay(waitingForResponse);

  return (
    <>
      <p className="text-2xl text-[#707070]">Account Details</p>
      <div className="block my-6 px-6 pt-6 pb-12 w-full bg-white rounded-lg text-[#707070]">
        <span className="text-xl tracking-tight px-3">User Details</span>
        <form onSubmit={handleSubmit(onSubmit)} className="px-6">
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>Name:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("name")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errors.name && errors.name.message}
              </p>
            </div>
            <div className="relative z-0 w-full group">
              <span>WhatsApp:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("whatsapp")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errors.whatsapp && errors.whatsapp.message}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>Position:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("position")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errors.position && errors.position.message}
              </p>
            </div>
            <div className="relative z-0 w-full group">
              <span>Skype:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("skype")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errors.skype && errors.skype.message}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>E-mail:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("email")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="relative z-0 w-full group">
              <span>WeChat:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("wechat")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errors.wechat && errors.wechat.message}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>Mobile:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("mobile")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errors.mobile && errors.mobile.message}
              </p>
            </div>
            <div className="relative z-0 w-full group">
              <button
                type="submit"
                className="text-[#707070] text-opacity-[0.6499999761581421] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg mt-3 px-5"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="block my-14 px-6 pt-6 pb-12 w-3/5 bg-white rounded-lg text-[#707070]">
        <span className="text-xl tracking-tight px-3">Password Reset</span>
        <form className="px-6 text-sm">
          <div className="relative z-0 my-3 w-full group text-right">
            <span>Current Password:&nbsp;&nbsp;</span>
            <input
              type="password"
              name="password"
              id="password"
              className="w-2/3 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 my-3 w-full group text-right">
            <span>New Password:&nbsp;&nbsp;</span>
            <input
              type="password"
              name="newpassword"
              id="newpassword"
              className="w-2/3 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
          </div>
          <div className="relative z-0 my-3 w-full group text-right">
            <span>Retype New Password:&nbsp;&nbsp;</span>
            <input
              type="password"
              name="renewpassword"
              id="renewpassword"
              className="w-2/3 pt-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
          </div>

          <div className="relative z-0 my-3 w-full group text-right">
            <button
              type="submit"
              className="text-[#707070] text-opacity-[0.6499999761581421] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg mt-3 px-5"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountDetailComponent;
