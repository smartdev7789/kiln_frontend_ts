import { useRef, useState } from "react";
import { Segment, Image, Icon, Button, Card } from "semantic-ui-react";

type Resource = {
  type: number;
  width: number;
  height: number;
  url: string;
};

type MultipleImageFieldProps = {
  images: Resource[];
};

export const MultipleImageField = (props: MultipleImageFieldProps) => {
  const inputEl = useRef<HTMLInputElement>(null);

  const [newFiles, setNewFiles] = useState<File[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = [];
    for (let index = 0; index < event.target.files!.length; index++) {
      const file = event.target.files![index];
      files.push(file);
    }
    setNewFiles([...newFiles, ...files]);
  };

  const handleCloseClick = (file: File) => (event: any) => {
    event.preventDefault();
    setNewFiles(newFiles.filter((f) => f !== file));
  };

  const handlePlusButtonClick = (event: any) => {
    event.preventDefault();
    inputEl.current!.click();
  };

  return (
    <Segment>
      <Card.Group>
        {props.images.map((image) => {
          return (
            <Card key={image.url}>
              <Image
                src={image.url}
                rounded
                size="medium"
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
                size="medium"
                centered
                verticalAlign="middle"
              />
              <Button
                onClick={handleCloseClick(imageFile)}
                icon="x"
                className="card-close"
                negative
                basic
                circular
              />
            </Card>
          );
        })}
        <Card style={{ minHeight: "100px" }}>
          <input
            ref={inputEl}
            onChange={handleChange}
            type="file"
            accept="image/png, image/jpeg"
            multiple
            hidden
          />
          <Button
            onClick={handlePlusButtonClick}
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
