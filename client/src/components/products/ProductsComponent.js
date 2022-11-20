import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopify } from "../../api/api";
import useDebounce from "../../hooks/useDebounce";
import { getProducts } from "../../redux-store/reducers/productsReducers";

const ProductsComponent = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchTerm = useDebounce(searchValue, 700);

  const dispatch = useDispatch();
  const productData = useSelector((state) => state.products.products);

  useEffect(() => {
    getProductData(searchValue);
  }, [debouncedSearchTerm]);

  const getProductData = async (searchValue) => {
    await shopify
      .getListProduct(searchValue)
      .then((data) => {
        dispatch(getProducts(data.data.products));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="product">
        <input type="text" placeholder="Search.." name="search" value={searchValue} onChange={(e) => handleSearch(e)} />
        <table>
          <thead>
            <tr>
            <th>ID</th>
            <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {
                productData?.shop?.products?.edges?.map((data, index) => (
                    <tr key={index}>
                        <td>{data.node.id}</td>
                        <td>{data.node.title}</td>
                    </tr>
                ))
            }
          </tbody>
        </table>
    </div>
  );
};

export default ProductsComponent;
