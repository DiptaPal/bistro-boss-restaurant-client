import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const accessToken = localStorage.getItem('accessToken');

    // useEffect(() => {
    //     fetch("https://bistro-boss-restaurant-server-theta.vercel.app/menu")
    //     .then(res => res.json())
    //     .then(data => {
    //         setMenu(data)
    //         setLoading(false);
    //     })
    // }, [accessToken])

    const {data: menu = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await fetch("https://bistro-boss-restaurant-server-theta.vercel.app/menu");
            const data = await res.json();
            return data;
        }
    })

    return [menu, loading, refetch]
}

export default useMenu;