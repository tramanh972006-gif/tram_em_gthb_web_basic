module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/cart.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CART_STORAGE_KEY",
    ()=>CART_STORAGE_KEY,
    "addCartItem",
    ()=>addCartItem,
    "getCartCount",
    ()=>getCartCount,
    "getCartSubtotal",
    ()=>getCartSubtotal,
    "parseStoredCart",
    ()=>parseStoredCart,
    "removeCartItem",
    ()=>removeCartItem,
    "serializeCart",
    ()=>serializeCart,
    "updateCartItemQuantity",
    ()=>updateCartItemQuantity
]);
const CART_STORAGE_KEY = "minishop-cart";
function sanitizeQuantity(quantity) {
    if (!Number.isFinite(quantity) || quantity < 1) {
        return 1;
    }
    return Math.floor(quantity);
}
function toCartItem(product) {
    return {
        slug: product.slug,
        name: product.name,
        price: product.price,
        badge: product.badge,
        quantity: 1
    };
}
function addCartItem(items, product) {
    if (!product?.slug || !product?.inStock) {
        return items;
    }
    const existingItem = items.find((item)=>item.slug === product.slug);
    if (!existingItem) {
        return [
            ...items,
            toCartItem(product)
        ];
    }
    return items.map((item)=>item.slug === product.slug ? {
            ...item,
            quantity: item.quantity + 1
        } : item);
}
function updateCartItemQuantity(items, slug, quantity) {
    if (!slug) {
        return items;
    }
    if (!Number.isFinite(quantity)) {
        return items;
    }
    const nextQuantity = Math.floor(quantity);
    if (nextQuantity <= 0) {
        return removeCartItem(items, slug);
    }
    return items.map((item)=>item.slug === slug ? {
            ...item,
            quantity: nextQuantity
        } : item);
}
function removeCartItem(items, slug) {
    return items.filter((item)=>item.slug !== slug);
}
function getCartCount(items) {
    return items.reduce((total, item)=>total + item.quantity, 0);
}
function getCartSubtotal(items) {
    return items.reduce((total, item)=>total + item.price * item.quantity, 0);
}
function parseStoredCart(value) {
    if (!value) {
        return [];
    }
    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.filter((item)=>item && typeof item.slug === "string" && typeof item.name === "string" && typeof item.price === "number" && Number.isFinite(item.price) && item.price >= 0).map((item)=>({
                slug: item.slug,
                name: item.name,
                price: item.price,
                badge: typeof item.badge === "string" ? item.badge : "",
                quantity: sanitizeQuantity(item.quantity)
            }));
    } catch  {
        return [];
    }
}
function serializeCart(items) {
    return JSON.stringify(items);
}
}),
"[project]/src/components/cart-provider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function readStoredCart() {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseStoredCart"])(window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CART_STORAGE_KEY"]));
    } catch  {
        return [];
    }
}
function persistCart(items) {
    try {
        window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CART_STORAGE_KEY"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeCart"])(items));
    } catch  {
    // Ignore storage write failures so cart state stays usable in memory.
    }
}
function CartProvider({ children }) {
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const parsedCart = readStoredCart();
        // Hydrate from client storage after mount so the first client render
        // matches the server render and avoids hydration mismatch.
        queueMicrotask(()=>{
            setItems(parsedCart);
            setIsHydrated(true);
        });
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isHydrated) {
            return;
        }
        persistCart(items);
    }, [
        isHydrated,
        items
    ]);
    function addToCart(product) {
        setItems((currentItems)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addCartItem"])(currentItems, product));
    }
    function updateQuantity(slug, quantity) {
        setItems((currentItems)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateCartItemQuantity"])(currentItems, slug, quantity));
    }
    function removeFromCart(slug) {
        setItems((currentItems)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeCartItem"])(currentItems, slug));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            items,
            isHydrated,
            cartCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCartCount"])(items),
            subtotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCartSubtotal"])(items),
            addToCart,
            updateQuantity,
            removeFromCart
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/cart-provider.js",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
function useCart() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return context;
}
}),
"[project]/src/components/cart-status-link.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartStatusLink",
    ()=>CartStatusLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/cart-provider.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function CartStatusLink() {
    const { cartCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: "/cart",
        className: "cart-status-link",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Giỏ hàng"
            }, void 0, false, {
                fileName: "[project]/src/components/cart-status-link.js",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                children: cartCount
            }, void 0, false, {
                fileName: "[project]/src/components/cart-status-link.js",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/cart-status-link.js",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0wygi68._.js.map