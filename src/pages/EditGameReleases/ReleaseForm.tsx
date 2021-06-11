import React, { useRef, useState } from "react";
import { APIResponse, Release } from "../../api/DataTypes";
import { FieldType, FormField, ValidatedForm } from "../../components/ValidatedForm/ValidatedForm";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Properties {
  index: number;
  release: Release;
  onSubmit: (data: Release, index: number, file?: File) => Promise<APIResponse | undefined>;
  onDelete: (index: number) => void;
}

export const ReleaseForm = ({ index, release, onSubmit, onDelete }: Properties) => {
  const { t } = useTranslation();

  const [file, setFile] = useState<File | null>(null);

  let waitingForResponse = false;

  const nameInput = useRef<HTMLInputElement>(null);

  const handlePackageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (nameInput.current) {
      nameInput.current.setCustomValidity("");
      nameInput.current.reportValidity();
    }
  };

  const formFields: FormField[] = [
    // TODO: Regions
    // {
    //   key: 'age_rating',
    //   type: FieldType.Dropdown,
    //   label: "editGame.info.age_rating",
    //   moreInfoLink: "https://developer.huawei.com/consumer/en/doc/50125",
    //   options: ["3+", "7+", "12+", "16+", "18+"].map((rating) => ({
    //     key: rating,
    //     value: rating,
    //     text: rating,
    //   })),
    // },
    {
      key: "name",
      type: FieldType.Text,
      required: true,
      label: "editGame.releases.form.name",
      unique: false,
      useRef: nameInput,
      onChange: handleNameChange,
    },
    {
      key: "changelog",
      type: FieldType.Textarea,
      required: true,
      label: "editGame.releases.form.changelog",
    },
    {
      key: "package",
      type: FieldType.FileUpload,
      label: "editGame.releases.form.package",
      placeholder: "CHUPALA",
      onChange: handlePackageChange,
    },
  ];
    
  let initialFormData = {
    "name": release.name || "",
    "changelog": release.changelog || ""
  };

  const handleSubmit = async (formData: object) => {
    waitingForResponse = true;

    const response = file ? await onSubmit(formData as Release, index, file) : await onSubmit(formData as Release, index);

    if (response?._status === "ERR") {
      if (nameInput.current) {
        nameInput.current.setCustomValidity(t(response?._error?.message!));
        nameInput.current.reportValidity();
      }
    }
  
    waitingForResponse = false;
  };

  const regex = /(.*\/)[^\/]+$/gm;
  let backendURI = `${process.env.REACT_APP_API_URI}`;
  backendURI = regex.exec(backendURI)![1];

  return (
        initialFormData! && formFields
        ?
        <>
          <ValidatedForm
            loading={waitingForResponse}
            onSubmit={handleSubmit}
            fields={formFields}
            initialFormData={initialFormData}
            buttons={[
              {
                text: "editGame.releases.save",
                positive: true,
                submit: true,
              },
              {
                text: "editGame.releases.delete",
                positive: false,
                disabled: true,
                onClick: () => { onDelete(index); }
              },
            ]}
          />
          {release.builds?.length === 0 && release.package.file !== "" &&
            <div>
              {/* <Link to={{ pathname: `${backendURI}${release.package.file}` }} target="_blank">Uploaded Build</Link> */}
              <p>Build Uploaded</p>
              <p>Platform Builds Processing ...</p>
            </div>
          }
        </>
      : 
      <div></div>
  )
}