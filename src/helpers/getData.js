import Swal from "sweetalert2";

export const getData = async ( url = "https://swapi.dev/api/people/?page=1") => {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'El servidor no responde, intente mas tarde'
        })
    }
}