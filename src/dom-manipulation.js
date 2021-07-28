const displayInitialElements = () => {
  const content = document.createElement('div');
  document.body.appendChild(content);
  content.classList.add('content');
  console.log('hello');
};

export {
  displayInitialElements,
};

