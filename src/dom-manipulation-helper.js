const createNewElement = (container, className, type = 'div') => {
 const newElement = document.createElement(type);
 container.appendChild(newElement);
 newElement.classList.add(className);

 return newElement;
};

export default createNewElement;