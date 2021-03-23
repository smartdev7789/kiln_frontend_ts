import { ChangeEvent, useRef, useState } from "react";
import { Segment, Image, Icon, Button, Card } from "semantic-ui-react";
import { Asset } from "../../api/DataTypes";

type MultipleFileFieldProps = {
  files: Asset[];
  newFiles: File[];
  accept: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCloseClick: (file: File) => (event: any) => void;
  onPlusButtonClick: (event: any) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const MultipleFileField = ({
  files,
  newFiles,
  accept,
  inputRef,
  onChange,
  onCloseClick,
  onPlusButtonClick,
}: MultipleFileFieldProps) => {
  return (
    <Segment>
      <Card.Group className="fixed-margin">
        {files.map((image) => {
          return (
            <Card key={image.url}>
              <Image
                src={image.url}
                rounded
                size="small"
                centered
                verticalAlign="middle"
              />
            </Card>
          );
        })}
        {newFiles.map((imageFile, i) => {
          const src = URL.createObjectURL(imageFile);
          return (
            <Card key={i}>
              <Image
                src={src}
                rounded
                size="small"
                centered
                verticalAlign="middle"
              />
              <Button
                onClick={onCloseClick(imageFile)}
                icon="x"
                className="card-close"
                negative
                basic
                circular
              />
            </Card>
          );
        })}

        <input
          ref={inputRef}
          onChange={onChange}
          type="file"
          accept={accept}
          multiple
          hidden
        />
        <Card style={{ minHeight: "100px" }}>
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
      </Card.Group>
    </Segment>
  );
};
