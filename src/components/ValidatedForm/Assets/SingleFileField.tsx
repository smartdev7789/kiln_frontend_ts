import { ChangeEvent } from "react";
import { Image, Icon, Button, Card } from "semantic-ui-react";
import { Asset, AssetType } from "../../../api/DataTypes";
import ReactPlayer from 'react-player'

type SingleFileFieldProps = {
  file: Asset | null;
  accept: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCloseClick: (event: any) => void;
  onPlusButtonClick: (event: any) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const SingleFileField = ({
  file,
  accept,
  inputRef,
  onChange,
  onCloseClick,
  onPlusButtonClick,
}: SingleFileFieldProps) => {

  return (
    <>
      {file ?
        
        <Card key={file.url}>
          
          {file.type !== AssetType.Video && file.type !== AssetType.PromoVideo ?
            <Card key={file.url}>
              <Image
                src={file.url}
                rounded
                size="small"
                centered
                verticalAlign="middle"
              />
              <Button
                onClick={onCloseClick}
                icon="x"
                className="card-close"
                negative
                basic
                circular
              />
            </Card>
          :
            <Card key={file.url}>
              <ReactPlayer width="100%" url={file.url} controls />
              <Button
                onClick={onCloseClick}
                icon="x"
                className="card-close"
                negative
                basic
                circular
              />
            </Card>
          }
        </Card>  
      
        :
        
        <Card style={{ minHeight: "100px" }}>
          <input
            ref={inputRef}
            onChange={onChange}
            type="file"
            accept={accept}
            hidden
          />
          
          <Button
            onClick={onPlusButtonClick}
            basic
            primary
            style={{ height: "calc(100% + 2px)" }}
            fluid
            size="massive"
          >
            <Icon name="plus" />
          </Button>
        </Card>
      }
    </>
  );
};
