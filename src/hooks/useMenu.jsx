// import { useQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { useEffect } from "react";

const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const accessToken = localStorage.getItem('accessToken');

    // useEffect(() => {
    //     fetch("https://bistro-boss-restaurant.onrender.com/menu")
    //     .then(res => res.json())
    //     .then((data) => {
    //         setMenu(data)
    //         setLoading(false);
    //     })
    // }, [accessToken])

    const {data: menu = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await fetch("https://bistro-boss-restaurant.onrender.com/menu")
            const data = await res.json();
            return data;
        }
    })

    return [menu, loading, refetch]
}

export default useMenu;