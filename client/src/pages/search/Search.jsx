import "./search.css";
import { useEffect, useState } from "react";
import { useTitle } from "../../components/helpers";
import { request } from "../../utils/request";
import Spinner from "../../components/common/spinner/Spinner";
import { HeadingBreadcrumb, SingleCard } from "../../allPagesPaths";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Search = () => {

    useTitle(`Search - Nfood`);

    const [query, setQuery] = useState('');

    const [results, setResults] = useState([]);

    const [resultsCount, setResultsCount] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    /*===========================================*/

    const fetchResults = async (searchQuery) => {

        setLoading(true);

        setError(null);

        if (!searchQuery.trim()) {

            setResults([]);

            setLoading(false);

            return;

        }

        try {

            const response = await request.get('/api/products/search', {
                params: { q: searchQuery }
            });

            setResults(response?.data?.data);

        } catch (err) {

            setError('Error fetching results. Please try again later.');

        } finally {

            setLoading(false);

        }

    };

    /*===========================================*/

    useEffect(() => {

        const handler = setTimeout(() => {

            fetchResults(query);

        }, 300);

        return () => {

            clearTimeout(handler);

        };

    }, [query]);

    /*===========================================*/

    const highlightText = (text, query) => {

        if (!query.trim()) return text;

        const parts = text.split(new RegExp(`(${query})`, 'gi'));

        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="highlight">{part}</span>
            ) : (
                part
            )
        );

    };

    /*===========================================*/

    return (
        <div className="search">
            <HeadingBreadcrumb breadcrumb="search" />
            <div className="search-content">
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={() => fetchResults(query)}>Search</button>
                </div>
                {error && <p>{error}</p>}
                <div className="cards-results">
                    {loading ? (
                        <Spinner />
                    ) : results.length > 0 ? (
                        results.map((product) => (
                            <SingleCard
                                product={{ ...product, name: highlightText(product.name, query) }}
                                key={product._id}
                            />
                        ))
                    ) : (
                        query.trim() !== '' && <h2 style={{ color: "#999" }}>No results found.</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search; 