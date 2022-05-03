import { useState } from 'react';

function Image({
  fallback = 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  src,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);

  const onError = () => setImgSrc(fallback);

  return (
    <img src={imgSrc ? imgSrc : fallback} onError={onError} alt='' {...props} />
  );
}

export default Image;
