export const supportDvh = function () {
  const containerStyle = {
    height: '100dvh', 
  };

  if (!CSS.supports('height', '100dvh')) {
    containerStyle.height = '100vh';
  }

  return containerStyle

}

