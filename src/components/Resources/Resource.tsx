import { ResourceTypes } from "../../api/DataTypes";
import { Card, Image, Label, Icon, Container } from 'semantic-ui-react'
import { useTranslation } from "react-i18next";


// API.
const API_ADDRESS = process.env.REACT_APP_API_ADDRESS

interface ResourceProps { 
    type: number;
    file: string; 
    content_type: string
  }

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
        // flexDirection: 'row',
        width: '100%',
        marginTop: '1px',
    }
}


const CardFoot = () => {
    return (
        <div style={styles.footer}>
            <span style={{width:'100%'}} ></span>
            <Icon link name='close' color='red' />
        </div>
    )
}

const CardHead = ({type}:{type:number}) => {
    const { t } = useTranslation();
    var color = 'red'
    const title = t(ResourceTypes[type].title)
    
    switch (type) {
        case 0:
            color = 'olive'

            break;

        case 1:
            color = 'orange'
            break;

        case 2:
            color = 'tea'
            break;

        default:
            color = 'red'
            break;
    }

    console.log(color)

    return (
        <Label style={ styles.label } color="blue" ribbon >{title}</Label>
    )
}

/**
 * Single Resource
 * @param param0 
 * @returns 
 */
export const Resource = ({ type, file, content_type }:ResourceProps) => {
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
                        size='medium'
                        centered
                        fluid
                    />
                    <CardFoot />
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
                        size='medium' 
                        centered 
                        rounded
                        fluid
                        />
                    <CardFoot />
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
                    <span style={{height: '100%', width:'100%'}} ></span>
                    <CardFoot />
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