/*numero*/

const savedAdminSettings = JSON.parse(
    localStorage.getItem("arepaExpressAdminSettings") || "{}"
);


const WHATSAPP_NUMBER = (
    savedAdminSettings.whatsapp || "556292259546"
).replace(/\D/g, "");


const savedEmailSettings = JSON.parse(
    localStorage.getItem("arepaExpressAdminSettings") || "{}"
);

const STORE_EMAIL =
    savedEmailSettings.email || "arepaexpress@gmail.com";

document.querySelectorAll(".social.gmail").forEach(link => {
    if (STORE_EMAIL) {
        link.href = "mailto:" + STORE_EMAIL;

        const emailText = link.querySelector("small");

        if (emailText) {
            emailText.textContent = STORE_EMAIL;
        }

        link.style.display = "";
    } else {
        link.style.display = "none";
    }
});





/* =========================================
   PRODUCTOS
========================================= */

let products = [

    {
        id: 1,
        name: "Reina Pepiada",
        description: "Pollo desmechado, aguacate y mayonesa.",
        price: 8.50,
        category: "arepas",
        emoji: "",
        image: "img/reina-pepiada.jpg"

    },

   {
    id: 2,
    name: "Pelúa",
    description: "Carne mechada y abundante queso amarillo.",
    price: 9.00,
    category: "arepas",
    emoji: "",
    image: "img/pelua.jpg"
},

    {
        id: 3,
        name: "Dominó",
        description: "Caraotas negras y queso blanco venezolano.",
        price: 7.50,
        category: "arepas",
        emoji: "",
        image: "img/domino.jpg"
    },

    {
        id: 4,
        name: "Catira",
        description: "Pollo desmechado con queso amarillo.",
        price: 8.50,
        category: "arepas",
        emoji: "",
        image: "img/Catira.jpg"
    },

    {
        id: 5,
        name: "Llanera",
        description: "Carne, queso blanco y tomate fresco.",
        price: 10.00,
        category: "arepas",
        emoji: "",
        image: "img/Llanera.jpg"
    },

    {
        id: 6,
        name: "Arepa de Queso",
        description: "Arepa caliente rellena de queso blanco.",
        price: 6.50,
        category: "arepas",
        emoji: "",
        image: "img/arepa-de-queso.jpg"
    },

    {
        id: 7,
        name: "Combo Criollo",
        description: "Reina Pepiada + papitas + bebida.",
        price: 13.50,
        category: "combos",
        emoji: "",
        image: "img/combo-criollo.jpg"
    },

    {
        id: 8,
        name: "Combo Pelúa",
        description: "Pelúa + papitas + bebida fría.",
        price: 14.00,
        category: "combos",
        emoji: "",
        image: "img/combo-pelua.jpg"
    },

    {
        id: 9,
        name: "Combo Familiar",
        description: "4 arepas a elección + 4 bebidas.",
        price: 35.00,
        category: "combos",
        emoji: "",
        image: "img/combo-familia.jpg"
    },

    {
        id: 10,
        name: "Malta",
        description: "Malta venezolana bien fría.",
        price: 3.00,
        category: "bebidas",
        emoji: "",
        image: "img/malta.jpg"
    },

    {
        id: 11,
        name: "Papelón con Limón",
        description: "Refrescante bebida tradicional venezolana.",
        price: 3.50,
        category: "bebidas",
        emoji: "",
        image: "img/Papelon-con-limon.jpg"
    },

    {
        id: 12,
        name: "Chicha",
        description: "Chicha venezolana cremosa con canela.",
        price: 4.50,
        category: "bebidas",
        emoji: "",
        image: "img/Chicha.jpg"
    }

];


/* =========================================
   CARGAR CAMBIOS DEL PANEL ADMIN
========================================= */

const savedProducts = localStorage.getItem("arepaExpressProducts");

