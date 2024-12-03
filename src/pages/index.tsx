import { useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../utils/products";
import styles from "../styles/Marketplace.module.css";

const Marketplace = () => {
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);

  const filteredProducts = filteredCategory
    ? products.filter(
        (product) =>
          product.category === filteredCategory ||
          product.subCategory === filteredCategory
      )
    : products;

  return (
    <div className={styles.page}>
      <Header
        categories={categories}
        onCategoryChange={setFilteredCategory}
      />
      <div className={styles.container}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
