import * as React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { UPLOAD_IMAGE } from "../api/APIs";

interface Props {
  id?: number;
  src?: string;
  width?: number;
  height?: number;
  updateImage: (id: number | undefined, imageURL: any) => void;
}

export const ImageUpdator = React.memo((props: Props) => {
  const imageRef = React.createRef<HTMLInputElement>();
  const [src, setSource] = React.useState(props.src);

  const onChangeImage = React.useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      setSource(URL.createObjectURL(e.target.files[0]));
    }
  }, []);

  const onSubmitUploadImage = React.useCallback(
    async (e) => {
      e.preventDefault();
      if (imageRef.current && imageRef.current.files) {
        const file = imageRef.current.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        const response = await fetch(UPLOAD_IMAGE, {
          method: "POST",
          body: formData,
        });
        if (response) {
          const { imageInfo } = await response.json();
          props.updateImage(props.id, imageInfo.filename);
        }
      }
    },
    [src]
  );

  React.useEffect(() => {
    setSource(props.src);
  }, [props.src]);
  
  return (
    <div className="text-center">
      <img src={src} width={props.width || 60} height={props.height || 60} />
      <form className="w-100 text-right" method="post" encType="multipart/form-data" onSubmit={onSubmitUploadImage}>
        <Row>
          <input ref={imageRef} type="file" name="image" onChange={onChangeImage} />
        </Row>
        <Row>
          <Button size="sm" variant="outline-success" type="submit" name="upload">
            Save image
          </Button>
        </Row>
      </form>
    </div>
  );
});
