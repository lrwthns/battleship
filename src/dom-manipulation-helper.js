const createNewElement = (container, className, type = 'div', id = '') => {
 const newElement = document.createElement(type);
 container.appendChild(newElement);
 newElement.classList.add(className);
 if (id !== '') {
   newElement.setAttribute('id', id);
 };

 return newElement;
};

export default createNewElement;