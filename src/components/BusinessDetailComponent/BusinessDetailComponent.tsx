import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
import { API } from "../../api/API";
import { DispatchContext } from "../../App";
import {
  getToken,
  handleAccountUpdate,
} from "../../authentication/Authentication";
import { useLoaderOverlay } from "../../hooks/useLoaderOverlay";
import { Team, Country, Currency, BankAccountType } from "../../api/DataTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPatchTeamItem } from "../../schemas";
import { useNotify } from "../../hooks/useNotify";

type CertFileType = {
  content_type?: string;
  file?: string;
} | null;

const BusinessDetailComponent = () => {
  const { state } = useContext(DispatchContext);
  const { notifySuccess, notifyError } = useNotify();
  const token: string | null = getToken();
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [bankAccountTypes, setBankAccountTypes] = useState<BankAccountType[]>(
    []
  );
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const companyCertFileRef = useRef<HTMLInputElement>(null);
  const [companyCertFile, setCompanyCertFile] = useState<File>();
  const [companyCert, setCompanyCert] = useState<CertFileType>();
  const vatTaxCertFileRef = useRef<HTMLInputElement>(null);
  const [vatTaxCertFile, setVatTaxCertFile] = useState<File>();
  const [vatTaxCert, setVatTaxCert] = useState<CertFileType>();
  const [currentImage, setCurrentImage] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register: registerTeamForm,
    handleSubmit: handleSubmitTeamForm,
    reset: resetTeamForm,
    formState: { errors: errorTeamForm },
    setValue,
    watch,
  } = useForm<Team>({
    mode: "onBlur",
    resolver: yupResolver(schemaPatchTeamItem()),
  });

  const getTeamDocument = async () => {
    setWaitingForResponse(true);
    const teamData: any = await API.getTeam(token, state.account?.team_id!);
    if (teamData) {
      resetTeamForm({
        legal_name: teamData.legal_name,
        legal_name_native: teamData.legal_name_native,
        legal_address: teamData.legal_address,
        legal_state_province: teamData.legal_state_province,
        legal_country_code: teamData.legal_country_code,
        legal_company_number: teamData.legal_company_number,
        legal_vat_tax_number: teamData.legal_vat_tax_number,

        support_dev_name: teamData.support_dev_name,
        support_email: teamData.support_email,
        support_privacy_policy: teamData.support_privacy_policy,
        support_terms_of_service: teamData.support_terms_of_service,

        bank_name: teamData.bank_name,
        bank_address: teamData.bank_address,
        bank_account_name: teamData.bank_account_name,
        bank_account_type: teamData.bank_account_type,
        bank_account_currency: teamData.bank_account_currency,
        bank_account_number: teamData.bank_account_number,
        bank_branch_name: teamData.bank_branch_name,
        bank_number: teamData.bank_number,
        bank_sort_code: teamData.bank_sort_code,
        bank_iban: teamData.bank_iban,
        bank_swiftbic: teamData.bank_swiftbic,
        bank_ach_routing_number: teamData.bank_ach_routing_number,
        bank_fedwire_routing_number: teamData.bank_fedwire_routing_number,

        company_incorporation_certificate:
          teamData.company_incorporation_certificate,
        vat_tax_certificate: teamData.vat_tax_certificate,
      });
      const auxAccount = state.account!;
      auxAccount._etag = teamData._etag;
      handleAccountUpdate(auxAccount);
    }
    setWaitingForResponse(false);
  };

  const getCountries = async () => {
    const data: any = await API.getCountries(token);
    setCountries([...data._items]);
  };

  const getCurrencies = async () => {
    const data: any = await API.getCurrencies(token);
    setCurrencies([...data._items]);
  };

  const getBackAccountTypes = async () => {
    const data: any = await API.getBackAccountTypes(token);
    setBankAccountTypes([...data._items]);
  };

  const onSubmitTeamForm = async (data: Team) => {
    setWaitingForResponse(true);
    const response = await API.updateTeam(
      token,
      state.account!.team_id,
      data,
      state.account!._etag,
      companyCertFile,
      vatTaxCertFile
    );
    if (response._status === "OK") {
      const auxAccount = state.account!;
      auxAccount._etag = response._etag;
      handleAccountUpdate(auxAccount);
      notifySuccess("Updated business details successfully");
    } else {
      notifyError(response._error?.message);
    }
    setWaitingForResponse(false);
  };

  const handlerClickCompanyCertUpload = (e: any) => {
    e.preventDefault();
    companyCertFileRef?.current?.click();
  };

  const handlerCompanyCertFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.target.files && setCompanyCertFile(e.target.files[0]);
  };

  const handlerClickVatTaxCertUpload = (e: any) => {
    e.preventDefault();
    vatTaxCertFileRef?.current?.click();
  };

  const handlerVatTaxCertFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.target.files && setVatTaxCertFile(e.target.files[0]);
  };

  const openLightbox = (path: string) => {
    setCurrentImage(`https://staging.gamebake.io${path}`);
    setIsOpen(true);
  };

  useEffect(() => {
    state.account?.team_id && getTeamDocument();
    getCountries();
    getCurrencies();
    getBackAccountTypes();
  }, [state.account, token]);

  useEffect(() => {
    setValue("legal_address", address1 + "&" + address2 + "&" + address3);
  }, [address1, address2, address3]);

  useEffect(() => {
    const subscription = watch((value) => {
      const address = value.legal_address;
      address?.split("&")[0] && setAddress1(address?.split("&")[0]);
      address?.split("&")[1] && setAddress2(address?.split("&")[1]);
      address?.split("&")[2] && setAddress3(address?.split("&")[2]);

      setCompanyCert(value.company_incorporation_certificate);
      setVatTaxCert(value.vat_tax_certificate);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useLoaderOverlay(waitingForResponse);

  return (
    <>
      <p className="text-2xl text-[#707070]">Company Details</p>
      <div className="block my-6 px-6 pt-3 pb-12 w-full bg-white rounded-lg text-[#707070]">
        <form
          className="text-sm"
          onSubmit={handleSubmitTeamForm(onSubmitTeamForm)}
        >
          <div className="grid md:grid-cols-5 my-3">
            <div className="col-span-3 pr-6">
              {/* Company Legal Information */}

              <div className="relative z-0 mb-5 w-full">
                <span className="tracking-tight px-3 text-xl">
                  Company Legal Information
                </span>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Registered/Legal Name:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("legal_name")}
                />
                <br />
                <span className="text-xs">(Local Language)&nbsp;&nbsp;</span>
                <div className="w-3/5 text-left float-right">
                  <span className="text-red150">
                    {errorTeamForm.legal_name ? (
                      errorTeamForm.legal_name.message
                    ) : (
                      <>&nbsp;</>
                    )}
                  </span>
                </div>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Registered/Legal Name:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("legal_name_native")}
                />
                <br />
                <span className="text-xs">(English)&nbsp;&nbsp;</span>
                <div className="w-3/5 text-left float-right">
                  <span className="text-red150">
                    {errorTeamForm.legal_name_native ? (
                      errorTeamForm.legal_name_native.message
                    ) : (
                      <>&nbsp;</>
                    )}
                  </span>
                </div>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <div className="flex">
                  <div className="w-2/5">
                    <span>Registered/Legal Address:&nbsp;&nbsp;</span>
                  </div>
                  <div className="w-3/5">
                    <input
                      className="w-full pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                    <input
                      className="w-full pt-1 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                    <input
                      className="w-full pt-1 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={address3}
                      onChange={(e) => setAddress3(e.target.value)}
                    />
                    <input
                      className="hidden"
                      {...registerTeamForm("legal_address")}
                    />
                  </div>
                </div>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>State/Province:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("legal_state_province")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.legal_state_province &&
                    errorTeamForm.legal_state_province.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Country:&nbsp;&nbsp;</span>
                <select
                  id="countries"
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  defaultValue=""
                  {...registerTeamForm("legal_country_code")}
                >
                  <option value="" disabled hidden>
                    Choose a country
                  </option>
                  {countries.map((country, i) => (
                    <option value={country.code} key={"country" + i}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.legal_country_code &&
                    errorTeamForm.legal_country_code.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Company Number:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("legal_company_number")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.legal_company_number &&
                    errorTeamForm.legal_company_number.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>VAT/Tax Number:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("legal_vat_tax_number")}
                />
              </div>

              {/* Company Support Information */}

              <div className="relative z-0 mt-9 mb-5 w-full">
                <span className="tracking-tight px-3 text-xl">
                  Company Support Information
                </span>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Developer Name:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("support_dev_name")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.support_dev_name &&
                    errorTeamForm.support_dev_name.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Support Email:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("support_email")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.support_email &&
                    errorTeamForm.support_email.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Privacy Policy Link:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("support_privacy_policy")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.support_privacy_policy &&
                    errorTeamForm.support_privacy_policy.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Terms of Service Link:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("support_terms_of_service")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.support_terms_of_service &&
                    errorTeamForm.support_terms_of_service.message}
                </p>
              </div>

              {/* Bank Information */}

              <div className="relative z-0 mt-9 mb-5 w-full">
                <span className="tracking-tight px-3 text-xl">
                  Bank Information
                </span>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Bank Name:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_name")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_name && errorTeamForm.bank_name.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Bank Address:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_address")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_address &&
                    errorTeamForm.bank_address.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Branch Name:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_branch_name")}
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Account Name:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_account_name")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_account_name &&
                    errorTeamForm.bank_account_name.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Account Type:&nbsp;&nbsp;</span>
                <select
                  id="accounttype"
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  defaultValue=""
                  {...registerTeamForm("bank_account_type")}
                >
                  <option value="" disabled hidden>
                    Choose an account type
                  </option>
                  {bankAccountTypes.map((bankAccountType, i) => (
                    <option
                      value={bankAccountType.code}
                      key={"bankaccounttype" + i}
                    >
                      {bankAccountType.name}
                    </option>
                  ))}
                </select>
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_account_type &&
                    errorTeamForm.bank_account_type.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Currency:&nbsp;&nbsp;</span>
                <select
                  id="currencies"
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  defaultValue=""
                  {...registerTeamForm("bank_account_currency")}
                >
                  <option value="" disabled hidden>
                    Choose a currency
                  </option>
                  {currencies.map((currency, i) => (
                    <option value={currency.code} key={"currency" + i}>
                      {currency.name}
                    </option>
                  ))}
                </select>
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_account_currency &&
                    errorTeamForm.bank_account_currency.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Bank Number:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_number")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_number &&
                    errorTeamForm.bank_number.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Account Number:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_account_number")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_account_number &&
                    errorTeamForm.bank_account_number.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Sort-Code:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_sort_code")}
                />
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>IBAN:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_iban")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_iban && errorTeamForm.bank_iban.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>SWIFTBIC:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_swiftbic")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_swiftbic &&
                    errorTeamForm.bank_swiftbic.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>ACH Routing Number:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_ach_routing_number")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_ach_routing_number &&
                    errorTeamForm.bank_ach_routing_number.message}
                </p>
              </div>
              <div className="relative z-0 my-3 w-full group text-right">
                <span>Fedwire Routing Number:&nbsp;&nbsp;</span>
                <input
                  className="w-3/5 pt-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-[#e3e3e3] appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...registerTeamForm("bank_fedwire_routing_number")}
                />
                <p className="text-red150 text-left left-[40%] relative">
                  {errorTeamForm.bank_fedwire_routing_number &&
                    errorTeamForm.bank_fedwire_routing_number.message}
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
            </div>
            <div className="col-span-2 flex flex-col">
              {/* Company Incorporation Certificate Card */}

              <span className="tracking-tight px-3 text-xl">
                Company Incorporation Certificate
              </span>
              <div className="w-full mt-6 px-3">
                <div className="flex justify-center items-center pt-5 pb-6 h-56 bg-[#f4f4f4] rounded-xl border-0">
                  {companyCert && companyCert !== null ? (
                    <img
                      className="h-56"
                      src={`https://staging.gamebake.io${companyCert.file}`}
                      onClick={() => openLightbox(companyCert.file!)}
                    />
                  ) : (
                    <img
                      className="h-32 opacity-[0.0530988983809948]"
                      src="imgs/upload.svg"
                      alt="GameBake"
                    />
                  )}
                </div>
                <input
                  ref={companyCertFileRef}
                  onChange={handlerCompanyCertFileChange}
                  type="file"
                  accept=".png,.jpg,.bmp"
                  className="hidden"
                />
                <button
                  onClick={handlerClickCompanyCertUpload}
                  className="text-white bg-[#ff9100] hover:bg-[#ee8000] float-right rounded-sm px-10 py-[0.35rem] mb-2 mt-3"
                >
                  Upload
                </button>
              </div>

              {/* VAT / Tax Certificate Card */}

              <span className="tracking-tight px-3 text-xl mt-8">
                VAT / Tax Certificate
              </span>
              <div className="w-full mt-6 px-3">
                <div className="flex justify-center items-center pt-5 pb-6 h-56 bg-[#f4f4f4] rounded-xl border-0">
                  {vatTaxCert && vatTaxCert !== null ? (
                    <img
                      className="h-56"
                      src={`https://staging.gamebake.io${vatTaxCert.file}`}
                      onClick={() => openLightbox(vatTaxCert.file!)}
                    />
                  ) : (
                    <img
                      className="h-32 opacity-[0.0530988983809948]"
                      src="imgs/upload.svg"
                      alt="GameBake"
                    />
                  )}
                </div>
                <input
                  ref={vatTaxCertFileRef}
                  onChange={handlerVatTaxCertFileChange}
                  type="file"
                  accept=".png,.jpg,.bmp"
                  className="hidden"
                />
                <button
                  onClick={handlerClickVatTaxCertUpload}
                  className="text-white bg-[#ff9100] hover:bg-[#ee8000] float-right rounded-sm px-10 py-[0.35rem] mb-2 mt-3"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </form>

        {isOpen && (
          <Lightbox
            reactModalStyle={{
              overlay: {
                zIndex: 5000,
              },
            }}
            mainSrc={currentImage}
            onCloseRequest={() => setIsOpen(false)}
            clickOutsideToClose={false}
            onImageLoad={() => {
              window.dispatchEvent(new Event("resize"));
            }}
          />
        )}
      </div>
    </>
  );
};

export default BusinessDetailComponent;
