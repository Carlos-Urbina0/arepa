/* =========================================
   AREPA EXPRESS
   PANEL ADMINISTRATIVO
========================================= */


/* =========================================
   PRODUCTOS INICIALES
========================================= */

const defaultProducts = [

    {
        id: 1,
        name: "Reina Pepiada",
        description:
            "Pollo desmechado, aguacate y mayonesa.",
        price: 8.50,
        category: "arepas",
        emoji: "🫓",
        image: "img/reina-pepiada.jpg",
        available: true
    },

    {
        id: 2,
        name: "Pelúa",
        description:
            "Carne mechada y abundante queso amarillo.",
        price: 9.00,
        category: "arepas",
        emoji: "🫓",
        image: "img/pelua.jpg",
        available: true
    },

    {
        id: 3,
        name: "Dominó",
        description:
            "Caraotas negras y queso blanco venezolano.",
        price: 7.50,
        category: "arepas",
        emoji: "🫓",
        image: "img/domino.jpg",
        available: true
    },

    {
        id: 4,
        name: "Catira",
        description:
            "Pollo desmechado con queso amarillo.",
        price: 8.50,
        category: "arepas",
        emoji: "🫓",
        image: "img/catira.jpg",
        available: true
    },

    {
        id: 5,
        name: "Llanera",
        description:
            "Carne, queso blanco y tomate fresco.",
        price: 10.00,
        category: "arepas",
        emoji: "🫓",
        image: "img/llanera.jpg",
        available: true
    },

    {
        id: 6,
        name: "Arepa de Queso",
        description:
            "Arepa caliente rellena de queso blanco.",
        price: 6.50,
        category: "arepas",
        emoji: "🫓",
        image: "img/queso.jpg",
        available: true
    },

    {
        id: 7,
        name: "Combo Criollo",
        description:
            "Reina Pepiada + papitas + bebida.",
        price: 13.50,
        category: "combos",
        emoji: "🍽️",
        image: "",
        available: true
    },

    {
        id: 8,
        name: "Combo Pelúa",
        description:
            "Pelúa + papitas + bebida fría.",
        price: 14.00,
        category: "combos",
        emoji: "🍽️",
        image: "",
        available: true
    },

    {
        id: 9,
        name: "Combo Familiar",
        description:
            "4 arepas a elección + 4 bebidas.",
        price: 35.00,
        category: "combos",
        emoji: "🍽️",
        image: "",
        available: true
    },

    {
        id: 10,
        name: "Malta",
        description:
            "Malta venezolana bien fría.",
        price: 3.00,
        category: "bebidas",
        emoji: "🥤",
        image: "",
        available: true
    },

    {
        id: 11,
        name: "Papelón con Limón",
        description:
            "Refrescante bebida tradicional venezolana.",
        price: 3.50,
        category: "bebidas",
        emoji: "🍋",
        image: "",
        available: true
    },

    {
        id: 12,
        name: "Chicha",
        description:
            "Chicha venezolana cremosa con canela.",
        price: 4.50,
        category: "bebidas",
        emoji: "🥤",
        image: "",
        available: true
    }

];


/* =========================================
   CARGAR PRODUCTOS
========================================= */

let products =
    JSON.parse(
        localStorage.getItem("arepaExpressProducts")
    );


if (!products) {

    products = defaultProducts;

    saveProducts();

}


/* =========================================
   GUARDAR
========================================= */

function saveProducts() {

    localStorage.setItem(
        "arepaExpressProducts",
        JSON.stringify(products)
    );

}


/* =========================================
   ELEMENTOS
========================================= */

const grid =
    document.getElementById("adminProductsGrid");

const modal =
    document.getElementById("productModal");

const form =
    document.getElementById("productForm");

const filter =
    document.getElementById("categoryFilter");

const addButton =
    document.getElementById("addProductButton");

const closeModal =
    document.getElementById("closeModal");