if (savedProducts) {
    try {
        const parsedProducts = JSON.parse(savedProducts);

        if (Array.isArray(parsedProducts)) {
            products = parsedProducts;
        }
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}



/* =========================================
   ESTADO DEL CARRITO
========================================= */

let cart = [];


/* =========================================
   ELEMENTOS DEL DOM
========================================= */

const productsGrid = document.getElementById("productsGrid");
const cartElement = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const modalTotal = document.getElementById("modalTotal");

const checkoutModal = document.getElementById("checkoutModal");

const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");

const checkoutButton = document.getElementById("checkoutButton");

const closeModalButton = document.getElementById("closeModal");

const checkoutForm = document.getElementById("checkoutForm");

const thankYouOverlay =
    document.getElementById("thankYouOverlay");

const closeThankYou =
    document.getElementById("closeThankYou");


/* =========================================
   FORMATEAR DINERO
========================================= */

function formatPrice(price) {

    return new Intl.NumberFormat("es-VE", {
        style: "currency",
        currency: "USD"
    }).format(price);

}

/* =========================================
   MOSTRAR PRODUCTOS
========================================= */

function renderProducts(category = "todos") {

    productsGrid.innerHTML = "";

    const filteredProducts =
        category === "todos"
            ? products
            : products.filter(
                product =>
                    product.category === category
            );


    filteredProducts.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        const isAvailable =
            product.available !== false;


        card.innerHTML = `

            <div class="product-image">

                <!-- ESTADO DEL PRODUCTO -->

                <span
                    class="product-status ${
                        isAvailable
                            ? "available"
                            : "unavailable"
                    }"
                >
                    ${
                        isAvailable
                            ? "✓ DISPONIBLE"
                            : "✕ AGOTADO"
                    }
                </span>


                <!-- IMAGEN -->

                ${
    product.image

        ? `
            <img
                src="${product.image}"
                alt="${product.name}"
                onerror="
                    this.style.display='none';
                    this.nextElementSibling.style.display='flex';
                "
            >

            <div
                class="image-fallback"
                style="display:none"
            >
                ${
                    product.category === "arepas"
                        ? `
                            <div class="fallback-arepa">
                                🫓
                            </div>

                            <div class="floating-ingredients">
                                ${getIngredientEmojis(product)}
                            </div>
                        `
                        : `
                            <div class="fallback-arepa">
                                ${product.emoji || "🍽️"}
                            </div>
                        `
                }
            </div>
        `

        : `
            <div class="image-fallback">

                ${
                    product.category === "arepas"
                        ? `
                            <div class="fallback-arepa">
                                🫓
                            </div>

                            <div class="floating-ingredients">
                                ${getIngredientEmojis(product)}
                            </div>
                        `
                        : `
                            <div class="fallback-arepa">
                                ${product.emoji || "🍽️"}
                            </div>
                        `
                }

            </div>
        `
}


                <!-- CATEGORÍA -->

                <span class="product-category">
                    🇻🇪 ${getCategoryName(product.category)}
                </span>

            </div>


            <div class="product-info">

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p>
    ${escapeHTML(product.description)}
</p>


                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>


                    ${
                        isAvailable

                            ? `
                                <button
                                    class="add-button"
                                    onclick="addToCart(${product.id})"
                                    aria-label="Agregar ${escapeHTML(product.name)}"
                                >
                                    +
                                </button>
                            `

                            : `
                                <button
                                    class="add-button disabled"
                                    disabled
                                >
                                    ✕
                                </button>
                            `
                    }

                </div>

            </div>

        `;


        productsGrid.appendChild(card);

    });

}



/* =========================================
   NOMBRE DE CATEGORÍA
========================================= */

function getCategoryName(category) {

    const names = {
        arepas: "AREPA",
        combos: "COMBO",
        bebidas: "BEBIDA"
    };

    return names[category] || category;

}


/* =========================================
   AGREGAR AL CARRITO
========================================= */
function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;


    const existingItem = cart.find(
        item => item.id === productId
    );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}

/* =========================================
   CAMBIAR CANTIDAD
========================================= */

function changeQuantity(productId, change) {

    const item = cart.find(
        product => product.id === productId
    );

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== productId
        );

    }


    updateCart();

}


/* =========================================
   ELIMINAR PRODUCTO
========================================= */

function removeFromCart(productId) {

    cart = cart.filter(
        product => product.id !== productId
    );

    updateCart();

}


/* =========================================
   ACTUALIZAR CARRITO
========================================= */

function updateCart() {

    renderCart();

    updateCartCount();

    updateTotals();

}


/* =========================================
   CONTADOR DEL CARRITO
========================================= */

