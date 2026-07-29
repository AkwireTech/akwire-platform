const API_BASE = "https://akwire-api.onrender.com/api";

// ======================================
// CORE REQUEST
// ======================================

async function request(endpoint, options = {}) {

    const response = await fetch(`${API_BASE}${endpoint}`, {

        credentials: "include",

        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },

        ...options

    });

    let data = {};

    try {

        data = await response.json();

    } catch (err) {}

    if (!response.ok) {

        throw new Error(
            data.message || "Request failed"
        );

    }

    return data;

}

// ======================================
// GET
// ======================================

export async function apiGet(endpoint) {

    return request(endpoint, {

        method: "GET"

    });

}

// ======================================
// POST
// ======================================

export async function apiPost(endpoint, body = {}) {

    return request(endpoint, {

        method: "POST",

        body: JSON.stringify(body)

    });

}

// ======================================
// PUT
// ======================================

export async function apiPut(endpoint, body = {}) {

    return request(endpoint, {

        method: "PUT",

        body: JSON.stringify(body)

    });

}

// ======================================
// DELETE
// ======================================

export async function apiDelete(endpoint) {

    return request(endpoint, {

        method: "DELETE"

    });

}

// ======================================
// PATCH
// ======================================

export async function apiPatch(endpoint, body = {}) {

    return request(endpoint, {

        method: "PATCH",

        body: JSON.stringify(body)

    });

}

// ======================================
// UPLOAD FILE
// ======================================

export async function apiUpload(endpoint, formData) {

    const response = await fetch(`${API_BASE}${endpoint}`, {

        method: "POST",

        credentials: "include",

        body: formData

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message || "Upload failed"
        );

    }

    return data;

}