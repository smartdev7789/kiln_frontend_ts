import { CSSProperties } from "react"
import { ResourceTypes } from "../../api/DataTypes"
import { Card, Image, Label, Icon, Button, SemanticCOLORS } from 'semantic-ui-react'
import { useTranslation } from "react-i18next"
import { API } from "../../api/API"
import { getToken } from "../../authentication/Authentication"
// API.
const API_ADDRESS = process.env.REACT_APP_API_ADDRESS

const styles = {
    card: {
        padding: '1rem',
        border: '1px lightgray solid',
        boxShadown: 'none',
    },
    resource: {
        width: '250px',
        minWidth: '20%',
    },
    label: {
        width: "40%",
        marginBottom: '0.5rem',
    },
    img: {
        margin: '0',
    },
    video: {
        marginTop: '0.5rem',
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
    },    
    footer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '100%',
        marginTop: '1px',
    },
    remove: {
        margin: '0',
        padding: '0',
        width: '1em',
        height: '1em',
    }
}

interface HeadProps {
    type: number
}

/**
 * CardHead component.
 * 
 * @returns CardHead
 */
const CardHead = ( { type }:HeadProps ) => {
    const { t } = useTranslation();
    let color = 'red'
    const title = t(ResourceTypes[type].title)
    
    switch (type) {
        case 0:
            color = 'olive'
            break;
        
        case 1:
            color = 'orange'
            break;
            
        case 2:
            color = 'violet'
            break;
        }
        
    return (
        <Label style={ styles.label } color={ color as SemanticCOLORS } ribbon >{title}</Label>
    )
}


interface FootProps {
    platformInfoID: number
    id: number
    eTag: string
}

/**
 * CardFoot component.
 * 
 * @returns Component
 */
const CardFoot = ({platformInfoID, id, eTag }:FootProps ) => {
    
    const handleDelete = async() => {
        // Remove Resouce
        const token = getToken()
        const response = await API.deleteResource(token, platformInfoID, id, eTag)
        if ( response?._status === 'OK' ) {
            // TODO
            console.log( "Refresh resources" )
        } else {
            // TODO
            console.log( "Show error" )
        }
    }
    
    return (
        <>
            <span style={{height: '100%', width:'100%', minHeight:'5px'}} ></span>
            <div style={styles.footer as CSSProperties }  >
                <Button style={styles.remove as CSSProperties } size="small" onClick={ handleDelete }>
                    <Icon name='close' color='red' />
                </Button>
            </div>
        </>
    )
}

interface ResourceProps { 
    platformInfoID: number
    id: number
    type: number
    file: string
    content_type: string
    eTag: string
}

/**
 * Single Resource
 * @param param0 
 * @returns 
 */
export const Resource = ({ platformInfoID, id, type, file, content_type, eTag }:ResourceProps) => {
    const { t } = useTranslation();
    
    switch (type) {
        case 0:
        // Icon
        return (
                <Card style={ styles.card }>
                    <CardHead type={ 0 } />
                    <Image 
                        sytle={styles.img}
                        src={`${API_ADDRESS}${file}`}
                        centered
                        rounded
                        fluid
                    />
                    <CardFoot id={ id } eTag={ eTag } platformInfoID={ platformInfoID } />
                </Card>
            )

        // Screenshot
        case 1:
            return (
                <Card style={ styles.card }>
                    <CardHead type={ 1 } />
                    <Image 
                        sytle={styles.img} 
                        src={`${API_ADDRESS}${file}`} 
                        centered 
                        rounded
                        fluid
                        />
                    <CardFoot id={ id } eTag={ eTag } platformInfoID={ platformInfoID } />
                </Card>
            )

        // Video
        case 2:
            const video = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
            // src = `${API_ADDRESS}${file}`
            return (
                <Card style={ styles.card }>
                    <CardHead type={ 2 } />
                    <video style={styles.video} src={video} controls >
                        {t('resources.viedo.text')}
                    </video>
                    <CardFoot id={ id } eTag={ eTag } platformInfoID={ platformInfoID } />
                </Card>
            )

        default:
        return (
            <div className="resource" style={styles.resource}>
                <img style={styles.img}  src={`${API_ADDRESS}${file}`} alt="" />
            </div>
        )
    }

}