function updateCartCount() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

}


/* =========================================
   TOTAL
========================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );

}


/* =========================================
   ACTUALIZAR TOTALES
========================================= */

function updateTotals() {

    const total = getCartTotal();

    cartTotal.textContent = formatPrice(total);

    modalTotal.textContent = formatPrice(total);

}


/* =========================================
   RENDER CARRITO
========================================= */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div>🫓</div>

                <h4>
                    Tu carrito está vacío
                </h4>

                <p>
                    ¡Agrega una deliciosa arepa!
                </p>

            </div>

        `;

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            
<div class="cart-item-image">
    ${
        item.image
            ? `<img
                src="${escapeHTML(item.image)}"
                alt="${escapeHTML(item.name)}"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              >`
            : ""
    }
    
<span
    class="cart-item-fallback"
    style="${item.image ? "display:none;" : "display:flex;"}"
>
    ${
        item.emoji ||
        (item.category === "bebidas" ? "🥤" :
         item.category === "combos" ? "🍽️" : "🫓")
    }
</span>

</div>


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <strong>
                    ${formatPrice(item.price * item.quantity)}
                </strong>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${item.id})"
                aria-label="Eliminar ${item.name}"
            >
                🗑️
            </button>

        `;

        cartItems.appendChild(cartItem);

    });

}


/* =========================================
   ABRIR CARRITO
========================================= */

function openCart() {

    cartElement.classList.add("active");
    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================
   CERRAR CARRITO
========================================= */

function closeCart() {

    cartElement.classList.remove("active");
    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================
   ABRIR CHECKOUT
========================================= */

function openCheckout() {

    if (cart.length === 0) {

        alert("Tu carrito está vacío. Agrega una arepa primero.");

        return;
    }


    closeCart();

    checkoutModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================
   CERRAR CHECKOUT
========================================= */

function closeCheckout() {

    checkoutModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================
   GENERAR PEDIDO WHATSAPP
========================================= */

function sendOrderToWhatsApp(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert("Tu carrito está vacío.");

        return;
    }


    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();

    const payment =
        document.getElementById("paymentMethod").value;


    let message = "";

    message += "🇻🇪 *AREPA EXPRESS* 🫓\n";
    message += "━━━━━━━━━━━━━━━━━━\n\n";

    message += "🛒 *NUEVO PEDIDO*\n\n";


    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        message += `• ${item.quantity}x ${item.name}`;
        message += ` — ${formatPrice(itemTotal)}\n`;

    });


    message += "\n━━━━━━━━━━━━━━━━━━\n";

    message += `💰 *TOTAL: ${formatPrice(getCartTotal())}*\n\n`;

    message += "👤 *DATOS DEL CLIENTE*\n";
    message += `Nombre: ${name}\n`;
    message += `Teléfono: ${phone}\n`;
    message += `Dirección: ${address}\n`;
    message += `Pago: ${payment}\n\n`;

    message += "❤️ ¡Gracias por pedir en Arepa Express!";


    const encodedMessage =
        encodeURIComponent(message);


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}

/* =========================================
   EVENTOS
========================================= */

openCartButton.addEventListener(
    "click",
    openCart
);


closeCartButton.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);


checkoutButton.addEventListener(
    "click",
    openCheckout
);


closeModalButton.addEventListener(
    "click",
    closeCheckout
);


checkoutForm.addEventListener(
    "submit",
    sendOrderToWhatsApp
);



/* =========================================
   CATEGORÍAS DINÁMICAS
========================================= */

const categoryButtonsContainer =
    document.querySelector(".category-buttons");

