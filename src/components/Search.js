import React, {useState, useEffect} from "react";
import axios from "axios";

const Search = () => {
    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);

    useEffect( () => {
            const search = async () => {
             const {data} = await axios.get("https://en.wikipedia.org/w/api.php", {
                  params: {
                      action: 'query',
                      list: 'search',
                      origin: '*',
                      format: 'json',
                      srsearch: term
                  }
              });
                setResults(data.query.search);
            };

         const timeoutId = setTimeout (() => {
                if (term) {
                    search();
                }
        }, 500);

         return () => {
             clearTimeout(timeoutId);
         };

        },[term]);

    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="content">
                    <div className="header">
                        <a href={`https://en.wikipedia.org?curid=${result.pageid}`} target="_blank" rel="noreferrer">   {result.title} </a>
                </div>
                  <span dangerouslySetInnerHTML= {{ __html: result.snippet}}></span>
                </div>
            </div>
        );
    });

    return (
       <div className="ui form">
        <div className="field">
            <label>Enter search term</label>
            <input
                value={term}
                onChange={(e) => setTerm(e.target.value) }
                className="input" type="text"
            />
        </div>
           <div className="ui celled list">
               {renderedResults}
           </div>
       </div>
    );
};

export default Search;
