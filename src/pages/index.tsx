import { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { products, categories } from "../utils/products";
import styles from "../styles/Marketplace.module.css";

const Marketplace = () => {
  const [filteredCategory, setFilteredCategory] = useState<string | null>(null);
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const correctPassword = "fedev2024test";

  useEffect(() => {
    const hasAccess = localStorage.getItem("accessGranted") === "true";
    setAccessGranted(hasAccess);
  }, []);

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      localStorage.setItem("accessGranted", "true");
      setAccessGranted(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  const filteredProducts = filteredCategory
    ? products.filter(
        (product) =>
          product.category === filteredCategory ||
          product.subCategory === filteredCategory
      )
    : products;

  if (!accessGranted) {
    return (
      <div className={styles.passwordContainer}>
        <h2>Enter Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className={styles.passwordInput}
        />
        <button onClick={handlePasswordSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    );
  }

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
