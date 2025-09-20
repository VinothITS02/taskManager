const base_url = "http://localhost:5000";

export const fetchAPI = async (url) => {
    const response = await fetch(`${base_url}/${url}`);
    const resJson = await response.json();
    return resJson
};

export async function postAPI(path, body, opts = {}) {
    try {
        const isFormData = opts.isFormData;
        const headers = isFormData
            ? {} // let RN set 'Content-Type' with boundary
            : { "Content-Type": "application/json" };

        const res = await fetch(`${base_url}/${path}`, {
            method: "POST",
            headers,
            body: isFormData ? body : JSON.stringify(body),
        });

        return res.json();
    } catch (err) {
        console.log("ffgfggfggfgfghgfh")
    }
}
