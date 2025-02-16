import React, { useEffect, useState } from 'react';
import ProductService from '../service/product.service';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const maxVisibleProducts = 8;

    useEffect(() => {
        const getHomeProduct = async () => {
            try {
                const fetchedProducts = await ProductService.getAllCat("van-hoc");
                setProducts(fetchedProducts);
                updateVisibleProducts(fetchedProducts);

                console.log(fetchedProducts);
            } catch (error) {
                console.log(error);
            }
        };
        getHomeProduct();
    }, []);

    const updateVisibleProducts = (products) => {
        setVisibleProducts(products.slice(0, maxVisibleProducts));
    };

    return (
        <div className="page">
            <div className="container py-3">
                <div className="row">
                    <div className="col">
                        <img src="src\assets\img\banner\5.png" alt="" />
                        <img src="src\assets\img\banner\4.png" alt="" />
                    </div>
                    <div className="col">
                        <img src="src\assets\img\banner\1.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="intro-section">
                    <div className="top-title p-3">
                        <h5>Danh mục sản phẩm</h5>
                    </div>
                    <div className="content">
                        <div className="row mx-4">
                            {visibleProducts.map((product, index) => (
                                <div className="col-md-3" key={index}>
                                    <div className="card">
                                        <img src={product.img} alt={product.name} className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">Giá: {product.price}đ</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
