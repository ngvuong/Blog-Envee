import { useState } from 'react';

function Image({
  fallback = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
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
