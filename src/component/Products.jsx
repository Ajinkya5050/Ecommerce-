import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    let componentMounted = true
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const [searchKW, setSearchKW] = useState("")

  const filterProduct = (cat) => {
    if (searchKW) {
      const searchedProducts = data.filter((x) => x.title.toLowerCase().includes(searchKW.toLowerCase()));
      const updatedList = searchedProducts.filter((x) => x.category === cat);
      setFilter(updatedList);
    }
    else {
      const updatedList = data.filter((x) => x.category === cat);
      setFilter(updatedList);
    }
  }

  const handleSearchChange = (e) => {
    if (e.target.value.length > 0) {
      setSearchKW(e.target.value)
      const searchedProducts = data.filter((x) => x.title.toLowerCase().includes(e.target.value.toLowerCase()));
      setFilter(searchedProducts);
    }
    else {
      setSearchKW(e.target.value)
      setFilter(data);
    }
  }

  const ShowProducts = () => {
    return (
      <>
        <div className="d-flex flex-column justify-content-center align-items-center mb-5 pb-4">
          <div className="pb-4 ">
            <input
              type="text"
              placeholder="Search Products"
              className="rounded-pill p-1 fs-5 text-center shadow-lg"
              style={{ minWidth: '300px' }}
              value={searchKW}
              onChange={(e) => handleSearchChange(e)}
            />
          </div>

          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-dark me-2" onClick={() => setFilter(data)} >All</button>
            <button type="button" class="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")} >Men's Clothing</button>
            <button type="button" class="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")} >Women's Clothing</button>
            <button type="button" class="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")} >Jewellery</button>
            <button type="button" class="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")} >Electronics</button>
          </div>

        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div class="card h-100 text-center p-4  shadow-lg" key={product.id}>
                  <img src={product.image} class="card-img-top" alt={product.title} height="250px" />
                  <div class="card-body">
                    <h5 class="card-title fs-6 mb-1 text-center">{product.title}</h5>
                    <p class="card-text lead fw-bold">
                      ${product.price}
                    </p>
                    <NavLink to={`/products/${product.id}`} class="btn btn-outline-dark shadow-lg">
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-2 py-5">
        
        <div className="row justify-content-center">
          {loading ? <Loading /> : ShowProducts()}
        </div>
      </div>
    </div>
  );
};

export default Products;