const cancelButton =
    document.getElementById("cancelButton");

const imageInput =
    document.getElementById("productImageFile");

const imagePreview =
    document.getElementById("imagePreview");

const imagePathInput =
    document.getElementById("productImage");


/* =========================================
   IMAGEN SELECCIONADA
========================================= */

let selectedImage = "";


/* =========================================
   MOSTRAR PRODUCTOS
========================================= */

function renderProducts() {

    const category =
        filter.value;

    const filtered =
        category === "todos"
            ? products
            : products.filter(
                product =>
                    product.category === category
            );


    grid.innerHTML = "";


    filtered.forEach(product => {

        const card =
            document.createElement("article");

        card.className =
            "admin-product";


        const imageHTML =
            product.image

                ? `
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="
                            this.style.display='none';
                            this.nextElementSibling.style.display='grid';
                        "
                    >

                    <div
                        class="no-image"
                        style="display:none"
                    >
                        ${product.emoji}
                    </div>
                `

                : `
                    <div class="no-image">
                        ${product.emoji}
                    </div>
                `;


        card.innerHTML = `

            <div class="admin-product-image">

                ${imageHTML}

                <span
                    class="
                        status
                        ${
                            product.available
                                ? "available"
                                : "unavailable"
                        }
                    "
                >
                    ${
                        product.available
                            ? "DISPONIBLE"
                            : "AGOTADO"
                    }
                </span>

            </div>


            <div class="admin-product-info">

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p>
                    ${escapeHTML(product.description)}
                </p>

                <span class="product-price">
                    $${Number(product.price).toFixed(2)}
                </span>


                <div class="product-actions">

                    <button
                        class="edit-button"
                        onclick="editProduct(${product.id})"
                    >
                        ✏️ Editar
                    </button>

                    <button
                        class="toggle-button"
                        onclick="toggleProduct(${product.id})"
                    >
                        ${
                            product.available
                                ? "🔴 Agotar"
                                : "🟢 Activar"
                        }
                    </button>

                    <button
                        class="delete-button"
                        onclick="deleteProduct(${product.id})"
                    >
                        🗑️
                    </button>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });


    updateStats();

}


/* =========================================
   ESTADÍSTICAS
========================================= */

function updateStats() {

    const total =
        products.length;

    const available =
        products.filter(
            product => product.available
        ).length;

    const unavailable =
        total - available;


    document.getElementById(
        "totalProducts"
    ).textContent = total;


    document.getElementById(
        "availableProducts"
    ).textContent = available;


    document.getElementById(
        "unavailableProducts"
    ).textContent = unavailable;

}


/* =========================================
   ABRIR PARA AGREGAR
========================================= */

addButton.addEventListener(
    "click",
    () => {

        form.reset();

        document.getElementById(
            "productId"
        ).value = "";

        document.getElementById(
            "productAvailable"
        ).checked = true;

        document.getElementById(
            "modalTitle"
        ).textContent =
            "Agregar producto";


        selectedImage = "";


        imagePreview.innerHTML = `
            <span>
                🖼️ Selecciona una foto
            </span>
        `;


        modal.classList.add("active");

    }
);


/* =========================================
   EDITAR
========================================= */

function editProduct(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) return;


    document.getElementById(
        "productId"
    ).value = product.id;


    document.getElementById(
        "productName"
    ).value = product.name;


    document.getElementById(
        "productDescription"
    ).value = product.description;


    document.getElementById(
        "productPrice"
    ).value = product.price;


    document.getElementById(
        "productCategory"
    ).value = product.category;


    document.getElementById(
        "productImage"
    ).value =
        product.image || "";


    document.getElementById(
        "productAvailable"
    ).checked =
        product.available;


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Editar producto";


    selectedImage =
        product.image || "";


    if (product.image) {

        imagePreview.innerHTML = `

            <img
                src="${product.image}"
                alt="${escapeHTML(product.name)}"
            >

        `;

    } else {

        imagePreview.innerHTML = `
            <span>
                🖼️ Selecciona una foto
            </span>
        `;

    }


    modal.classList.add("active");

}


/* =========================================
   SELECCIONAR IMAGEN
========================================= */

if (imageInput) {

    imageInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) return;


            if (!file.type.startsWith("image/")) {

                alert(
                    "Por favor selecciona una imagen."
                );

                this.value = "";

                return;

            }


            /*
                Máximo 1 MB para evitar
                llenar rápidamente localStorage.
            */

            if (file.size > 1024 * 1024) {

                alert(
                    "La imagen es muy grande. Usa una imagen menor de 1 MB."
                );

                this.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    selectedImage =
                        event.target.result;


                    imagePreview.innerHTML = `

                        <img
                            src="${selectedImage}"
                            alt="Vista previa"
                        >

                    `;

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================
   GUARDAR PRODUCTO
========================================= */

form.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const id =
            document.getElementById(
                "productId"
            ).value;


        let imageToSave =
            selectedImage;


        /*
            Si no se seleccionó una imagen nueva,
            usamos la ruta escrita manualmente.
        */

        if (!imageToSave) {

            imageToSave =
                imagePathInput.value.trim();

        }


        const productData = {

            name:
                document.getElementById(
                    "productName"
                ).value.trim(),

            description:
                document.getElementById(
                    "productDescription"
                ).value.trim(),

            price:
                Number(
                    document.getElementById(
                        "productPrice"
                    ).value
                ),

            category:
                document.getElementById(
                    "productCategory"
                ).value,

            image:
                imageToSave,

            available:
                document.getElementById(
                    "productAvailable"
                ).checked

        };


        if (id) {

            const index =
                products.findIndex(
                    product =>
                        product.id === Number(id)
                );


            if (index !== -1) {

                products[index] = {

                    ...products[index],

                    ...productData

                };

            }

        } else {

            const newId =
                products.length
                    ? Math.max(
                        ...products.map(
                            product => product.id
                        )
                    ) + 1
                    : 1;


            products.push({

                id: newId,

                ...productData,

                emoji:
                    productData.category === "bebidas"
                        ? "🥤"
                        : productData.category === "combos"
                            ? "🍽️"
                            : "🫓"

            });

        }


        try {

            saveProducts();

        } catch (error) {

            alert(
                "No se pudo guardar la imagen. Prueba con una imagen más pequeña."
            );

            return;

        }


        renderProducts();

        closeProductModal();

    }
);


/* =========================================
   ACTIVAR / AGOTAR
========================================= */

function toggleProduct(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) return;


    product.available =
        !product.available;


    saveProducts();

    renderProducts();

}




/* =========================================
   ELIMINAR PRODUCTOS CON CONTRASEÑA
========================================= */

let productToDeleteId = null;

function deleteProduct(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    productToDeleteId = id;

    const modal = document.getElementById("deleteProductModal");
    const message = document.getElementById("deleteProductMessage");
    const passwordInput = document.getElementById("deleteProductPassword");
    const error = document.getElementById("deleteProductError");

    message.textContent = `¿Deseas eliminar el producto "${product.name}"? Esta acción no se puede deshacer.`;

    passwordInput.value = "";
    error.textContent = "";

    modal.classList.add("active");
    passwordInput.focus();
}


/* =========================================
   BOTONES DE LA VENTANA DE ELIMINACIÓN
========================================= */

const deleteProductModal = document.getElementById("deleteProductModal");
const deleteProductForm = document.getElementById("deleteProductForm");
const deleteProductPassword = document.getElementById("deleteProductPassword");
const deleteProductError = document.getElementById("deleteProductError");
const cancelDeleteProduct = document.getElementById("cancelDeleteProduct");

function closeDeleteProductModal() {
    deleteProductModal.classList.remove("active");
    deleteProductForm.reset();
    deleteProductError.textContent = "";
    productToDeleteId = null;
}

cancelDeleteProduct.addEventListener("click", closeDeleteProductModal);

deleteProductModal.addEventListener("click", function(event) {
    if (event.target === deleteProductModal) {
        closeDeleteProductModal();
    }
});

deleteProductForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (productToDeleteId === null) return;

    const settings = getAdminSettings();
    const adminPassword = settings.password || "33c";

    if (deleteProductPassword.value !== adminPassword) {
        deleteProductError.textContent = "Contraseña incorrecta. Inténtalo de nuevo.";
        deleteProductPassword.value = "";
        deleteProductPassword.focus();
        return;
    }

    products = products.filter(item => item.id !== productToDeleteId);

    saveProducts();
    renderProducts();

    closeDeleteProductModal();
});




/* =========================================
   CERRAR MODAL
========================================= */

function closeProductModal() {

    modal.classList.remove("active");

    selectedImage = "";

}


closeModal.addEventListener(
    "click",
    closeProductModal
);


cancelButton.addEventListener(
    "click",
    closeProductModal
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeProductModal();

        }

    }
);


/* =========================================
   FILTRO
========================================= */

filter.addEventListener(
    "change",
    renderProducts
);


/* =========================================
   SEGURIDAD
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   INICIAR
========================================= */

renderProducts();

/* =========================================
   CONFIGURACIÓN DE LA CUENTA
========================================= */

const ADMIN_SETTINGS_KEY = "arepaExpressAdminSettings";

function getAdminSettings() {
    try {
        return JSON.parse(
            localStorage.getItem(ADMIN_SETTINGS_KEY)
        ) || {};
    } catch (error) {
        return {};
    }
}

const settingsForm = document.getElementById("adminSettingsForm");

if (settingsForm) {
    const savedSettings = getAdminSettings();

document.getElementById("settingEmail").value =
    savedSettings.email || "arepaexpress@gmail.com";

    document.getElementById("settingAdminName").value =
        savedSettings.name || "carlos";

    document.getElementById("settingAdminPassword").value =
        savedSettings.password || "33c";

    document.getElementById("settingWhatsApp").value =
        savedSettings.whatsapp || "+55 62 99225-9546";

    document.getElementById("settingInstagram").value =
        savedSettings.instagram || "";

    document.getElementById("settingFacebook").value =
        savedSettings.facebook || "";

    document.getElementById("settingTikTok").value =
        savedSettings.tiktok || "";

    settingsForm.addEventListener("submit", function(event) {
        event.preventDefault();

        
        const email = document.getElementById("settingEmail")
            .value.trim();


        const name = document.getElementById("settingAdminName")
            .value.trim();

        const password = document.getElementById("settingAdminPassword")
            .value;

        const whatsapp = document.getElementById("settingWhatsApp")
            .value.trim();

        const instagram = document.getElementById("settingInstagram")
            .value.trim();

        const facebook = document.getElementById("settingFacebook")
            .value.trim();

        const tiktok = document.getElementById("settingTikTok")
            .value.trim();

        const message = document.getElementById("adminSettingsMessage");

        if (!name || !password || !whatsapp) {
            message.textContent =
                "Completa el nombre, la contraseña y el WhatsApp.";

            return;
        }

        try {
            localStorage.setItem(
                ADMIN_SETTINGS_KEY,
                JSON.stringify({
                    ...getAdminSettings(),
                    name: name,
                    password: password,
                    whatsapp: whatsapp,
                    instagram: instagram,
                    facebook: facebook,
                    tiktok: tiktok,
                    email: email
                })
            );

            message.textContent =
                "✅ Configuración guardada en este navegador.";

            message.style.color = "green";
        } catch (error) {
            message.textContent =
                "❌ No se pudo guardar la configuración.";

            message.style.color = "red";
        }
    });
}




/* =====================================
   AGREGAR CATEGORÍAS
===================================== */

(() => {
    const openButton = document.getElementById(
        "addCategoryButton"
    );

    const modal = document.getElementById(
        "categoryModal"
    );

    const form = document.getElementById(
        "categoryForm"
    );

    const nameInput = document.getElementById(
        "newCategoryName"
    );

    const emojiInput = document.getElementById(
        "newCategoryEmoji"
    );

    const cancelButton = document.getElementById(
        "cancelCategoryButton"
    );

    const message = document.getElementById(
        "categoryFormMessage"
    );

    if (
        !openButton ||
        !modal ||
        !form ||
        !nameInput ||
        !emojiInput ||
        !cancelButton ||
        !message
    ) {
        console.error(
            "No se encontraron los elementos de Agregar categoría en admin.html."
        );
        return;
    }

    const storageKey = "arepaExpressCategories";

    const defaults = [
        { name: "Arepas", emoji: "🫓" },
        { name: "Combos", emoji: "🍽️" },
        { name: "Bebidas", emoji: "🥤" }
    ];

    function loadCategories() {
        try {
            const saved = JSON.parse(
                localStorage.getItem(storageKey)
            );

            if (Array.isArray(saved)) {
                return [...defaults, ...saved].filter(
                    (category, index, array) =>
                        array.findIndex(
                            item =>
                                item.name.toLowerCase() ===
                                category.name.toLowerCase()
                        ) === index
                );
            }
        } catch (error) {
            console.error(error);
        }

        return [...defaults];
    }

    function saveCategories(categories) {
        localStorage.setItem(
            storageKey,
            JSON.stringify(categories)
        );
    }

    function showCategories() {
        const categories = loadCategories();

        console.log(
            "Categorías guardadas:",
            categories
        );

        // Actualizar los selectores si existen.
        const selectors = [
            document.getElementById("categoryFilter"),
            document.getElementById("productCategory")
        ];

        selectors.forEach(select => {
            if (!select) return;

            const previousValue = select.value;
            select.innerHTML = "";

            if (select.id === "categoryFilter") {
                const all = document.createElement("option");
                all.value = "todos";
                all.textContent = "Todas las categorías";
                select.appendChild(all);
            }

            categories.forEach(category => {
                const option = document.createElement("option");

                const value = category.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "");

                option.value = value;
                option.textContent =
                    `${category.emoji ? category.emoji + " " : ""}${category.name}`;

                select.appendChild(option);
            });

            if (
                [...select.options].some(
                    option => option.value === previousValue
                )
            ) {
                select.value = previousValue;
            }
        });
    }

    function openModal() {
        form.reset();
        message.textContent = "";
        modal.classList.add("active");
        nameInput.focus();
    }

    function closeModal() {
        modal.classList.remove("active");
    }

    openButton.addEventListener("click", openModal);
    cancelButton.addEventListener("click", closeModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeModal();
        }
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const emoji = emojiInput.value.trim();

        if (!name) {
            message.textContent =
                "Escribe un nombre para la categoría.";
            return;
        }

        const categories = loadCategories();

        const duplicate = categories.some(
            category =>
                category.name.toLowerCase() ===
                name.toLowerCase()
        );

        if (duplicate) {
            message.textContent =
                "Esta categoría ya existe.";
            return;
        }

        
        const value = name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        categories.push({
            name: name,
            label: name,
            value: value,
            emoji: emoji
        });

        try {
            saveCategories(categories);
            showCategories();

            // Avisar a otras páginas abiertas del mismo origen.
            window.dispatchEvent(
                new StorageEvent("storage", {
                    key: storageKey,
                    newValue: localStorage.getItem(storageKey)
                })
            );

            message.textContent =
                "¡Categoría guardada correctamente!";

            form.reset();

            setTimeout(() => {
                closeModal();
            }, 900);
        } catch (error) {
            message.textContent =
                "No se pudo guardar. Revisa el almacenamiento del navegador.";

            console.error(error);
        }

    });

    showCategories();
})();