function slugCategoria(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function cargarCategorias() {
    const predeterminadas = [
        { name: "Arepas", emoji: "🫓" },
        { name: "Combos", emoji: "🍽️" },
        { name: "Bebidas", emoji: "🥤" }
    ];

    try {
        const guardadas = JSON.parse(
            localStorage.getItem("arepaExpressCategories") || "[]"
        );

        const todas = [...predeterminadas];

        if (Array.isArray(guardadas)) {
            guardadas.forEach(categoria => {
                const nombre = typeof categoria === "string"
                    ? categoria
                    : categoria?.name || categoria?.label;

                if (!nombre) return;

                const existe = todas.some(
                    item =>
                        slugCategoria(item.name) === slugCategoria(nombre)
                );

                if (!existe) {
                    todas.push({
                        name: nombre,
                        emoji: typeof categoria === "object"
                            ? categoria.emoji || "🍽️"
                            : "🍽️"
                    });
                }
            });
        }

        return todas;
    } catch (error) {
        console.error("Error al cargar categorías:", error);
        return predeterminadas;
    }
}

function mostrarCategorias() {
    if (!categoryButtonsContainer) return;

    const categorias = cargarCategorias();

    categoryButtonsContainer.innerHTML = `
        <button class="category active" data-category="todos" type="button">
            Todas
        </button>
        ${categorias.map(categoria => {
            const valor = slugCategoria(categoria.name);

            return `
                <button
                    class="category"
                    data-category="${valor}"
                    type="button"
                >
                    ${categoria.emoji} ${categoria.name}
                </button>
            `;
        }).join("")}
    `;

    categoryButtonsContainer
        .querySelectorAll(".category")
        .forEach(boton => {
            boton.addEventListener("click", () => {
                categoryButtonsContainer
                    .querySelectorAll(".category")
                    .forEach(item => item.classList.remove("active"));

                boton.classList.add("active");

                renderProducts(boton.dataset.category);
            });
        });
}


/* =========================================
   CERRAR MODAL CON ESC
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeCart();
        closeCheckout();

    }

});


/* =========================================
   INICIAR
========================================= */


mostrarCategorias();
renderProducts();
updateCart();


/* =========================================
   SISTEMA DE COMENTARIOS
========================================= */

const commentForm =
    document.getElementById("commentForm");

if (commentForm) {

    commentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("commentName").value.trim();

        const rating =
            document.getElementById("commentRating").value;

        const text =
            document.getElementById("commentText").value.trim();


        if (!name || !rating || !text) {
            alert("Por favor completa todos los campos.");
            return;
        }


        const reviewsGrid =
            document.querySelector(".reviews-grid");


        if (!reviewsGrid) return;


        const reviewCard =
            document.createElement("div");

        reviewCard.className = "review-card";


        const stars =
            "★".repeat(Number(rating)) +
            "☆".repeat(5 - Number(rating));


        reviewCard.innerHTML = `

            <div class="review-stars">
                ${stars}
            </div>

            <p>
                “${escapeHTML(text)}”
            </p>

            <div class="review-user">

                <div class="user-avatar">
                    ${escapeHTML(
                        name.charAt(0).toUpperCase()
                    )}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(name)}
                    </strong>

                    <span>
                        Cliente de Arepa Express
                    </span>

                </div>

            </div>

        `;


        reviewsGrid.prepend(reviewCard);

        commentForm.reset();

        alert(
            "¡Gracias por tu comentario! ❤️🇻🇪"
        );

    });

}


/* =========================================
   SEGURIDAD DEL TEXTO
========================================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

/* =========================================
   CERRAR MENSAJE DE AGRADECIMIENTO
========================================= */

closeThankYou.addEventListener("click", () => {

    thankYouOverlay.classList.remove("active");

});


thankYouOverlay.addEventListener("click", (event) => {

    if (event.target === thankYouOverlay) {

        thankYouOverlay.classList.remove("active");

    }

});

/* =========================================
   AVISO INICIAL
========================================= */

const termsOverlay = document.getElementById("termsOverlay");
const acceptTerms = document.getElementById("acceptTerms");
const enterMenuButton = document.getElementById("enterMenuButton");
const rejectTermsButton = document.getElementById("rejectTermsButton");
const termsMessage = document.getElementById("termsMessage");


