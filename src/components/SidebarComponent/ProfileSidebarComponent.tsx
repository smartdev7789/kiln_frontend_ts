import React from "react";

interface Props {
  selected: string;
  onClick: (arg: string) => void;
}

const ProfileSidebarComponent: React.FC<Props> = ({ selected, onClick }) => {
  return (
    <div className="shadow-sm h-full bg-white">
      <p className="text-center bg-[#f7f7f7] py-3">My Profile</p>
      <button
        type="button"
        className={
          "inline-flex relative items-center py-1 pl-6 w-full text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white " +
          (selected === "account" ? "bg-[#f7f7f7]" : "bg-white")
        }
        onClick={() => onClick("account")}
      >
        Account Details
      </button>
      <button
        type="button"
        className={
          "inline-flex relative items-center py-1 pl-6 w-full text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white " +
          (selected === "business" ? "bg-[#f7f7f7]" : "bg-white")
        }
        onClick={() => onClick("business")}
      >
        Business Details
      </button>
      <button
        type="button"
        className={
          "inline-flex relative items-center py-1 pl-6 w-full text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white " +
          (selected === "billing" ? "bg-[#f7f7f7]" : "bg-white")
        }
        onClick={() => onClick("billing")}
      >
        Billing
      </button>
    </div>
  );
};

export default ProfileSidebarComponent;