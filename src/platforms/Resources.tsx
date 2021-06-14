// import React, { useContext, useEffect, useState } from "react";
import { useEffect, useState } from "react"
import { API } from "../api/API"
import { ResourcesData } from "../api/DataTypes";
import { getToken } from "../authentication/Authentication";
import { Resource } from "../components/Resources/Resource";
import { Card, Item } from 'semantic-ui-react'
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
    const [ resources, setResouces ] = useState<ResourcesData[]>([])

    // const [ waitingForResponse, setWaitingForResponse ] = useState(false);
    // setWaitingForResponse(false);
    // const { t } = useTranslation();

    // Get resources
    useEffect(()=>{
        API.getAllResources(token, platformInfoID).then( (data) => {
            // Sort resources by 'type'
            const sortResources = ( data?._items as ResourcesData[] ).sort(function (a, b) {
              if (a.type > b.type) { return 1 }
              if (a.type < b.type) { return -1 }
              return 0 // a must be equal to b
            })
            setResouces( sortResources as ResourcesData[] )
        })

    }, [token, platformInfoID] )

    /**
     * Remove resources 
     * 
     * @param id 
     */
    const removeResouce = async(id:number) => {
      // Get eTag of ID
      const eTag = resources.find( (item) => {
          return item.id === id ? item._etag : null
      })?._etag

      if ( eTag! ) {
        const response = await API.deleteResource(token, platformInfoID, id, eTag)
        if ( response?._status === 'OK' ) {
            // Remove ID from resources
            setResouces(resources.filter(( item ) => {
              return item.id === id ? null : item.id
            }))
        } else {
            // TODO
            console.log( "Show error" )
        }
      }
     
    }

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
                      removeResouce = { removeResouce }
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