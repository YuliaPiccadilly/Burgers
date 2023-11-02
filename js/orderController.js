import { clearCart } from "./cart.js";
import { modalDeliveryContainer, modalDeliveryForm } from "./elements.js"

export const orderController = (getCart) => {

    const checkDelivery = () => {
        
            if (modalDeliveryForm.format.value === 'pickup') {
                modalDeliveryForm['address-info'].classList.add('modal-delivery__fieldset-input_hide')
            }
            if (modalDeliveryForm.format.value === 'delivery') {
                modalDeliveryForm['address-info'].classList.remove('modal-delivery__fieldset-input_hide')
            }
        };


    modalDeliveryForm.addEventListener('change', checkDelivery);

    modalDeliveryForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(modalDeliveryForm);
        const data =  Object.fromEntries(formData);
        data.order = getCart();
        console.log('data: ', data);

        fetch('https://reqres.in/api/users', {
            method: 'post',
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => console.log(data))
            .then(data => {
                clearCart()
                modalDeliveryContainer.insertAdjacentHTML('beforeend',`
                <h2 class="thanks">Спасибо за заказ!!!</h2>
                `);
                modalDeliveryForm.reset();
                checkDelivery();
            })
           
            
    })

}