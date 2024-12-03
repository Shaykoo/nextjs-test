import { useRouter } from "next/router";
import { products } from "../../utils/products";
import styles from "../../styles/ProductDetails.module.css";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p className={styles.notFound}>Product not found</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
        </div>

        {/* Details Section */}
        <div className={styles.detailsSection}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
          <p className={styles.productCreator}>
            <strong>Created by:</strong> {product.creator}
          </p>
          {product.description && (
            <p className={styles.productDescription}>{product.description}</p>
          )}
          <div className={styles.specifications}>
            <h2>Specifications</h2>
            <ul>
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.reviews}>
            <h2>Customer Reviews</h2>
            <ul>
              {product.reviews.map((review, index) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => router.back()}
            className={styles.backButton}
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
