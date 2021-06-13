// import React, { useContext, useEffect, useState } from "react";
import { useEffect, useState } from "react"
import { API } from "../api/API"
import { ResourcesData } from "../api/DataTypes";
import { getToken } from "../authentication/Authentication";
import { Resource } from "../components/Resources/Resource";
import { Card } from 'semantic-ui-react'
import { useTranslation } from "react-i18next";

// import { FieldValue } from "../hooks/useForm";
// import { FormField, FieldType, ValidatedForm } from "../components/ValidatedForm/ValidatedForm";

// Interfaces
interface ResourcesProps { 
  platformInfoID: number 
}

export const Resoruces = ( { platformInfoID }:ResourcesProps ) => {
    const { t } = useTranslation()
    const token = getToken() 
    // const [ waitingForResponse, setWaitingForResponse ] = useState(false);
    // setWaitingForResponse(false);

    const [ resources, setResouces ] = useState<ResourcesData[]>([])
    // const { t } = useTranslation();
    
    // Get resources
    useEffect(()=>{
        API.getAllResources(token, platformInfoID).then( (data) => {
            // console.log(data?._items!)
            // data?._items!.forEach((item)=> {
            //   console.log(item)
            // })
            const sortResources = ( data?._items as ResourcesData[] ).sort(function (a, b) {
              if (a.type > b.type) { return 1 }
              if (a.type < b.type) { return -1 }
              return 0 // a must be equal to b
            })
            setResouces( sortResources as ResourcesData[] )
        })

    }, [token, platformInfoID] )

    // const initialFormData = {
    //   id: 1,
    //   type: 1,
    // }
    
    // const fields = {
    //     key: 1,
    //     type: FieldType.MultipleAssets,
    //     label: "editGame.info.assets.label",
    // }

    // interface interfaceFormData {
    //     [key: string]: FieldValue
    //   }

    // const handleSubmit = async (formData: interfaceFormData) => {
    //     console.log(formData)
    // }
    // const formFields: FormField[] = [
    //     {
    //       key: "1",
    //       type: FieldType.MultipleAssets,
    //       label: "editGame.info.categories.label",
    //     }
    // ]

    return (
      <>
        <h1>{t('resources.title')}</h1>
        {
          // initialFormData!
          // ?
            
          //   // <>
          //   //   <ValidatedForm
          //   //     loading={waitingForResponse}
          //   //     onSubmit={handleSubmit}
          //   //     fields={formFields}
          //   //     initialFormData={initialFormData}
          //   //     buttons={[
          //   //       {
          //   //         text: "editGame.info.submit",
          //   //         positive: true,
          //   //         submit: true,
          //   //       },
          //   //     ]}
          //   //   />
          //   // </>
          // : 
          //   <div></div>
        }
        {
          resources!
          ?
            <div style={{width:'94%', margin:'1rem auto'}}>

              <Card.Group centered itemsPerRow='4' >
                { resources.map((resource) => {
                  return(
                    <Resource
                      key = {resource.id}
                      platformInfoID = { platformInfoID }
                      id = { resource.id }
                      type = { resource.type }
                      file = { resource.file.file } 
                      content_type = { resource.file.content_type } 
                      eTag = { resource._etag }
                    />
                    )
                  } ) }
              </Card.Group>
            
            </div>
          :
            null
        }
      </>
      )
}