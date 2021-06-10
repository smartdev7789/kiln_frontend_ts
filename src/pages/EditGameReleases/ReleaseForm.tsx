import { useRef, useState } from "react";
import { Release } from "../../api/DataTypes";
import { FieldType, FormField, ValidatedForm } from "../../components/ValidatedForm/ValidatedForm";

interface Properties {
  index: number;
  release: Release;
  // onSubmit: {data: Release, index: number} | void;
  // onDelete: {index: number} | void;
  error: boolean;
}

export const ReleaseForm = ({ index, release, error }:Properties) => {
  let waitingForResponse = false;

  const [ test, setTest ] = useState(false);

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
    },
  ];
  
  // if (props.error) {
  //   console.log("ERROR !");
  //   formFields[0].unique = true;
  // }
  
  let initialFormData = {
    "name": release.name || "",
    "changelog": release.changelog || ""
  };

  const handleSubmit = async (formData: object) => {
    waitingForResponse = true;
    
    // onSubmit(formData as Release, index)
  
    waitingForResponse = false;
  };
  
  return (
        initialFormData! && formFields
        ?
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
              // onClick: () => { onDelete(index); }
            },
          ]}
        />
      : 
      <div></div>
  )
}