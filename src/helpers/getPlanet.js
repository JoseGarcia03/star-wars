export const getPlanet = async( url )=> {
    try {
        const data = await (await fetch( url )).json();
        return data;
    } catch (error) {
        console.log(error)
        return undefined
    }
}