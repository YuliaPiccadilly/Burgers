import { API_URL, PREFIX_PRODUCT } from './const.js';
import {
    modalProduct,
    ingredientsList,
    modalProductTitle,
    modalProductImage,
    modalProductDescription,
    ingredientsCalories,
    modalProductPriceCount,
    modalProductBtn
} from './elements.js';
import { getData } from './getData.js';

export const openModal = async (id) => {
    const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`)
    ingredientsList.textContent = ''; //очищаем список

    
    modalProductTitle.textContent = product.title;
    modalProductImage.src = `${API_URL}/${product.image}`;
    modalProductDescription.textContent = product.description;
    modalProductPriceCount.textContent = product.price;
    ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
    
    const ingredientsListItems = product.ingredients.map((item) => {
    const li = document.createElement('li');
    li.classList.add('ingredients__item');
    li.textContent = item;
    return li;
    });
    ingredientsList.append(...ingredientsListItems); //добавляем ингредиенты в список
    modalProductBtn.dataset.idProduct = product.id;
    
    modalProduct.classList.add('modal_open');

// for(let i = 0; i < product.ingredients.length; i++) {
//     const li = document.createElement('li');
//     li.classList.add('ingredients__item');
//     li.textContent = product.ingredients[i];
//     ingredientsList.append(li);
// }

// product.ingredients.forEach((item) => {
//     const li = document.createElement('li');
//     li.classList.add('ingredients__item');
//     li.textContent = item;
//     ingredientsList.append(li);
// });
}