if (
    termsOverlay &&
    acceptTerms &&
    enterMenuButton &&
    rejectTermsButton
) {

    document.body.style.overflow = "hidden";


    /* MARCAR ACEPTACIÓN */

    acceptTerms.addEventListener("change", function () {

        console.log("Checkbox:", this.checked);

        if (this.checked) {

            enterMenuButton.disabled = false;

            enterMenuButton.classList.add("enabled");

            termsMessage.textContent = "";

        } else {

            enterMenuButton.disabled = true;

            enterMenuButton.classList.remove("enabled");

        }

    });


    /* ENTRAR */

    enterMenuButton.addEventListener("click", function () {

        console.log("Botón entrar presionado");

        if (!acceptTerms.checked) {

            termsMessage.textContent =
                "⚠️ Debes aceptar los términos.";

            return;
        }


        termsOverlay.style.display = "none";

        document.body.style.overflow = "";


        const menu = document.getElementById("menu");

        if (menu) {

            menu.scrollIntoView({
                behavior: "smooth"
            });

        }

    });


    /* NO ACEPTO */

    rejectTermsButton.addEventListener("click", function () {

        termsMessage.textContent =
            "❌ Debes aceptar los términos para entrar al menú.";

    });

}

/* =========================================
   AVISO DE TÉRMINOS
========================================= */

function activarEntrada() {

    const checkbox = document.getElementById("acceptTerms");
    const boton = document.getElementById("enterMenuButton");
    const mensaje = document.getElementById("termsMessage");

    if (checkbox.checked) {

        boton.disabled = false;
        boton.classList.add("enabled");

        mensaje.textContent = "";

    } else {

        boton.disabled = true;
        boton.classList.remove("enabled");

    }
}


function entrarAlMenu() {

    const checkbox = document.getElementById("acceptTerms");
    const aviso = document.getElementById("termsOverlay");
    const mensaje = document.getElementById("termsMessage");

    if (!checkbox.checked) {

        mensaje.textContent =
            "⚠️ Debes aceptar los términos para continuar.";

        return;
    }

    // Ocultar el aviso
    aviso.style.display = "none";

    // Permitir desplazamiento
    document.body.style.overflow = "";

    // Ir al menú
    const menu = document.getElementById("menu");

    if (menu) {

        menu.scrollIntoView({
            behavior: "smooth"
        });

    }
}


function noAceptar() {

    const mensaje = document.getElementById("termsMessage");

    mensaje.textContent =
        "❌ Debes aceptar los términos para entrar al menú.";

}

/* =========================================
   FORMATEAR DINERO
========================================= */

function formatPrice(price) {

    return new Intl.NumberFormat("es-VE", {
        style: "currency",
        currency: "USD"
    }).format(price);

}

function getIngredientEmojis(product) {

    const emojis = {

        "Reina Pepiada": "🐔 🥑 🥚",
        "Pelúa": "🥩 🧀",
        "Dominó": "🫘 🧀",
        "Catira": "🐔 🧀",
        "Llanera": "🥩 🧀 🍅",
        "Arepa de Queso": "🧀"

    };

    // Mantener los emojis originales de combos y bebidas
    if (product.category === "combos") {
        return product.emoji || "🍽️";
    }
    
    if (product.category === "bebidas") {
    return product.emoji || "🥤";
}

    return emojis[product.name] || "🫓";

}


/* =========================================
   CARGAR CATEGORÍAS PERSONALIZADAS
========================================= */

function cargarCategoriasPersonalizadas() {
    const guardadas = JSON.parse(
        localStorage.getItem("arepaExpressCategories") || "[]"
    );

    const contenedor = document.getElementById("categoryFilters");

    if (!contenedor || !Array.isArray(guardadas)) {
        return;
    }

    guardadas.forEach(categoria => {
        const nombre = categoria.label || categoria.name;
        const valor = categoria.value ||
            nombre.normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

        if (!nombre || !valor) return;

        // Evitar duplicados.
        if (
            [...contenedor.querySelectorAll("button")]
                .some(boton => boton.dataset.category === valor)
        ) {
            return;
        }

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "category-btn";
        boton.dataset.category = valor;
        boton.textContent =
            `${categoria.emoji ? categoria.emoji + " " : ""}${nombre}`;

        boton.addEventListener("click", function () {
            document.querySelectorAll(".category-btn").forEach(b => {
                b.classList.remove("active");
            });

            boton.classList.add("active");

            // Usa el filtro de categorías existente, si lo hay.
            if (typeof filterProducts === "function") {
                filterProducts(valor);
            } else {
                console.warn(
                    "Conecta este botón con la función de filtrado de productos de la tienda."
                );
            }
        });

        contenedor.appendChild(boton);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    cargarCategoriasPersonalizadas();
});
