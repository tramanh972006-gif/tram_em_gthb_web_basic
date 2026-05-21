(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/cart.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/cart-provider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function readStoredCart() {
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStoredCart"])(window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CART_STORAGE_KEY"]));
    } catch  {
        return [];
    }
}
function persistCart(items) {
    try {
        window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CART_STORAGE_KEY"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serializeCart"])(items));
    } catch  {
    // Ignore storage write failures so cart state stays usable in memory.
    }
}
function CartProvider({ children }) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isHydrated, setIsHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            const parsedCart = readStoredCart();
            // Hydrate from client storage after mount so the first client render
            // matches the server render and avoids hydration mismatch.
            queueMicrotask({
                "CartProvider.useEffect": ()=>{
                    setItems(parsedCart);
                    setIsHydrated(true);
                }
            }["CartProvider.useEffect"]);
        }
    }["CartProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            if (!isHydrated) {
                return;
            }
            persistCart(items);
        }
    }["CartProvider.useEffect"], [
        isHydrated,
        items
    ]);
    function addToCart(product) {
        setItems((currentItems)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addCartItem"])(currentItems, product));
    }
    function updateQuantity(slug, quantity) {
        setItems((currentItems)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateCartItemQuantity"])(currentItems, slug, quantity));
    }
    function removeFromCart(slug) {
        setItems((currentItems)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeCartItem"])(currentItems, slug));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            items,
            isHydrated,
            cartCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCartCount"])(items),
            subtotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCartSubtotal"])(items),
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
_s(CartProvider, "lPowWb/NnR6Y07iExyw8jIXbO7o=");
_c = CartProvider;
function useCart() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return context;
}
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/cart-status-link.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartStatusLink",
    ()=>CartStatusLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2d$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/cart-provider.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CartStatusLink() {
    _s();
    const { cartCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2d$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: "/cart",
        className: "cart-status-link",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "Giỏ hàng"
            }, void 0, false, {
                fileName: "[project]/src/components/cart-status-link.js",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
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
_s(CartStatusLink, "6rkf3etSUYDVhGEx3VzfqVgXtpk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2d$provider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CartStatusLink;
var _c;
__turbopack_context__.k.register(_c, "CartStatusLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0uqzqkf._.js.map