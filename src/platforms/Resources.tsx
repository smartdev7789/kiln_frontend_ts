import { useEffect, useState, SyntheticEvent, ChangeEvent } from "react"
import { API } from "../api/API"
import { ResourcesData } from "../api/DataTypes";
import { getToken } from "../authentication/Authentication";
import { Resource } from "../components/Resources/Resource";
import { ResorucesRequires } from "../components/Resources/ResourcesRequires";
import { Card, Grid } from 'semantic-ui-react'
import { useTranslation } from "react-i18next";
import { Form, Input, Dropdown, Button, InputOnChangeData, DropdownProps } from 'semantic-ui-react'

// To use Validateform
// import { FieldValue } from "../hooks/useForm";
// import { FormField, FieldType, ValidatedForm } from "../components/ValidatedForm/ValidatedForm";

// Interfaces
interface UpFielFormProps { 
  setResouces: Function
  platformInfoID: number 
}

export const UpFielForm = ({ platformInfoID, setResouces }:UpFielFormProps) => {
  const { t } = useTranslation()
  const [ type, setType ] = useState<string>('')
  const [ file, setFile ] = useState<any | null >(null)

  const selectType = (event: SyntheticEvent<HTMLElement, Event>, props: DropdownProps) => {
    setType(`${props.value}`)
  }
  
  const selectFile = ( event: ChangeEvent<HTMLInputElement>, props: InputOnChangeData ) => {
    setFile(event.target.files![0])
  }
  
  const handleSubmit = () => {
    const token = getToken()
 
    // Upload file
    API.addResource(token, platformInfoID, type, file!).then((response) => {
      // TODO / Duplicated code
      API.getAllResources(token, platformInfoID).then( (data) => {
        // Sort resources by 'type'
        const sortResources = ( data?._items as ResourcesData[] ).sort(function (a, b) {
          if (a.type > b.type) { return 1 }
          if (a.type < b.type) { return -1 }
          return 0 // a must be equal to b
        })
        setResouces( sortResources as ResourcesData[] )
      })

      // TODO - Reset Input file value
      setFile(null)
      setType('')
    })
  }

  const styles = {
    assets: {
      margin: '0 0 2rem 0',
      padding: '1rem',
      border: '1px solid lightgray',
      borderRadius: '0.5rem',
    }
  }

  const friendOptions = [
    { key: 'icon', text: 'Icon', value: 0 },
    { key: 'screenshot', text: 'Screenshot', value: 1 },
    { key: 'video', text: 'Video', value: 2 }
  ]

  return(
    <div style={styles.assets} >
      <Form className="bordered no-shadow assets" onSubmit={handleSubmit} >
        <h5>{t('Upload file')}</h5>
        <Form.Field>
          <Dropdown name="type" value={parseInt(type)} placeholder='Select type' fluid selection options={friendOptions} onChange={selectType}/>
        </Form.Field>
        <Form.Field>
          <Input name="file" type="file" accept="image/png, image/jpeg" onChange={selectFile}/>
        </Form.Field>
        <div style={{textAlign:'right'}}>
          { ( type === '' || file === null ) 
            ? <Button disabled id="submit" positive style={{margin: '5px'}} type='submit'>{t('upload')} </Button>
            : <Button id="submit" positive style={{margin: '5px'}} type='submit'>{t('upload')} </Button>
          }
        </div>
      </Form>
    </div>
  )
}

// Interfaces
interface ResourcesProps { 
  platformInfoID: number 
}
export const Resoruces = ( { platformInfoID }:ResourcesProps ) => {
    const { t } = useTranslation()
    const token = getToken() 
    const [ resources, setResouces ] = useState<ResourcesData[]>([])
    const requires = {
      icons: 2,
      screenshot: 3,
      video: 2
    }
    // const [ waitingForResponse, setWaitingForResponse ] = useState(false);
    // setWaitingForResponse(false);

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

    
    // To implement ValidateForm
    // interface interfaceFormData { [key: string]: FieldValue  }
    // const handleSubmit = async (formData: interfaceFormData) => {
    //     console.log(formData)
    // }
    // const formFields: FormField[] = [
    //     {
    //       key: "assets_1",
    //       type: FieldType.MultipleAssets,
    //       label: "editGame.info.categories.label",
    //     }
    // ]
    // // Initial data
    // const initialFormData = { 'assets_1': [] }

    return (
      <>
        <h1>{t('resources.title')}</h1>

          <Grid.Row>

              <UpFielForm 
                platformInfoID={ platformInfoID }
                setResouces = { setResouces }
              />
              {/* <ValidatedForm
                // loading={waitingForResponse}
                onSubmit={handleSubmit}
                fields={formFields}
                initialFormData={{...initialFormData}}
                buttons={[
                  {
                    text: "editGame.info.submit",
                    positive: true,
                    submit: true,
                  },
                ]}
              /> */}

          </Grid.Row>

        {
          resources!
          ?
            <div style={{width:'94%', margin:'1rem auto'}}>

              <ResorucesRequires resources={ resources } requires={ requires } />
              
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