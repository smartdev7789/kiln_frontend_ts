import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPatchAccountItem, schemaPatchAccountPassword } from "../../schemas";
import { DispatchContext } from "../../App";
import { API } from "../../api/API";
import { getToken, handleAccountUpdate } from "../../authentication/Authentication";
import { useLoaderOverlay } from "../../hooks/useLoaderOverlay";
import { useNotify } from "../../hooks/useNotify";
interface IAccountFormInputs {
  name: string;
  whatsapp: string;
  position: string;
  skype: string;
  email: string;
  wechat: string;
  mobile: string;
}

interface IPwdFormInputs {
  password: string;
  new_password: string;
  confirm_password: string;
}

const AccountDetailComponent = () => {
  const { state } = useContext(DispatchContext);
  const token: string | null = getToken();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const {notifySuccess, notifyError} = useNotify();

  const {
    register: registerAccountForm,
    handleSubmit: handleSubmitAccountForm,
    reset: resetAccountForm,
    formState: { errors: errorAccountForm },
  } = useForm<IAccountFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schemaPatchAccountItem()),
  });

  const {
    register: registerPwdForm,
    handleSubmit: handleSubmitPwdForm,
    reset: resetPwdForm,
    formState: { errors: errorPwdForm },
  } = useForm<IPwdFormInputs>({
    mode: "onBlur",
    resolver: yupResolver(schemaPatchAccountPassword()),
  });

  const getAccountDocument = async () => {
    setWaitingForResponse(true);
    const data: any = await API.getAccount(token, state.account?.id!);
    if(data) {
      resetAccountForm({
        name: data.name,
        whatsapp: data.whatsapp,
        position: data.position,
        skype: data.skype,
        email: data.email,
        wechat: data.wechat,
        mobile: data.mobile,
      });
      const auxAccount = state.account!;
      auxAccount._etag = data._etag;
      handleAccountUpdate(auxAccount);
    }
    setWaitingForResponse(false);
  };

  useEffect(() => {
    state.account?.id && getAccountDocument();
  }, [state.account, token]);

  const onSubmitAccountForm = async (data: IAccountFormInputs) => {
    setWaitingForResponse(true);
    const response = await API.updateAccount(
      token,
      { ...data, id: state.account!.id },
      state.account!._etag
    );
    if (response._status === "OK") {
      const auxAccount = state.account!;
      auxAccount._etag = response._etag;
      handleAccountUpdate(auxAccount);
      notifySuccess("Updated account successfully")
    } else {
      notifyError(response._error?.message);
    }
    setWaitingForResponse(false);
  };

  const onSubmitPwdForm = async (data: IPwdFormInputs) => {
    setWaitingForResponse(true);
    const response = await API.changeAccountPassword(
      token,
      { ...data, id: state.account!.id }
    );
    if (response._status === "OK") {
      notifySuccess("Password changed successfully")
    } else {
      console.log(response);
      notifyError(response._issues?.password);
    }
    setWaitingForResponse(false);
  };

  useLoaderOverlay(waitingForResponse);

  return (
    <>
      <p className="text-2xl text-[#707070]">Account Details</p>
      <div className="block my-6 px-6 pt-6 pb-12 w-full bg-white rounded-lg text-[#707070] shadow-2xl">
        <span className="text-xl tracking-tight px-3">User Details</span>
        <form onSubmit={handleSubmitAccountForm(onSubmitAccountForm)} className="px-6">
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>Name:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...registerAccountForm("name")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errorAccountForm.name && errorAccountForm.name.message}
              </p>
            </div>
            <div className="relative z-0 w-full group">
              <span>WhatsApp:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...registerAccountForm("whatsapp")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errorAccountForm.whatsapp && errorAccountForm.whatsapp.message}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>Position:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...registerAccountForm("position")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errorAccountForm.position && errorAccountForm.position.message}
              </p>
            </div>
            <div className="relative z-0 w-full group">
              <span>Skype:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...registerAccountForm("skype")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errorAccountForm.skype && errorAccountForm.skype.message}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>E-mail:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...registerAccountForm("email")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errorAccountForm.email && errorAccountForm.email.message}
              </p>
            </div>
            <div className="relative z-0 w-full group">
              <span>WeChat:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...registerAccountForm("wechat")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errorAccountForm.wechat && errorAccountForm.wechat.message}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6 text-sm my-3 text-right">
            <div className="relative z-0 w-full group">
              <span>Mobile:&nbsp;&nbsp;</span>
              <input
                className="w-3/4 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...registerAccountForm("mobile")}
              />
              <p className="text-red150 text-left left-1/4 relative">
                {errorAccountForm.mobile && errorAccountForm.mobile.message}
              </p>
            </div>
            <div className="relative z-0 w-full group">
            <button
              type="submit"
              className="text-white bg-[#ff9100] hover:bg-[#ee8000] rounded-sm px-10 py-[0.35rem] mt-3"
            >
              Save
            </button>
            </div>
          </div>
        </form>
      </div>
      <div className="block my-14 px-6 pt-6 pb-12 w-3/5 bg-white rounded-lg text-[#707070] shadow-2xl">
        <span className="text-xl tracking-tight px-3">Password Reset</span>
        <form onSubmit={handleSubmitPwdForm(onSubmitPwdForm)} className="px-6 text-sm">
          <div className="relative z-0 my-3 w-full group text-right">
            <span>Current Password:&nbsp;&nbsp;</span>
            <input
              type="password"
              className="w-2/3 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              {...registerPwdForm("password")}
            />
            <p className="text-red150 text-left left-1/3 relative">
              {errorPwdForm.password && errorPwdForm.password.message}
            </p>
          </div>
          <div className="relative z-0 my-3 w-full group text-right">
            <span>New Password:&nbsp;&nbsp;</span>
            <input
              type="password"
              className="w-2/3 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              {...registerPwdForm("new_password")}
            />
            <p className="text-red150 text-left left-1/3 relative">
              {errorPwdForm.new_password && errorPwdForm.new_password.message}
            </p>
          </div>
          <div className="relative z-0 my-3 w-full group text-right">
            <span>Retype New Password:&nbsp;&nbsp;</span>
            <input
              type="password"
              className="w-2/3 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              {...registerPwdForm("confirm_password")}
            />
            <p className="text-red150 text-left left-1/3 relative">
              {errorPwdForm.confirm_password && errorPwdForm.confirm_password.message}
            </p>
          </div>

          <div className="relative z-0 my-3 w-full group text-right">
            <button
              type="submit"
              className="text-white bg-[#ff9100] hover:bg-[#ee8000] rounded-sm px-10 py-[0.35rem] mb-2 mt-3"
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
